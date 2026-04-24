(function attachClassScorePetRuntime(globalObject) {
  function createRuntime() {
    function purchaseAndReviveActivePet() {
      const board = getActiveBoard();
      const student = getSelectedStudent();
      const pet = getActivePet(student);
      if (!board || !student || !pet) {
        showToast('请先选中学生与宠物。');
        return;
      }
      if (!isPetDead(pet)) {
        showToast('宠物当前无需复活。');
        return;
      }

      const reviveItems = getReviveItems(board, student);
      if (reviveItems.length > 0) {
        reviveActivePet(reviveItems[0].id);
        return;
      }

      const reviveRule = getPetShopItems(board).find((item) => item.effectType === 'revive');
      if (!reviveRule || reviveRule.enabled === false) {
        showToast('当前宠物商城没有上架复活币。');
        return;
      }
      if (!spendStudentPoints(student, reviveRule.cost, `购买${reviveRule.name}`, '宠物复活')) {
        showToast(`积分不足，无法购买${reviveRule.name}。`);
        return;
      }

      updateStudentInventory(student, reviveRule.id, 1);
      updateStudentInventory(student, reviveRule.id, -1);
      syncPetVitals(pet, { revive: true });
      commitState(`${activePetName(student)} 已花费 ${reviveRule.cost} 积分购买并立即使用${reviveRule.name}。`);
      reopenPetHomeLater();
    }

    function renderPetBattleModal(board, student) {
      const pet = getActivePet(student);
      if (!pet) {
        return `<section class="modal-panel"><div class="empty-state">当前还没有宠物，先去宠物家园孵化一只吧。</div></section>`;
      }

      const session = getPetBattleStateForRender(board, student, pet);
      const playerPet = session.playerPet || createBattlePetSnapshot(pet);
      const playerStats = getPetDerivedStats(playerPet);
      const learnedSkills = getPetLearnedSkills(playerPet);
      const reviveItems = getReviveItems(board, student);
      const animation = session.animation || null;
      const buildBattleCardClasses = (side) => {
        const classes = ['pet-battle-card'];
        if (!animation) {
          return classes.join(' ');
        }

        if (animation.actorSide === side) {
          classes.push('is-acting');
          classes.push(animation.type === 'skill' ? 'is-skill-cast' : 'is-basic-cast');
        }
        if (animation.targetSide === side) {
          classes.push(animation.type === 'dodged' ? 'is-dodged' : 'is-hit');
          if (animation.type === 'crit') {
            classes.push('is-crit-hit');
          }
        }

        return classes.join(' ');
      };
      const buildBattleFx = (side) => {
        if (!animation || (animation.actorSide !== side && animation.targetSide !== side)) {
          return '';
        }

        if (animation.actorSide === side) {
          const actorLabel = animation.type === 'skill'
            ? `✨ ${animation.label}`
            : animation.type === 'dodged'
              ? '出手未中'
              : '出手';
          return `<div class="pet-battle-fx is-actor"><span>${escapeHtml(actorLabel)}</span></div>`;
        }

        const targetLabel = animation.type === 'dodged'
          ? '闪避'
          : animation.type === 'crit'
            ? `暴击 -${animation.damage}`
            : `-${animation.damage}`;
        return `<div class="pet-battle-fx is-target ${animation.type === 'dodged' ? 'is-dodge' : ''}"><span>${escapeHtml(targetLabel)}</span></div>`;
      };
      const roundText = session.round > 0 ? `第 ${session.round} 回合` : '准备中';
      const autoButtonText = session.autoMode ? '暂停自动战斗' : '开启自动战斗';
      const autoButtonClass = session.autoMode ? 'mini-action mini-action-orange' : 'mini-action';

      if (session.status === 'lobby') {
        return `
          <div class="pet-modal-toolbar">
            <button class="mini-action" type="button" data-action="battle-back-home">返回宠物家园</button>
            <button class="mini-action" type="button" data-action="battle-open-shop">宠物商城</button>
          </div>
          <section class="pet-hero-card" ${getPetThemeStyleAttribute(playerPet.speciesId)}>
            <div class="pet-hero-main">
              ${renderPetAvatarMarkup(playerPet.speciesId, playerPet.name)}
              <div class="pet-hero-copy">
                <p class="card-kicker">竞技场准备</p>
                <h3>${escapeHtml(playerPet.name)}</h3>
                <p class="modal-help">${escapeHtml(playerStats.species.name)} · ${escapeHtml(playerStats.species.rarity)} · Lv.${playerStats.level}</p>
                <div class="pet-vital-grid">
                  <article class="pet-vital-card">
                    ${renderPetVitalBar('生命值', playerPet.currentHp, playerStats.maxHp, 'hp')}
                    ${renderPetVitalBar('蓝量', playerPet.currentMana, playerStats.maxMana, 'mana')}
                  </article>
                  <article class="pet-vital-card">
                    <div class="preview-tag-row">
                      <span class="preview-tag">攻击 ${playerStats.attackMin}-${playerStats.attackMax}</span>
                      <span class="preview-tag">防御 ${playerStats.defense}</span>
                      <span class="preview-tag">暴击 ${Math.round(playerStats.critRate * 100)}%</span>
                      <span class="preview-tag">闪避 ${Math.round(playerStats.dodgeRate * 100)}%</span>
                    </div>
                    <p class="modal-help">普通攻击会额外回复 6 点蓝量。已学技能 ${learnedSkills.length} 个${isPetDead(pet) ? '，当前宠物已倒下，需先在宠物商城补充复活币。' : '。'}</p>
                    ${isPetDead(pet) ? `<div class="pet-dead-box"><strong>宠物当前已倒下</strong><small>请先到宠物商城补充复活币，再回到宠物家园复活。</small><div class="preview-tag-row"><span class="preview-tag">现有复活币 ${reviveItems.reduce((sum, item) => sum + item.count, 0)}</span></div></div>` : ''}
                  </article>
                </div>
              </div>
            </div>
          </section>
          <section class="modal-panel">
            <h3>竞技场对手</h3>
            <div class="pet-arena-grid">
              ${PET_ARENA_OPPONENTS.map((opponent) => {
                const arenaPet = createArenaPetFromTemplate(opponent, pet);
                const arenaStats = getPetDerivedStats(arenaPet);
                const arenaSpecies = getPetSpecies(opponent.speciesId);
                return `
                  <article class="pet-arena-card" ${getPetThemeStyleAttribute(opponent.speciesId)}>
                    ${renderPetAvatarMarkup(opponent.speciesId, opponent.name)}
                    <strong>${escapeHtml(opponent.name)}</strong>
                    <small>${escapeHtml(arenaSpecies.name)} · ${escapeHtml(arenaSpecies.rarity)} · Lv.${arenaStats.level}</small>
                    <p class="modal-help">${escapeHtml(opponent.description)}</p>
                    <div class="preview-tag-row">
                      <span class="preview-tag">成长奖励 +${opponent.rewardGrowth}</span>
                      <span class="preview-tag">攻击 ${arenaStats.attackMin}-${arenaStats.attackMax}</span>
                    </div>
                    <div class="timer-actions">
                      <button class="mini-action mini-action-orange" type="button" data-action="battle-start" data-opponent-id="${opponent.id}" ${isPetDead(pet) ? 'disabled' : ''}>开始挑战</button>
                      <button class="mini-action" type="button" data-action="battle-start-auto" data-opponent-id="${opponent.id}" ${isPetDead(pet) ? 'disabled' : ''}>自动挑战</button>
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </section>
          <section class="modal-panel">
            <h3>已掌握技能</h3>
            ${learnedSkills.length > 0 ? `<div class="pet-skill-grid">${learnedSkills.map((skill) => `<article class="pet-skill-card is-learned"><div class="pet-skill-head"><div><strong>${escapeHtml(skill.name)}</strong><small>MP ${skill.manaCost} · 伤害 ${skill.minDamage}-${skill.maxDamage}</small></div><span class="preview-tag">已装备</span></div><p class="modal-help">${escapeHtml(skill.description)}</p></article>`).join('')}</div>` : `<div class="empty-state">当前还没有学会技能，可以先回宠物家园用积分解锁技能。</div>`}
          </section>
        `;
      }

      const opponentPet = session.opponentPet;
      const opponentStats = getPetDerivedStats(opponentPet);
      const resultTitle = session.status === 'win' ? '战斗胜利' : session.status === 'loss' ? '战斗失败' : '';
      const resultCopy = session.result
        ? session.result.outcome === 'win'
          ? `获得成长值 +${session.result.growthGain}${session.result.leveledUp ? `，并升到 Lv.${session.result.level}` : ''}。`
          : isPetDead(pet) ? '宠物已经倒下，需要前往宠物商城补充复活资源。' : '战绩已记录，可以调整状态后再战。'
        : '';

      return `
        <div class="pet-modal-toolbar">
          <button class="mini-action" type="button" data-action="battle-back-home">返回宠物家园</button>
          <button class="mini-action" type="button" data-action="battle-reset">${session.status === 'active' ? '重新匹配' : '再来一场'}</button>
        </div>
        ${(session.status === 'win' || session.status === 'loss') ? `<section class="pet-result-banner ${session.status === 'win' ? 'is-win' : 'is-loss'}"><strong>${resultTitle}</strong><small>${escapeHtml(resultCopy)}</small></section>` : ''}
        <section class="pet-battle-shell">
          <div class="battle-status-bar">
            <span class="battle-status-pill">${roundText}</span>
            <span class="battle-status-pill ${session.autoMode ? 'is-auto' : 'is-manual'}">${session.autoMode ? '自动战斗中' : '手动模式'}</span>
            ${session.lastRoundSummary ? `<span class="battle-status-copy">${escapeHtml(session.lastRoundSummary)}</span>` : ''}
          </div>
          <div class="pet-battle-stage">
            <article class="${buildBattleCardClasses('player')}" ${getPetThemeStyleAttribute(playerPet.speciesId)}>
              ${buildBattleFx('player')}
              ${renderPetAvatarMarkup(playerPet.speciesId, playerPet.name)}
              <div class="pet-battle-copy">
                <strong>${escapeHtml(playerPet.name)}</strong>
                <small>${escapeHtml(playerStats.species.name)} · Lv.${playerStats.level}</small>
                ${renderPetVitalBar('生命值', playerPet.currentHp, playerStats.maxHp, 'hp')}
                ${renderPetVitalBar('蓝量', playerPet.currentMana, playerStats.maxMana, 'mana')}
                <div class="preview-tag-row">
                  <span class="preview-tag">攻击 ${playerStats.attackMin}-${playerStats.attackMax}</span>
                  <span class="preview-tag">防御 ${playerStats.defense}</span>
                </div>
              </div>
            </article>
            <article class="${buildBattleCardClasses('enemy')}" ${getPetThemeStyleAttribute(opponentPet.speciesId)}>
              ${buildBattleFx('enemy')}
              ${renderPetAvatarMarkup(opponentPet.speciesId, opponentPet.name)}
              <div class="pet-battle-copy">
                <strong>${escapeHtml(opponentPet.name)}</strong>
                <small>${escapeHtml(opponentStats.species.name)} · Lv.${opponentStats.level}</small>
                ${renderPetVitalBar('生命值', opponentPet.currentHp, opponentStats.maxHp, 'hp')}
                ${renderPetVitalBar('蓝量', opponentPet.currentMana, opponentStats.maxMana, 'mana')}
                <div class="preview-tag-row">
                  <span class="preview-tag">攻击 ${opponentStats.attackMin}-${opponentStats.attackMax}</span>
                  <span class="preview-tag">防御 ${opponentStats.defense}</span>
                </div>
              </div>
            </article>
          </div>
          <section class="modal-panel">
            <h3>战斗操作</h3>
            ${session.status === 'active' ? `
              <div class="pet-battle-actions">
                <button class="mini-action mini-action-green" type="button" data-action="battle-attack" ${session.autoMode ? 'disabled' : ''}>普通攻击</button>
                <button class="mini-action" type="button" data-action="battle-auto-turn" ${session.autoMode ? 'disabled' : ''}>智能出招</button>
                <button class="${autoButtonClass}" type="button" data-action="battle-toggle-auto">${autoButtonText}</button>
              </div>
              <p class="modal-help">${session.autoMode ? '自动战斗会根据血量、蓝量和技能收益自动出招；你也可以随时暂停。' : '普通攻击会回复蓝量；“智能出招”会自动判断是否使用技能。'}</p>
              ${learnedSkills.length > 0 ? `<div class="pet-skill-grid">${learnedSkills.map((skill) => `<article class="pet-skill-card ${playerPet.currentMana >= skill.manaCost ? 'is-learned' : 'is-locked'}"><div class="pet-skill-head"><div><strong>${escapeHtml(skill.name)}</strong><small>MP ${skill.manaCost} · 伤害 ${skill.minDamage}-${skill.maxDamage}</small></div><span class="preview-tag">${playerPet.currentMana >= skill.manaCost ? '可释放' : '蓝量不足'}</span></div><p class="modal-help">${escapeHtml(skill.description)}</p><button class="mini-action mini-action-orange" type="button" data-action="battle-skill" data-skill-id="${skill.id}" ${playerPet.currentMana >= skill.manaCost && !session.autoMode ? '' : 'disabled'}>释放技能</button></article>`).join('')}</div>` : `<div class="empty-state">当前没有已学技能，本场可以先用普通攻击完成对战。</div>`}
            ` : `<div class="empty-state">本场战斗已经结算，可以返回家园调整状态，或重新匹配下一场。</div>`}
          </section>
          <section class="modal-panel">
            <h3>战斗日志</h3>
            <div class="battle-log">
              ${session.log.map((entry) => `<article class="battle-log-item tone-${escapeHtml(entry.tone || 'neutral')}">${escapeHtml(entry.text)}</article>`).join('')}
            </div>
          </section>
        </section>
      `;
    }

    function openPetBattleModal() {
      const board = getActiveBoard();
      const student = getSelectedStudent();
      const pet = getActivePet(student);
      if (!board || !student || !pet) {
        showToast('请先选中学生并拥有一只宠物。');
        return;
      }

      petBattleState = ensurePetBattleState(board, student, pet);
      openModal({
        title: '宠物对战',
        hideSubmit: true,
        cancelText: '关闭',
        html: renderPetBattleModal(board, student),
        onOpen: (body) => {
          const rerender = () => {
            const freshBoard = getActiveBoard();
            const freshStudent = getSelectedStudent();
            if (!freshBoard || !freshStudent) {
              return;
            }
            body.innerHTML = renderPetBattleModal(freshBoard, freshStudent);
          };
          setPetBattleRenderHook(rerender);

          const handleClick = (event) => {
            const actionNode = event.target.closest('[data-action]');
            const action = actionNode?.dataset.action;
            const opponentId = actionNode?.dataset.opponentId || '';
            const skillId = actionNode?.dataset.skillId || '';
            if (!action) {
              return;
            }

            if (action === 'battle-back-home') {
              petBattleState = null;
              openPetHomeModal();
              return;
            }
            if (action === 'battle-open-shop') {
              openPetShopModal();
              return;
            }
            if (action === 'battle-start') {
              if (startPetBattleChallenge(opponentId)) {
                rerender();
              }
              return;
            }
            if (action === 'battle-start-auto') {
              if (startPetBattleChallenge(opponentId, { autoMode: true })) {
                rerender();
              }
              return;
            }
            if (action === 'battle-attack') {
              if (performPetBattleRound('normal')) {
                rerender();
              }
              return;
            }
            if (action === 'battle-auto-turn') {
              if (performPetBattleRound('auto')) {
                rerender();
              }
              return;
            }
            if (action === 'battle-toggle-auto') {
              const currentSession = petBattleState;
              if (!currentSession || currentSession.status !== 'active') {
                return;
              }
              setPetBattleAutoMode(!currentSession.autoMode, { delayMs: currentSession.autoMode ? currentSession.autoDelayMs : 320 });
              rerender();
              return;
            }
            if (action === 'battle-skill') {
              if (performPetBattleRound('skill', skillId)) {
                rerender();
              }
              return;
            }
            if (action === 'battle-reset') {
              const freshBoard = getActiveBoard();
              const freshStudent = getSelectedStudent();
              const freshPet = getActivePet(freshStudent);
              if (!freshBoard || !freshStudent || !freshPet) {
                return;
              }
              clearPetBattleAutoLoop();
              clearPetBattleAnimation();
              petBattleState = createPetBattleLobby(freshBoard, freshStudent, freshPet);
              rerender();
            }
          };

          body.addEventListener('click', handleClick);
          return () => {
            clearPetBattleAutoLoop();
            clearPetBattleAnimation();
            if (petBattleState) {
              petBattleState.autoMode = false;
            }
            clearPetBattleRenderHook();
            body.removeEventListener('click', handleClick);
          };
        }
      });
    }

    function renderPetHomeModal(board, student) {
      const pets = getStudentPets(student);
      const activePet = getActivePet(student);
      const eggRule = getPetShopItems(board).find((item) => item.effectType === 'pet-egg') || getPetEggShopItem(board);
      const eggItems = getBackpackItems(board, student).filter((item) => item.effectType === 'pet-egg');
      const incubatingEggs = getIncubatingEggs(student);
      const feedItems = getFeedableItems(board, student);
      const reviveItems = getReviveItems(board, student);
      const backpackItems = getBackpackItems(board, student).filter((item) => isPetShopEffectType(item.effectType));
      const reviveRule = getPetShopItems(board).find((item) => item.effectType === 'revive') || null;
      const reviveCount = reviveItems.reduce((sum, item) => sum + item.count, 0);

      if (pets.length === 0 && eggItems.length === 0 && incubatingEggs.length === 0) {
        return `
          <div class="pet-modal-toolbar">
            <button class="mini-action mini-action-orange" type="button" data-action="open-pet-shop">去宠物商城兑换宠物蛋</button>
          </div>
          <section class="pet-hero-card pet-locked-card">
            <div>
              <p class="card-kicker">宠物家园未开启</p>
              <h3>${escapeHtml(student.name)} 还没有宠物蛋</h3>
              <p class="modal-help">开启宠物家园前，需要先到宠物商城兑换一枚宠物蛋。购买后会直接进入孵化仓，默认孵化 7 天，也可以继续用积分加速。</p>
              <div class="preview-tag-row">
                <span class="preview-tag">当前积分 ${formatSignedScore(student.score)}</span>
                <span class="preview-tag">宠物蛋 ${eggRule?.cost || 100} 积分</span>
                <span class="preview-tag">图鉴 ${ALL_PET_SPECIES.length} 种</span>
              </div>
            </div>
            <div class="pet-empty-badge">🥚</div>
          </section>
          <section class="modal-panel">
            <h3>宠物图鉴</h3>
            <p class="modal-help">稀有度越高，基础属性越强，技能和战斗潜力也会更高。</p>
            ${renderPetSpeciesShowcase()}
          </section>
        `;
      }

      if (pets.length === 0) {
        return `
          <div class="pet-modal-toolbar">
            <button class="mini-action" type="button" data-action="open-pet-shop">宠物商城</button>
          </div>
          <section class="pet-hero-card pet-hatch-card">
            <div>
              <p class="card-kicker">孵化仓</p>
              <h3>${escapeHtml(student.name)} 的宠物家园正在准备中</h3>
              <p class="modal-help">待孵化宠物蛋 ${eggItems.reduce((sum, item) => sum + item.count, 0)} 枚，孵化仓中 ${incubatingEggs.length} 枚。默认孵化 7 天，每消耗 1 积分可减少 1 小时。</p>
              <div class="preview-tag-row">
                <span class="preview-tag">当前积分 ${formatSignedScore(student.score)}</span>
                <span class="preview-tag">默认孵化 7 天</span>
                <span class="preview-tag">1 积分 = 1 小时</span>
              </div>
            </div>
            <div class="pet-empty-badge">⏳</div>
          </section>
          ${eggItems.length > 0 ? `<section class="modal-panel"><h3>待入仓宠物蛋</h3><div class="pet-feed-grid">${eggItems.map((item) => `<article class="shop-card"><div class="shop-card-top"><span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span><div><strong>${escapeHtml(item.name)}</strong><small>库存 ${item.count}</small></div></div><p class="modal-help">放入孵化仓后开始倒计时，期间可随时加速。</p><button class="mini-action mini-action-green" type="button" data-action="start-egg-incubation" data-item-id="${item.id}">放入孵化仓</button></article>`).join('')}</div></section>` : ''}
          ${incubatingEggs.length > 0 ? `<section class="modal-panel"><h3>孵化中的宠物蛋</h3><div class="pet-feed-grid">${renderIncubatingEggCards(student)}</div></section>` : ''}
          <section class="modal-panel">
            <h3>宠物图鉴</h3>
            ${renderPetSpeciesShowcase()}
          </section>
        `;
      }

      const species = getPetSpecies(activePet.speciesId);
      const progress = getPetProgress(activePet);
      const stats = getPetDerivedStats(activePet);
      const dead = isPetDead(activePet);
      const autoReviveLabel = reviveCount > 0
        ? `立即使用复活币（${reviveCount}）`
        : `花费${reviveRule?.cost || 10}积分立即复活`;
      const autoReviveHelp = reviveCount > 0
        ? '将优先消耗背包里的复活币，并立即回满生命与蓝量。'
        : `当前没有复活币，可直接花费 ${reviveRule?.cost || 10} 积分在宠物商城购买并自动使用。`;

      return `
        <div class="pet-modal-toolbar">
          <button class="mini-action" type="button" data-action="open-pet-shop">宠物商城</button>
          <button class="mini-action mini-action-green" type="button" data-action="open-pet-battle">宠物对战</button>
          <button class="mini-action" type="button" data-action="rename-active-pet">重命名宠物</button>
        </div>
        <section class="pet-hero-card" ${getPetThemeStyleAttribute(species.id)}>
          <div class="pet-hero-main">
            ${renderPetAvatarMarkup(species.id, activePet.name)}
            <div class="pet-hero-copy">
              <p class="card-kicker">当前宠物</p>
              <h3>${escapeHtml(activePet.name)}</h3>
              <p class="modal-help">${escapeHtml(species.name)} · ${escapeHtml(species.rarity)} · ${escapeHtml(getPetStage(progress.level))}</p>
              <div class="preview-tag-row">
                <span class="preview-tag">当前积分 ${formatSignedScore(student.score)}</span>
                <span class="preview-tag">战绩 ${activePet.wins}/${activePet.losses}</span>
                <span class="preview-tag">羁绊 ${activePet.bond}</span>
                <span class="preview-tag">喂养 ${activePet.feedCount} 次</span>
                <span class="preview-tag">复活币 ${reviveCount}</span>
                ${dead ? '<span class="preview-tag pet-dead-badge">已倒下</span>' : ''}
              </div>
              <div class="pet-vital-grid">
                <article class="pet-vital-card">
                  ${renderPetVitalBar('生命值', activePet.currentHp, stats.maxHp, 'hp')}
                  ${renderPetVitalBar('蓝量', activePet.currentMana, stats.maxMana, 'mana')}
                </article>
                <article class="pet-vital-card">
                  <div class="preview-tag-row">
                    <span class="preview-tag">攻击 ${stats.attackMin}-${stats.attackMax}</span>
                    <span class="preview-tag">防御 ${stats.defense}</span>
                    <span class="preview-tag">暴击 ${Math.round(stats.critRate * 100)}%</span>
                    <span class="preview-tag">闪避 ${Math.round(stats.dodgeRate * 100)}%</span>
                  </div>
                  <p class="modal-help">${escapeHtml(species.description)}</p>
                </article>
              </div>
              <div class="pet-stat-grid">
                <article class="pet-stat-card"><strong>Lv.${progress.level}</strong><span>成长等级</span></article>
                <article class="pet-stat-card"><strong>${activePet.growth}</strong><span>累计成长值</span></article>
                <article class="pet-stat-card"><strong>${formatTimestamp(activePet.hatchedAt)}</strong><span>孵化时间</span></article>
                <article class="pet-stat-card"><strong>${escapeHtml(species.rarity)}</strong><span>稀有度</span></article>
              </div>
              <div class="pet-progress-shell">
                <div class="pet-progress-track">
                  <div class="pet-progress-bar" style="width:${Math.max(6, progress.ratio * 100)}%"></div>
                </div>
                <small>距离下一等级还需 ${progress.remaining} 点成长值</small>
              </div>
              ${dead ? `<div class="pet-dead-box"><strong>宠物当前已倒下</strong><small>${autoReviveHelp}</small><div class="timer-actions"><button class="mini-action mini-action-orange" type="button" data-action="purchase-and-revive-pet">${autoReviveLabel}</button></div></div>` : ''}
            </div>
          </div>
        </section>
        <section class="modal-panel">
          <h3>互动与训练</h3>
          ${dead ? `<div class="empty-state">宠物倒下时无法互动，请先复活。</div>` : `<div class="pet-action-grid">${Object.entries(PET_INTERACTION_ACTIONS).map(([actionKey, action]) => `<article class="pet-action-card"><strong>${escapeHtml(action.label)}</strong><p class="modal-help">${escapeHtml(action.description)}</p><div class="preview-tag-row"><span class="preview-tag">消耗 ${action.cost} 积分</span><span class="preview-tag">成长 +${action.growthGain}</span><span class="preview-tag">羁绊 +${action.bondGain}</span><span class="preview-tag">${action.hpGain >= 0 ? `生命 +${action.hpGain}` : `生命 ${action.hpGain}`}</span><span class="preview-tag">${action.manaGain >= 0 ? `蓝量 +${action.manaGain}` : `蓝量 ${action.manaGain}`}</span></div><button class="mini-action mini-action-green" type="button" data-action="pet-interact" data-mode="${actionKey}" ${student.score >= action.cost ? '' : 'disabled'}>${escapeHtml(action.label)}</button></article>`).join('')}</div>`}
        </section>
        <section class="modal-panel">
          <h3>技能学习</h3>
          <div class="pet-skill-grid">${renderPetSkillCards(activePet, student)}</div>
        </section>
        <section class="modal-panel">
          <h3>喂养区</h3>
          ${feedItems.length > 0 ? `<div class="pet-feed-grid">${feedItems.map((item) => `<article class="shop-card"><div class="shop-card-top"><span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span><div><strong>${escapeHtml(item.name)}</strong><small>库存 ${item.count} · 成长 +${item.growthGain}</small></div></div><p class="modal-help">${escapeHtml(item.description || '喂养后可提升成长值并恢复部分状态。')}</p><button class="mini-action mini-action-orange" type="button" data-action="feed-active-pet" data-item-id="${item.id}" ${dead ? 'disabled' : ''}>喂养一次</button></article>`).join('')}</div>` : `<div class="empty-state">背包里还没有可喂养的零食，先去宠物商城兑换吧。</div>`}
        </section>
        ${eggItems.length > 0 ? `<section class="modal-panel"><h3>待入仓宠物蛋</h3><div class="pet-feed-grid">${eggItems.map((item) => `<article class="shop-card"><div class="shop-card-top"><span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span><div><strong>${escapeHtml(item.name)}</strong><small>库存 ${item.count}</small></div></div><p class="modal-help">放入孵化仓后开始 7 天倒计时。</p><button class="mini-action mini-action-green" type="button" data-action="start-egg-incubation" data-item-id="${item.id}">放入孵化仓</button></article>`).join('')}</div></section>` : ''}
        ${incubatingEggs.length > 0 ? `<section class="modal-panel"><h3>孵化中的宠物蛋</h3><div class="pet-feed-grid">${renderIncubatingEggCards(student)}</div></section>` : ''}
        <section class="modal-panel">
          <h3>宠物名单</h3>
          <div class="pet-collection-grid">${renderPetCollectionCards(student)}</div>
        </section>
        <section class="modal-panel">
          <h3>宠物背包</h3>
          ${backpackItems.length > 0 ? `<div class="preview-tag-row">${backpackItems.map((item) => `<span class="preview-tag">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))} ${escapeHtml(item.name)} × ${item.count}</span>`).join('')}</div>` : `<div class="empty-state">当前宠物背包还是空的。</div>`}
        </section>
      `;
    }

    function openPetHomeModal() {
      const board = getActiveBoard();
      const student = getSelectedStudent();
      if (!board || !student) {
        showToast('请先选中学生，再打开宠物家园。');
        return;
      }

      openModal({
        title: '宠物家园',
        hideSubmit: true,
        cancelText: '关闭',
        html: renderPetHomeModal(board, student),
        onOpen: (body) => {
          const handleClick = (event) => {
            const actionNode = event.target.closest('[data-action]');
            const action = actionNode?.dataset.action;
            const itemId = actionNode?.dataset.itemId || '';
            const petId = actionNode?.dataset.petId || '';
            const mode = actionNode?.dataset.mode || '';
            const skillId = actionNode?.dataset.skillId || '';
            const eggId = actionNode?.dataset.eggId || '';
            const hours = actionNode?.dataset.hours || '';
            if (!action) {
              return;
            }

            if (action === 'open-pet-shop' || action === 'open-shop') {
              openPetShopModal();
              return;
            }
            if (action === 'open-pet-battle') {
              openPetBattleModal();
              return;
            }
            if (action === 'start-egg-incubation') {
              startEggIncubation(itemId);
              return;
            }
            if (action === 'accelerate-egg') {
              accelerateIncubatingEgg(eggId, hours);
              return;
            }
            if (action === 'accelerate-egg-max') {
              accelerateIncubatingEgg(eggId, 'max');
              return;
            }
            if (action === 'claim-ready-egg') {
              hatchStudentPet(eggId);
              return;
            }
            if (action === 'feed-active-pet') {
              feedActivePet(itemId);
              return;
            }
            if (action === 'pet-interact') {
              interactWithActivePet(mode);
              return;
            }
            if (action === 'learn-pet-skill') {
              learnSkillForActivePet(skillId);
              return;
            }
            if (action === 'revive-active-pet') {
              reviveActivePet(itemId);
              return;
            }
            if (action === 'purchase-and-revive-pet') {
              purchaseAndReviveActivePet();
              return;
            }
            if (action === 'select-pet') {
              setActivePet(student, petId);
              petBattleState = null;
              commitState(`已切换到宠物 ${activePetName(student)}。`);
              reopenPetHomeLater();
              return;
            }
            if (action === 'rename-active-pet') {
              openRenameActivePetModal();
            }
          };

          body.addEventListener('click', handleClick);
          return () => {
            body.removeEventListener('click', handleClick);
          };
        }
      });
    }

    function renderPetAvatarMarkup(speciesId, label = '') {
      const species = getPetSpecies(speciesId);
      const seed = Math.abs(hashString(`${species.id}:${species.name}`));
      const keyword = `${species.id} ${species.name}`;
      const family = /dragon|wyrm|phoenix|qilin|basilisk|warden|griffin|slime|cat|bunny|rabbit|corgi|dog|wolf|fox|serpent|snake/i.test(keyword)
        ? (/slime/i.test(keyword)
          ? 'slime'
          : /phoenix|griffin|bird|feather/i.test(keyword)
            ? 'avian'
            : /qilin|dragon|wyrm|warden/i.test(keyword)
              ? 'dragon'
              : /basilisk|serpent|snake/i.test(keyword)
                ? 'serpent'
                : /cat|fox/i.test(keyword)
                  ? 'feline'
                  : /bunny|rabbit/i.test(keyword)
                    ? 'bunny'
                    : 'pup')
        : ['pup', 'feline', 'bunny', 'dragon', 'avian', 'serpent', 'slime'][seed % 7];
      const sparkleCount = 3 + (seed % 4);
      const eyeTone = '#1f2840';
      const accentGlow = hexToRgba(species.accentStrong || species.accent, 0.24);
      const shellGlow = hexToRgba(species.glow || species.accentSoft || species.accent, 0.28);
      const idSuffix = species.id.replace(/[^a-z0-9_-]/gi, '');
      const rarityDeco = /神话/.test(species.rarity)
        ? `<path d="M40 66 Q110 10 180 66" stroke="${species.accentStrong}" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.7" />
           <circle cx="110" cy="28" r="10" fill="${species.accentStrong}" opacity="0.86" />`
        : /传说/.test(species.rarity)
          ? `<path d="M46 72 Q110 26 174 72" stroke="${species.accent}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.66" />`
          : /史诗/.test(species.rarity)
            ? `<path d="M58 52 L70 38 L82 52 L70 66 Z" fill="${species.accentStrong}" opacity="0.78" />
               <path d="M138 52 L150 38 L162 52 L150 66 Z" fill="${species.accentStrong}" opacity="0.78" />`
            : '';

      const particles = Array.from({ length: sparkleCount }, (_, index) => {
        const px = 38 + ((seed * (index + 3)) % 144);
        const py = 32 + ((seed * (index + 7)) % 72);
        const radius = 3 + ((seed + index) % 5);
        return `<circle cx="${px}" cy="${py}" r="${radius}" fill="#ffffff" opacity="${0.34 + ((index % 3) * 0.16)}" />`;
      }).join('');

      const accessory = (() => {
        switch ((seed >> 3) % 6) {
          case 0:
            return `<path d="M86 156 Q110 144 134 156" stroke="${species.accentStrong}" stroke-width="10" stroke-linecap="round" fill="none" />
                    <circle cx="110" cy="164" r="12" fill="${species.accentStrong}" opacity="0.82" />`;
          case 1:
            return `<path d="M70 88 Q110 60 150 88" stroke="${species.accentStrong}" stroke-width="6" stroke-linecap="round" fill="none" />
                    <circle cx="110" cy="72" r="8" fill="${species.accentStrong}" />`;
          case 2:
            return `<path d="M72 162 Q110 190 148 162" stroke="${species.accent}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.68" />`;
          case 3:
            return `<path d="M56 102 Q78 88 96 98" stroke="${species.accentStrong}" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.72" />
                    <path d="M164 102 Q142 88 124 98" stroke="${species.accentStrong}" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.72" />`;
          case 4:
            return `<circle cx="78" cy="154" r="7" fill="${species.accentStrong}" opacity="0.74" />
                    <circle cx="142" cy="154" r="7" fill="${species.accentStrong}" opacity="0.74" />`;
          default:
            return '';
        }
      })();

      const markPattern = (() => {
        switch ((seed >> 5) % 5) {
          case 0:
            return `<path d="M78 118 Q110 88 142 118" stroke="${hexToRgba(species.accentStrong, 0.42)}" stroke-width="10" stroke-linecap="round" fill="none" />`;
          case 1:
            return `<ellipse cx="110" cy="132" rx="18" ry="12" fill="${hexToRgba(species.accentStrong, 0.22)}" />
                    <ellipse cx="82" cy="118" rx="10" ry="7" fill="${hexToRgba(species.accentStrong, 0.2)}" />
                    <ellipse cx="138" cy="118" rx="10" ry="7" fill="${hexToRgba(species.accentStrong, 0.2)}" />`;
          case 2:
            return `<path d="M92 86 L104 106 L92 126" stroke="${hexToRgba(species.accentStrong, 0.48)}" stroke-width="6" stroke-linecap="round" fill="none" />
                    <path d="M128 86 L116 106 L128 126" stroke="${hexToRgba(species.accentStrong, 0.48)}" stroke-width="6" stroke-linecap="round" fill="none" />`;
          case 3:
            return `<path d="M70 130 Q110 154 150 130" stroke="${hexToRgba(species.accentStrong, 0.38)}" stroke-width="8" stroke-linecap="round" fill="none" />`;
          default:
            return '';
        }
      })();

      const avatarCore = (() => {
        if (family === 'slime') {
          return `
            <path d="M58 156 Q58 96 92 78 Q110 48 128 78 Q162 96 162 156 Q154 184 110 188 Q66 184 58 156 Z" fill="url(#pet-fill-${idSuffix})" />
            <path d="M72 92 Q96 62 110 70 Q124 62 148 92" fill="${hexToRgba(species.accentSoft, 0.9)}" />
            <circle cx="90" cy="122" r="11" fill="${eyeTone}" />
            <circle cx="130" cy="122" r="11" fill="${eyeTone}" />
            <circle cx="94" cy="118" r="4" fill="#ffffff" />
            <circle cx="134" cy="118" r="4" fill="#ffffff" />
            <ellipse cx="110" cy="142" rx="12" ry="8" fill="${species.accentStrong}" />
            <path d="M98 152 Q110 164 122 152" stroke="${species.accentStrong}" stroke-width="5" stroke-linecap="round" fill="none" />
          `;
        }
        if (family === 'serpent') {
          return `
            <path d="M62 166 Q54 132 74 108 Q98 78 132 82 Q156 84 162 108 Q168 134 144 150 Q128 160 126 178 Q124 190 112 190 Q100 190 98 176 Q94 150 72 144 Q62 140 62 166 Z" fill="url(#pet-fill-${idSuffix})" />
            <path d="M118 70 Q128 42 144 54 Q154 62 148 88" fill="${species.accentStrong}" />
            <path d="M102 72 Q92 42 76 54 Q66 62 72 88" fill="${species.accentStrong}" />
            <circle cx="96" cy="112" r="10" fill="${eyeTone}" />
            <circle cx="130" cy="112" r="10" fill="${eyeTone}" />
            <circle cx="100" cy="108" r="4" fill="#ffffff" />
            <circle cx="134" cy="108" r="4" fill="#ffffff" />
            <path d="M100 134 Q110 142 120 134" stroke="${species.accentStrong}" stroke-width="5" stroke-linecap="round" fill="none" />
            <path d="M110 138 Q112 148 120 154" stroke="#ff6a7a" stroke-width="4" stroke-linecap="round" fill="none" />
          `;
        }
        if (family === 'avian') {
          return `
            <ellipse cx="110" cy="144" rx="44" ry="46" fill="${hexToRgba(species.accentSoft, 0.98)}" />
            <path d="M70 136 Q36 122 44 88 Q70 88 88 118" fill="${hexToRgba(species.accent, 0.9)}" />
            <path d="M150 136 Q184 122 176 88 Q150 88 132 118" fill="${hexToRgba(species.accent, 0.9)}" />
            <ellipse cx="110" cy="102" rx="48" ry="42" fill="url(#pet-fill-${idSuffix})" />
            <path d="M98 60 L110 34 L122 60" fill="${species.accentStrong}" />
            <circle cx="92" cy="110" r="11" fill="${eyeTone}" />
            <circle cx="128" cy="110" r="11" fill="${eyeTone}" />
            <circle cx="96" cy="106" r="4" fill="#ffffff" />
            <circle cx="132" cy="106" r="4" fill="#ffffff" />
            <path d="M102 128 L110 138 L118 128" fill="${species.accentStrong}" />
            <path d="M104 144 Q110 150 116 144" stroke="${species.accentStrong}" stroke-width="4" stroke-linecap="round" fill="none" />
          `;
        }
        if (family === 'dragon') {
          return `
            <ellipse cx="110" cy="144" rx="48" ry="42" fill="${hexToRgba(species.accentSoft, 0.96)}" />
            <ellipse cx="110" cy="102" rx="50" ry="44" fill="url(#pet-fill-${idSuffix})" />
            <path d="M74 116 Q38 100 44 70 Q70 70 84 100" fill="${hexToRgba(species.accent, 0.88)}" />
            <path d="M146 116 Q182 100 176 70 Q150 70 136 100" fill="${hexToRgba(species.accent, 0.88)}" />
            <path d="M84 58 L94 34 L104 62" fill="${species.accentStrong}" />
            <path d="M136 58 L126 34 L116 62" fill="${species.accentStrong}" />
            <circle cx="92" cy="106" r="12" fill="${eyeTone}" />
            <circle cx="128" cy="106" r="12" fill="${eyeTone}" />
            <circle cx="96" cy="102" r="4" fill="#ffffff" />
            <circle cx="132" cy="102" r="4" fill="#ffffff" />
            <ellipse cx="110" cy="124" rx="12" ry="8" fill="${species.accentStrong}" />
            <path d="M100 136 Q110 148 120 136" stroke="${species.accentStrong}" stroke-width="5" stroke-linecap="round" fill="none" />
            <path d="M154 150 Q182 154 180 176 Q154 180 144 160" fill="${hexToRgba(species.accent, 0.78)}" />
          `;
        }
        if (family === 'bunny') {
          return `
            <ellipse cx="110" cy="146" rx="46" ry="40" fill="${hexToRgba(species.accentSoft, 0.98)}" />
            <ellipse cx="110" cy="106" rx="50" ry="44" fill="url(#pet-fill-${idSuffix})" />
            <ellipse cx="84" cy="54" rx="14" ry="42" fill="${species.accent}" />
            <ellipse cx="136" cy="54" rx="14" ry="42" fill="${species.accent}" />
            <ellipse cx="84" cy="56" rx="7" ry="28" fill="${hexToRgba(species.accentSoft, 0.96)}" />
            <ellipse cx="136" cy="56" rx="7" ry="28" fill="${hexToRgba(species.accentSoft, 0.96)}" />
            <circle cx="92" cy="110" r="11" fill="${eyeTone}" />
            <circle cx="128" cy="110" r="11" fill="${eyeTone}" />
            <circle cx="96" cy="106" r="4" fill="#ffffff" />
            <circle cx="132" cy="106" r="4" fill="#ffffff" />
            <ellipse cx="110" cy="128" rx="10" ry="7" fill="${species.accentStrong}" />
            <path d="M102 140 Q110 148 118 140" stroke="${species.accentStrong}" stroke-width="5" stroke-linecap="round" fill="none" />
          `;
        }
        if (family === 'feline') {
          return `
            <ellipse cx="110" cy="146" rx="48" ry="40" fill="${hexToRgba(species.accentSoft, 0.98)}" />
            <ellipse cx="110" cy="106" rx="50" ry="44" fill="url(#pet-fill-${idSuffix})" />
            <path d="M74 68 L92 36 L102 74 Z" fill="${species.accentStrong}" />
            <path d="M146 68 L128 36 L118 74 Z" fill="${species.accentStrong}" />
            <circle cx="92" cy="108" r="11" fill="${eyeTone}" />
            <circle cx="128" cy="108" r="11" fill="${eyeTone}" />
            <circle cx="96" cy="104" r="4" fill="#ffffff" />
            <circle cx="132" cy="104" r="4" fill="#ffffff" />
            <ellipse cx="110" cy="124" rx="10" ry="7" fill="${species.accentStrong}" />
            <path d="M102 136 Q110 146 118 136" stroke="${species.accentStrong}" stroke-width="5" stroke-linecap="round" fill="none" />
            <path d="M154 148 Q186 142 182 178 Q154 182 146 158" fill="${hexToRgba(species.accent, 0.72)}" />
          `;
        }
        return `
          <ellipse cx="110" cy="146" rx="50" ry="40" fill="${hexToRgba(species.accentSoft, 0.98)}" />
          <ellipse cx="110" cy="104" rx="52" ry="46" fill="url(#pet-fill-${idSuffix})" />
          <path d="M72 68 L90 36 L102 74 Z" fill="${species.accentStrong}" />
          <path d="M148 68 L130 36 L118 74 Z" fill="${species.accentStrong}" />
          <circle cx="92" cy="108" r="11" fill="${eyeTone}" />
          <circle cx="128" cy="108" r="11" fill="${eyeTone}" />
          <circle cx="96" cy="104" r="4" fill="#ffffff" />
          <circle cx="132" cy="104" r="4" fill="#ffffff" />
          <ellipse cx="110" cy="124" rx="12" ry="8" fill="${species.accentStrong}" />
          <path d="M100 136 Q110 146 120 136" stroke="${species.accentStrong}" stroke-width="5" stroke-linecap="round" fill="none" />
          <ellipse cx="82" cy="170" rx="10" ry="16" fill="${hexToRgba(species.accentSoft, 0.98)}" />
          <ellipse cx="138" cy="170" rx="10" ry="16" fill="${hexToRgba(species.accentSoft, 0.98)}" />
        `;
      })();

      return `
        <div class="pet-avatar-art" style="box-shadow:0 18px 34px ${shellGlow};" ${getPetThemeStyleAttribute(species.id)}>
          <svg viewBox="0 0 220 220" class="pet-avatar-svg" role="img" aria-label="${escapeHtml(label || species.name)}">
            <defs>
              <linearGradient id="pet-fill-${idSuffix}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${species.accentSoft}" />
                <stop offset="52%" stop-color="${species.accent}" />
                <stop offset="100%" stop-color="${species.accentStrong}" />
              </linearGradient>
              <radialGradient id="pet-bg-${idSuffix}" cx="34%" cy="28%" r="72%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="55%" stop-color="${species.accentSoft}" />
                <stop offset="100%" stop-color="${hexToRgba(species.accent, 0.88)}" />
              </radialGradient>
            </defs>
            <circle cx="110" cy="110" r="96" fill="url(#pet-bg-${idSuffix})" />
            <circle cx="110" cy="110" r="96" fill="${hexToRgba(species.glow || species.accent, 0.18)}" />
            <ellipse cx="110" cy="178" rx="56" ry="16" fill="${accentGlow}" />
            ${particles}
            ${rarityDeco}
            ${avatarCore}
            ${markPattern}
            ${accessory}
          </svg>
        </div>
      `;
    }

    return {
      purchaseAndReviveActivePet,
      renderPetBattleModal,
      openPetBattleModal,
      renderPetHomeModal,
      openPetHomeModal,
      renderPetAvatarMarkup
    };
  }

  globalObject.ClassScorePetRuntime = {
    createRuntime
  };
})(window);
