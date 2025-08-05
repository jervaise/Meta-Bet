// WoW Spec Data for The War Within with Real Icons
const wowSpecs = {
  dps: [
    { name: 'Fury', class: 'Warrior', icon: 'spec/warrior_fury.png', role: 'melee' },
    { name: 'Arms', class: 'Warrior', icon: 'spec/warrior_arms.png', role: 'melee' },
    { name: 'Retribution', class: 'Paladin', icon: 'spec/paladin_ret.png', role: 'melee' },
    { name: 'Enhancement', class: 'Shaman', icon: 'spec/shaman_enhancement.png', role: 'melee' },
    { name: 'Feral', class: 'Druid', icon: 'spec/druid_feral.png', role: 'melee' },
    { name: 'Assassination', class: 'Rogue', icon: 'spec/rogue_assa.png', role: 'melee' },
    { name: 'Outlaw', class: 'Rogue', icon: 'spec/rogue_outlaw.png', role: 'melee' },
    { name: 'Subtlety', class: 'Rogue', icon: 'spec/rogue_sub.png', role: 'melee' },
    { name: 'Unholy', class: 'Death Knight', icon: 'spec/dk_unholy.png', role: 'melee' },
    { name: 'Frost', class: 'Death Knight', icon: 'spec/dk_frost.png', role: 'melee' },
    { name: 'Havoc', class: 'Demon Hunter', icon: 'spec/dh_havoc.png', role: 'melee' },
    { name: 'Windwalker', class: 'Monk', icon: 'spec/monk_ww.png', role: 'melee' },
    { name: 'Survival', class: 'Hunter', icon: 'spec/hunter_survival.png', role: 'melee' },
    { name: 'Arcane', class: 'Mage', icon: 'spec/mage_arcane.png', role: 'ranged' },
    { name: 'Fire', class: 'Mage', icon: 'spec/mage_fire.png', role: 'ranged' },
    { name: 'Frost', class: 'Mage', icon: 'spec/mage_frost.png', role: 'ranged' },
    { name: 'Affliction', class: 'Warlock', icon: 'spec/warlock_affli.png', role: 'ranged' },
    { name: 'Demonology', class: 'Warlock', icon: 'spec/warlock_demono.png', role: 'ranged' },
    { name: 'Destruction', class: 'Warlock', icon: 'spec/warlock_destru.png', role: 'ranged' },
    { name: 'Shadow', class: 'Priest', icon: 'spec/priest_shadow.png', role: 'ranged' },
    { name: 'Balance', class: 'Druid', icon: 'spec/druid_balance.png', role: 'ranged' },
    { name: 'Elemental', class: 'Shaman', icon: 'spec/shaman_elem.png', role: 'ranged' },
    { name: 'Beast Mastery', class: 'Hunter', icon: 'spec/hunter_bm.png', role: 'ranged' },
    { name: 'Marksmanship', class: 'Hunter', icon: 'spec/hunter_mm.png', role: 'ranged' },
    { name: 'Devastation', class: 'Evoker', icon: 'spec/evoker_devestation.jpg', role: 'ranged' },
    { name: 'Augmentation', class: 'Evoker', icon: 'spec/evoker_augmentation.jpg', role: 'support' }
  ],
  tank: [
    { name: 'Protection', class: 'Warrior', icon: 'spec/warrior_prot.png', role: 'tank' },
    { name: 'Protection', class: 'Paladin', icon: 'spec/paladin_protection.png', role: 'tank' },
    { name: 'Blood', class: 'Death Knight', icon: 'spec/dk_blood.png', role: 'tank' },
    { name: 'Vengeance', class: 'Demon Hunter', icon: 'spec/dh_vengeance.png', role: 'tank' },
    { name: 'Guardian', class: 'Druid', icon: 'spec/druid_guardian.png', role: 'tank' },
    { name: 'Brewmaster', class: 'Monk', icon: 'spec/monk_brewmaster.png', role: 'tank' }
  ],
  healer: [
    { name: 'Holy', class: 'Priest', icon: 'spec/priest_holy.png', role: 'healer' },
    { name: 'Discipline', class: 'Priest', icon: 'spec/priest_disc.png', role: 'healer' },
    { name: 'Holy', class: 'Paladin', icon: 'spec/paladin_holy.png', role: 'healer' },
    { name: 'Restoration', class: 'Shaman', icon: 'spec/shaman_resto.png', role: 'healer' },
    { name: 'Restoration', class: 'Druid', icon: 'spec/druid_resto.png', role: 'healer' },
    { name: 'Mistweaver', class: 'Monk', icon: 'spec/monk_mistweaver.png', role: 'healer' },
    { name: 'Preservation', class: 'Evoker', icon: 'spec/evoker_preservation.jpg', role: 'healer' }
  ]
};

// Global state
let currentUser = null;
let gameData = {
  users: {},
  predictions: {}, // Single predictions per user per category
  lockedPredictions: {}, // Track locked predictions
  stats: { totalPredictions: 0, activePlayers: 0 }
};

// Removed weekly system - now using single predictions

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
  loadGameData();
  initializeEventListeners();
  initializeTierMaker();
  updateStats();
  checkUserSession();
  initializeEasterEggs();
});

// Event Listeners
function initializeEventListeners() {
  // Login form
  document.getElementById('loginForm').addEventListener('submit', handleLogin);

  // Category tabs
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => switchCategory(button.dataset.category));
  });

  // Result tabs
  document.querySelectorAll('.result-tab').forEach(button => {
    button.addEventListener('click', () => switchResultTab(button.dataset.result));
  });
}

// Initialize spec grids for all categories
function initializeSpecGrids() {
  const categories = ['dps', 'tank', 'healer'];

  categories.forEach(category => {
    const grid = document.getElementById(`${category}Specs`);
    if (grid) {
      grid.innerHTML = '';
      wowSpecs[category].forEach((spec, index) => {
        const specCard = createSpecCard(spec, category, index);
        grid.appendChild(specCard);
      });
    }
  });


}

// Create spec card element
function createSpecCard(spec, category, index) {
  const card = document.createElement('div');
  card.className = 'spec-card';
  card.dataset.spec = `${spec.name}-${spec.class}`;
  card.dataset.category = category;

  card.innerHTML = `
        <div class="spec-icon">
            <img src="${spec.icon}" alt="${spec.name}" class="spec-image" />
        </div>
        <div class="spec-name">${spec.name}</div>
        <div class="spec-class">${spec.class}</div>
    `;

  card.addEventListener('click', () => selectSpec(card, category));
  return card;
}

// Handle user login
function handleLogin(e) {
  e.preventDefault();
  const playerName = document.getElementById('playerName').value.trim();

  if (!playerName) {
    showToast('Please enter your name', 'error');
    return;
  }

  if (playerName.length > 20) {
    showToast('Name must be 20 characters or less', 'error');
    return;
  }

  currentUser = playerName;

  // Initialize user data if doesn't exist
  if (!gameData.users[playerName]) {
    gameData.users[playerName] = {
      name: playerName,
      joinDate: new Date().toISOString(),
      predictions: {}
    };
    gameData.stats.activePlayers++;
  }

  // Show main content
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
  document.getElementById('userInfo').style.display = 'flex';
  document.getElementById('currentUser').textContent = playerName;

  saveGameData();
  updateStats();
  loadUserPredictions();
  updateResults();
  showToast(`Welcome back, ${playerName}!`, 'success');
}

// Handle logout
function logout() {
  currentUser = null;
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('userInfo').style.display = 'none';
  document.getElementById('playerName').value = '';
  clearAllSelections();
}

// Switch between betting categories
function switchCategory(category) {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-category="${category}"]`).classList.add('active');

  // Update content
  document.querySelectorAll('.category-content').forEach(content => content.classList.remove('active'));
  document.getElementById(category).classList.add('active');
}

// Switch between result tabs
function switchResultTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.result-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-result="${tab}"]`).classList.add('active');

  // Update content
  document.querySelectorAll('.result-panel').forEach(panel => panel.classList.remove('active'));
  document.getElementById(tab).classList.add('active');

  // Load content based on tab
  switch (tab) {
    case 'predictions':
      updateTierListResults();
      break;
  }
}

// NEW TIER MAKER SYSTEM - Initialize drag and drop
function initializeTierMaker() {
  const categories = ['dps', 'tank', 'healer'];

  categories.forEach(category => {
    const specGrid = document.getElementById(`${category}Specs`);
    if (specGrid) {
      createSpecCards(category, specGrid);
    }
  });

  // Initialize drag and drop event listeners
  initializeDragAndDrop();

  // Load user's existing tier lists
  loadUserPredictions();
}

// Create draggable spec cards
function createSpecCards(category, container) {
  container.innerHTML = '';

  // Get the correct specs for this category
  let specs;
  if (category === 'dps') {
    specs = wowSpecs.dps;
  } else if (category === 'tank') {
    specs = wowSpecs.tank;
  } else if (category === 'healer') {
    specs = wowSpecs.healer;
  } else {
    return;
  }

  specs.forEach((spec, index) => {
    const card = document.createElement('div');
    card.className = 'spec-card';
    card.draggable = true;
    card.dataset.spec = `${spec.name}-${spec.class}`;
    card.dataset.category = category;

    card.innerHTML = `
      <div class="spec-icon">
        <img src="${spec.icon}" alt="${spec.name}" class="spec-image">
      </div>
      <div class="spec-info">
        <div class="spec-name">${spec.name}</div>
        <div class="spec-class">${spec.class}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Initialize drag and drop functionality
function initializeDragAndDrop() {
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('dragover', handleDragOver);
  document.addEventListener('drop', handleDrop);
  document.addEventListener('dragend', handleDragEnd);

  // Handle when mouse leaves window during drag
  document.addEventListener('mouseleave', () => {
    if (draggedElement) {
      handleDragEnd({ target: draggedElement });
    }
  });

  // Prevent default image dragging behavior
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  }, true);
}

let draggedElement = null;

function handleDragStart(e) {
  if (!e.target.classList.contains('spec-card')) return;

  // Check if tier list is locked
  const category = e.target.dataset.category;
  if (isPredictionLocked(currentUser, category)) {
    e.preventDefault();
    showToast(`Your ${category} tier list is LOCKED! 🔒`, 'error');
    return;
  }

  draggedElement = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  const dropzone = e.target.closest('.tier-dropzone, .spec-grid');

  // Remove drag-over from all elements first
  document.querySelectorAll('.drag-over').forEach(el => {
    el.classList.remove('drag-over');
  });

  if (dropzone) {
    dropzone.classList.add('drag-over');
    e.dataTransfer.dropEffect = 'move';
  }
}

function handleDrop(e) {
  e.preventDefault();
  const dropzone = e.target.closest('.tier-dropzone, .spec-grid');
  const dropTarget = e.target.closest('.spec-card.in-tier, .spec-card');

  if (dropzone && draggedElement) {
    // Remove from current location
    if (draggedElement.parentNode) {
      draggedElement.parentNode.removeChild(draggedElement);
    }

    // Add to new location
    if (dropzone.classList.contains('tier-dropzone')) {
      // Dropped in a tier
      const tier = dropzone.dataset.tier;
      draggedElement.classList.add('in-tier');
      draggedElement.dataset.tier = tier;

      // Handle horizontal placement within tier
      if (dropTarget && dropTarget.classList.contains('in-tier')) {
        // Insert before the target spec
        dropTarget.parentNode.insertBefore(draggedElement, dropTarget);
      } else {
        // Add to end of tier
        dropzone.appendChild(draggedElement);
      }
    } else {
      // Dropped back in spec pool
      draggedElement.classList.remove('in-tier');
      delete draggedElement.dataset.tier;
      dropzone.appendChild(draggedElement);
    }

    dropzone.classList.remove('drag-over');

    // Highlight the tier row briefly
    const tierRow = dropzone.closest('.tier-row');
    if (tierRow) {
      tierRow.classList.add('highlight');
      setTimeout(() => tierRow.classList.remove('highlight'), 1000);
    }
  }
}

function handleDragEnd(e) {
  if (e.target.classList.contains('spec-card')) {
    e.target.classList.remove('dragging');
  }

  // Clean up any drag-over states
  document.querySelectorAll('.drag-over').forEach(el => {
    el.classList.remove('drag-over');
  });

  // Remove highlight from tier rows
  document.querySelectorAll('.tier-row.highlight').forEach(row => {
    row.classList.remove('highlight');
  });

  // Additional cleanup for any lingering drag states
  document.querySelectorAll('.spec-card').forEach(card => {
    card.classList.remove('dragging');
  });

  draggedElement = null;
}

// Lock tier list UI - NEW SYSTEM!
function lockTierListUI(category) {
  const categoryContent = document.querySelector(`#${category}`);
  if (categoryContent) {
    categoryContent.classList.add('locked');
  }

  const submitButton = document.querySelector(`#${category} .btn`);
  if (submitButton) {
    submitButton.classList.add('locked');
    submitButton.disabled = true;
    submitButton.textContent = `🔒 ${category.toUpperCase()} Tier List LOCKED`;
  }
}

// Check if prediction is locked
function isPredictionLocked(user, category) {
  if (!user || !gameData.lockedPredictions[user]) return false;
  return gameData.lockedPredictions[user][category];
}

// Lock category UI after submission
function lockCategoryUI(category) {
  const categoryCards = document.querySelectorAll(`#${category} .spec-card`);
  const submitButton = document.querySelector(`#${category} .btn-primary`);

  categoryCards.forEach(card => {
    card.classList.add('locked');
    card.style.pointerEvents = 'none';
  });

  if (submitButton) {
    submitButton.textContent = `🔒 LOCKED - Week ${gameData.currentWeek}`;
    submitButton.disabled = true;
    submitButton.classList.add('locked');
    submitButton.style.opacity = '0.5';
  }
}

// Random roasting messages for when friends submit predictions
function getRandomRoast(username, category) {
  const roasts = [
    `${username} thinks they know the meta... we'll see about that! 😏`,
    `Bold choice, ${username}! Hope you're ready to eat those words! 🍽️`,
    `${username}'s crystal ball must be cloudy today! 🔮`,
    `Someone's about to learn about the real meta the hard way! 💀`,
    `${username} just locked in some spicy takes! 🌶️`,
    `This is either genius or complete madness, ${username}! 🤡`,
    `${username} is betting big on copium! 💊`,
    `The meta gods are laughing at ${username}'s choices! ⚡`,
    `${username} just volunteered for the Hall of Shame! 🏛️`,
    `May RNGesus have mercy on ${username}'s soul! 🙏`
  ];

  const categoryRoasts = {
    dps: [
      `${username} picked DPS specs like they're playing solo queue! 🎯`,
      `Those DPS choices are about as meta as a mage tank! 🧙‍♂️`,
      `${username}'s DPS picks have main character syndrome! ⭐`
    ],
    tank: [
      `${username}'s tank choices are squishier than their ego! 🛡️`,
      `Those tanks will fold faster than ${username} in high keys! 📰`,
      `${username} thinks tanking is just DPS with extra steps! 💪`
    ],
    healer: [
      `${username}'s healer picks can't save them from this embarrassment! 💚`,
      `Those healers will need healing after seeing this meta! 🩹`,
      `${username} believes in the power of positive thinking over HPS! ✨`
    ],
    overall: [
      `${username}'s top 5 looks like a bottom 5! 📉`,
      `That's not a meta list, that's a wishlist! 📝`,
      `${username} is living in Season 1 apparently! 📅`
    ]
  };

  const specificRoasts = categoryRoasts[category] || [];
  const allRoasts = [...roasts, ...specificRoasts];

  return allRoasts[Math.floor(Math.random() * allRoasts.length)];
}

// Update rank badges after selection changes
function updateRankBadges(category) {
  const selectedSpecs = document.querySelectorAll(`#${category} .spec-card.selected`);
  selectedSpecs.forEach((card, index) => {
    const badge = card.querySelector('.rank-badge');
    if (badge) {
      badge.textContent = index + 1;
    }
  });
}

// Submit tier list for a category - SIMPLIFIED SYSTEM!
function submitTierList(category) {
  if (!currentUser) {
    showToast('Please log in first', 'error');
    return;
  }

  // Check if already locked
  if (isPredictionLocked(currentUser, category)) {
    showToast(`Your ${category} tier list is already locked! 🔒`, 'error');
    return;
  }

  // Collect tier list data
  const tierList = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: []
  };

  // Get specs from each tier
  Object.keys(tierList).forEach(tier => {
    const dropzone = document.querySelector(`[data-tier="${tier}"][data-category="${category}"]`);
    if (dropzone) {
      const specsInTier = dropzone.querySelectorAll('.spec-card');
      specsInTier.forEach(card => {
        tierList[tier].push({
          spec: card.dataset.spec,
          name: card.querySelector('.spec-name').textContent,
          class: card.querySelector('.spec-class').textContent
        });
      });
    }
  });

  // Check if at least one spec is placed
  const totalSpecs = Object.values(tierList).reduce((sum, tier) => sum + tier.length, 0);
  if (totalSpecs === 0) {
    showToast('Please drag at least one spec into a tier!', 'warning');
    return;
  }

  const prediction = {
    category: category,
    tierList: tierList,
    timestamp: new Date().toISOString(),
    user: currentUser
  };

  // Initialize user predictions if needed
  if (!gameData.users[currentUser].predictions) {
    gameData.users[currentUser].predictions = {};
  }

  // Save prediction
  if (!gameData.users[currentUser].predictions[category]) {
    gameData.stats.totalPredictions++;
  }
  gameData.users[currentUser].predictions[category] = prediction;

  // LOCK THE TIER LIST - NO CHANGES ALLOWED! 🔒
  if (!gameData.lockedPredictions[currentUser]) {
    gameData.lockedPredictions[currentUser] = {};
  }
  gameData.lockedPredictions[currentUser][category] = true;

  saveGameData();
  updateStats();
  updateResults();

  // Lock the UI for this category
  lockTierListUI(category);

  const roastMessage = getRandomRoast(currentUser, category);
  showToast(`🔒 ${category.toUpperCase()} tier list LOCKED! ${roastMessage}`, 'success');

  // Add locked styling to tier maker container
  const tierContainer = document.querySelector(`#${category} .tiermaker-container`);
  if (tierContainer) {
    tierContainer.classList.add('locked');
  }
}

// Load user's previous tier lists - SIMPLIFIED SYSTEM!
function loadUserPredictions() {
  if (!currentUser || !gameData.users[currentUser]) return;

  const userPredictions = gameData.users[currentUser].predictions;

  if (!userPredictions) return;

  ['dps', 'tank', 'healer'].forEach(category => {
    const prediction = userPredictions[category];
    if (prediction && prediction.tierList) {
      // Restore tier list from saved data
      Object.entries(prediction.tierList).forEach(([tier, specs]) => {
        const dropzone = document.querySelector(`[data-tier="${tier}"][data-category="${category}"]`);
        if (dropzone) {
          specs.forEach(specData => {
            // Find the spec card in the pool and move it to the tier
            const specCard = document.querySelector(`[data-spec="${specData.spec}"][data-category="${category}"]`);
            if (specCard && specCard.parentNode) {
              specCard.parentNode.removeChild(specCard);
              specCard.classList.add('in-tier');
              specCard.dataset.tier = tier;
              dropzone.appendChild(specCard);
            }
          });
        }
      });

      // Check if this category is locked and apply locked state
      if (isPredictionLocked(currentUser, category)) {
        lockTierListUI(category);

        // Show reminder that tier list is locked
        setTimeout(() => {
          showToast(`Your ${category} tier list is LOCKED! 🔒`, 'warning');
        }, 1000);
      }
    }
  });
}

// Update tier list results display - SIMPLIFIED SYSTEM!
function updateTierListResults() {
  const container = document.getElementById('currentPredictions');
  container.innerHTML = '';

  const categories = ['dps', 'tank', 'healer'];

  // Add header
  const header = document.createElement('div');
  header.innerHTML = `<h2>Current M+ Tier List Predictions</h2>`;
  header.style.textAlign = 'center';
  header.style.marginBottom = '2rem';
  header.style.color = 'var(--primary-color)';
  container.appendChild(header);

  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h3>M+ ${category.toUpperCase()} Tier List Results</h3>`;
    categoryDiv.className = 'tier-results-category';

    // Collect all tier lists for this category
    const tierData = { S: {}, A: {}, B: {}, C: {}, D: {} };

    Object.values(gameData.users).forEach(user => {
      if (user.predictions && user.predictions[category]) {
        const tierList = user.predictions[category].tierList;
        if (tierList) {
          Object.entries(tierList).forEach(([tier, specs]) => {
            specs.forEach(spec => {
              const key = spec.spec;
              if (!tierData[tier][key]) {
                tierData[tier][key] = {
                  name: spec.name,
                  class: spec.class,
                  votes: 0
                };
              }
              tierData[tier][key].votes++;
            });
          });
        }
      }
    });

    // Create tier result display
    const tierResultsDiv = document.createElement('div');
    tierResultsDiv.className = 'tier-results';

    Object.entries(tierData).forEach(([tier, specs]) => {
      const tierDiv = document.createElement('div');
      tierDiv.className = 'tier-result-row';

      const tierLabel = document.createElement('div');
      tierLabel.className = `tier-result-label tier-${tier.toLowerCase()}`;
      tierLabel.textContent = tier;

      const specsList = document.createElement('div');
      specsList.className = 'tier-result-specs';

      const sortedSpecs = Object.values(specs)
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 8); // Limit to top 8 per tier

      if (sortedSpecs.length > 0) {
        sortedSpecs.forEach(spec => {
          const specItem = document.createElement('div');
          specItem.className = 'tier-result-spec';

          // Find the spec icon
          let specIconPath = '';
          const allSpecs = [...wowSpecs.dps, ...wowSpecs.tank, ...wowSpecs.healer];
          const foundSpec = allSpecs.find(s => `${s.name}-${s.class}` === spec.spec);

          if (foundSpec) {
            specIconPath = foundSpec.icon;
          }

          specItem.innerHTML = `
            <div class="tier-result-spec-icon">
              <img src="${specIconPath}" alt="${spec.name}" title="${spec.name} ${spec.class}">
            </div>
            <div class="tier-result-spec-content">
              <span class="spec-name">${spec.name}</span>
              <span class="spec-class">${spec.class}</span>
            </div>
            <span class="spec-votes">${spec.votes} votes</span>
          `;
          specsList.appendChild(specItem);
        });
      } else {
        specsList.innerHTML = '<span class="no-specs">No specs ranked in this tier</span>';
      }

      tierDiv.appendChild(tierLabel);
      tierDiv.appendChild(specsList);
      tierResultsDiv.appendChild(tierDiv);
    });

    if (Object.values(tierData).every(tier => Object.keys(tier).length === 0)) {
      categoryDiv.innerHTML += '<p>No tier lists submitted yet for this category.</p>';
    } else {
      categoryDiv.appendChild(tierResultsDiv);
    }

    container.appendChild(categoryDiv);
  });
}

// Update leaderboard
function updateLeaderboard() {
  const container = document.getElementById('leaderboardContent');
  container.innerHTML = '<h3>Player Rankings</h3>';

  const players = Object.values(gameData.users).map(user => ({
    name: user.name,
    totalBets: Object.keys(user.bets).length,
    joinDate: new Date(user.joinDate)
  })).sort((a, b) => b.totalBets - a.totalBets);

  if (players.length > 0) {
    const leaderboardList = document.createElement('div');
    leaderboardList.className = 'leaderboard-list';

    players.forEach((player, index) => {
      const playerCard = document.createElement('div');
      playerCard.className = 'prediction-card';
      playerCard.innerHTML = `
                <div class="prediction-header">
                    <span class="player-name">#${index + 1} ${player.name}</span>
                    <span class="bet-time">Joined ${player.joinDate.toLocaleDateString()}</span>
                </div>
                <div class="prediction-list">
                    <span class="prediction-item">Total Bets: ${player.totalBets}</span>
                </div>
            `;
      leaderboardList.appendChild(playerCard);
    });

    container.appendChild(leaderboardList);
  } else {
    container.innerHTML += '<p>No players yet.</p>';
  }
}



// Update stats
function updateStats() {
  document.getElementById('totalBets').textContent = gameData.stats.totalPredictions;
  document.getElementById('activePlayers').textContent = gameData.stats.activePlayers;
}

// Update all results
function updateResults() {
  updateTierListResults();
  updatePlayerTierLists();
}

// Update individual player tier lists
function updatePlayerTierLists() {
  const container = document.getElementById('playerTierLists');
  container.innerHTML = '';

  const players = Object.values(gameData.users).filter(user => {
    return user.predictions && Object.keys(user.predictions).length > 0;
  });

  if (players.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No tier lists submitted yet. Be the first to create one!</p>';
    return;
  }

  players.forEach(player => {
    const playerCard = document.createElement('div');
    playerCard.className = 'player-tierlist-card';

    // Count submitted categories
    const submittedCategories = Object.keys(player.predictions || {});
    const totalCategories = ['dps', 'tank', 'healer'].length;

    const playerHeader = document.createElement('div');
    playerHeader.className = 'player-tierlist-header';
    playerHeader.innerHTML = `
      <div class="player-name-large">${player.name}</div>
      <div class="player-stats">
        <span>${submittedCategories.length}/${totalCategories} categories</span>
        <span>Joined ${new Date(player.joinDate).toLocaleDateString()}</span>
      </div>
    `;

    const playerContent = document.createElement('div');
    playerContent.className = 'player-tierlist-content';

    // Display each category's tier list
    ['dps', 'tank', 'healer'].forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'player-category-tierlist';

      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'player-category-header';
      categoryHeader.textContent = `${category.toUpperCase()} Tier List`;

      const tierListDiv = document.createElement('div');

      if (player.predictions && player.predictions[category]) {
        const tierList = player.predictions[category].tierList;

        ['S', 'A', 'B', 'C', 'D'].forEach(tier => {
          const tierRow = document.createElement('div');
          tierRow.className = 'player-tier-row';

          const tierLabel = document.createElement('div');
          tierLabel.className = `player-tier-label tier-${tier.toLowerCase()}`;
          tierLabel.textContent = tier;

          const tierSpecs = document.createElement('div');
          tierSpecs.className = 'player-tier-specs';

          if (tierList[tier] && tierList[tier].length > 0) {
            tierList[tier].forEach(spec => {
              const specIcon = document.createElement('div');
              specIcon.className = 'player-tier-spec';

              // Find the spec icon from wowSpecs
              let specIconPath = '';
              const allSpecs = [...wowSpecs.dps, ...wowSpecs.tank, ...wowSpecs.healer];
              const foundSpec = allSpecs.find(s => `${s.name}-${s.class}` === spec.spec);

              if (foundSpec) {
                specIconPath = foundSpec.icon;
              }

              specIcon.innerHTML = `<img src="${specIconPath}" alt="${spec.name}" title="${spec.name} ${spec.class}">`;
              tierSpecs.appendChild(specIcon);
            });
          } else {
            tierSpecs.innerHTML = '<span class="empty-tier">Empty</span>';
          }

          tierRow.appendChild(tierLabel);
          tierRow.appendChild(tierSpecs);
          tierListDiv.appendChild(tierRow);
        });
      } else {
        tierListDiv.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">Not submitted yet</p>';
      }

      categoryDiv.appendChild(categoryHeader);
      categoryDiv.appendChild(tierListDiv);
      playerContent.appendChild(categoryDiv);
    });

    playerCard.appendChild(playerHeader);
    playerCard.appendChild(playerContent);
    container.appendChild(playerCard);
  });
}

// Export results as JSON
function exportResults() {
  const dataToExport = {
    exportDate: new Date().toISOString(),
    stats: gameData.stats,
    users: gameData.users,
    summary: generateSummary()
  };

  const dataStr = JSON.stringify(dataToExport, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = `wow-meta-predictions-${new Date().toISOString().split('T')[0]}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();

  showToast('Results exported successfully!', 'success');
}

// Generate summary for export
function generateSummary() {
  const summary = {};
  const categories = ['dps', 'tank', 'healer', 'overall'];

  categories.forEach(category => {
    const predictions = {};

    Object.values(gameData.users).forEach(user => {
      if (user.bets[category]) {
        user.bets[category].specs.forEach(spec => {
          const key = spec.spec;
          if (!predictions[key]) {
            predictions[key] = { votes: 0, totalRank: 0 };
          }
          predictions[key].votes++;
          predictions[key].totalRank += spec.rank;
        });
      }
    });

    summary[category] = Object.entries(predictions)
      .map(([spec, data]) => ({
        spec: spec,
        votes: data.votes,
        avgRank: data.totalRank / data.votes
      }))
      .sort((a, b) => b.votes - a.votes || a.avgRank - b.avgRank);
  });

  return summary;
}

// Clear all selections
function clearAllSelections() {
  document.querySelectorAll('.spec-card').forEach(card => {
    card.classList.remove('selected');
    const badge = card.querySelector('.rank-badge');
    if (badge) badge.remove();
  });
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.getElementById('toastContainer').appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Data persistence
function saveGameData() {
  try {
    localStorage.setItem('wowMetaPredictions', JSON.stringify(gameData));
  } catch (e) {
    console.error('Failed to save game data:', e);
  }
}

function loadGameData() {
  // FRESH START! Clear all old data for the new tier system 🔥
  try {
    localStorage.removeItem('wowMetaPredictions');
    localStorage.removeItem('wowMetaGameData');
    localStorage.removeItem('lastUser');

    console.log('🗑️ Database cleared! Starting fresh with the new tier maker system!');

    // Initialize fresh data
    gameData = {
      users: {},
      predictions: {},
      lockedPredictions: {},
      stats: {
        totalPredictions: 0,
        activePlayers: 0
      },
      currentWeek: getCurrentWeekNumber()
    };

    saveGameData();
  } catch (e) {
    console.error('Failed to clear game data:', e);
  }
}

function checkUserSession() {
  // Optional: Implement session persistence
  const lastUser = localStorage.getItem('lastUser');
  if (lastUser && gameData.users[lastUser]) {
    document.getElementById('playerName').value = lastUser;
  }
}

// Save last user for convenience
function saveUserSession() {
  if (currentUser) {
    localStorage.setItem('lastUser', currentUser);
  }
}

// 🎉 EASTER EGGS SECTION 🎉
// Shh... these are secrets! 🤫

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Initialize all the sneaky easter eggs
function initializeEasterEggs() {
  // Console messages for the curious
  console.log("%c🎮 WoW M+ Meta Tracker 🎮", "color: #f4c430; font-size: 20px; font-weight: bold;");
  console.log("%cBuilt for roasting friends and their terrible predictions!", "color: #cbd5e0; font-size: 14px;");
  console.log("%c🔍 Easter Egg Hunt:", "color: #f56565; font-size: 16px; font-weight: bold;");
  console.log("%c- Try the Konami Code (↑↑↓↓←→←→BA)", "color: #48bb78;");
  console.log("%c- Triple-click any spec icon", "color: #48bb78;");
  console.log("%c- Double-click the main header", "color: #48bb78;");
  console.log("%c- Hover over the footer", "color: #48bb78;");
  console.log("%c- Type 'retri' when no input is focused", "color: #48bb78;");
  console.log("%cFun fact: Retribution Paladin mains have questionable life choices 🏳️‍🌈", "color: #667eea; font-style: italic;");

  // Konami code listener
  document.addEventListener('keydown', handleKonamiCode);

  // Triple-click spec cards for spin animation
  addSpecCardEasterEggs();

  // Header double-click easter egg
  addHeaderEasterEgg();

  // Secret typing easter egg
  let secretSequence = '';
  document.addEventListener('keydown', function (e) {
    if (!e.target.tagName.match(/INPUT|TEXTAREA/)) {
      secretSequence += e.key.toLowerCase();
      if (secretSequence.includes('retri')) {
        showSecretMessage();
        secretSequence = '';
      }
      if (secretSequence.length > 10) {
        secretSequence = secretSequence.slice(-10);
      }
    }
  });

  // Random insults in console every 30 seconds
  setInterval(() => {
    const insults = [
      "Still here? Your DPS must be as low as your attention span! 💀",
      "Fun fact: Enhancement Shamans are just Rogues with commitment issues ⚡",
      "Reminder: Tank players think they're the main character 🛡️",
      "Pro tip: Your M+ rating doesn't reflect your personality... thankfully 📈",
      "Breaking news: Local player still believes in off-meta specs 📰"
    ];
    console.log(`%c${insults[Math.floor(Math.random() * insults.length)]}`, "color: #ed8936; font-style: italic;");
  }, 30000);
}

// Handle the legendary Konami Code
function handleKonamiCode(e) {
  konamiCode.push(e.code);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.length === konamiSequence.length &&
    konamiCode.every((code, index) => code === konamiSequence[index])) {
    activateKonamiMode();
    konamiCode = [];
  }
}

// Activate the ultimate rainbow retri mode
function activateKonamiMode() {
  document.body.classList.add('konami-activated');
  showToast('🏳️‍🌈 FABULOUS MODE ACTIVATED! RETRI IS INDEED GAY! 🏳️‍🌈', 'success');

  // Play with the page title
  let originalTitle = document.title;
  let titles = [
    '🏳️‍🌈 RETRI IS GAY 🏳️‍🌈',
    '✨ FABULOUS M+ TRACKER ✨',
    '🌈 RAINBOW SPEC PREDICTIONS 🌈',
    originalTitle
  ];

  let titleIndex = 0;
  const titleInterval = setInterval(() => {
    document.title = titles[titleIndex % titles.length];
    titleIndex++;
  }, 1000);

  // Stop the madness after 10 seconds
  setTimeout(() => {
    document.body.classList.remove('konami-activated');
    document.title = originalTitle;
    clearInterval(titleInterval);
    console.log("%cFabulous mode deactivated. Hope you enjoyed the show! 💅", "color: #f4c430;");
  }, 10000);
}

// Add triple-click easter eggs to spec cards
function addSpecCardEasterEggs() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.spec-card')) {
      const card = e.target.closest('.spec-card');
      card.clickCount = (card.clickCount || 0) + 1;

      if (card.clickCount === 3) {
        card.classList.add('secret-clicked');
        const specName = card.querySelector('.spec-name').textContent;
        const specClass = card.querySelector('.spec-class').textContent;

        const roasts = [
          `${specName} ${specClass} mains need therapy! 🤡`,
          `Ah yes, ${specName} ${specClass}, the spec for people who hate fun! 😴`,
          `${specName} ${specClass} players think they're special... they're not! ❄️`,
          `Warning: ${specName} ${specClass} may cause sudden loss of friends! ⚠️`
        ];

        showToast(roasts[Math.floor(Math.random() * roasts.length)], 'warning');

        setTimeout(() => {
          card.classList.remove('secret-clicked');
        }, 2000);

        card.clickCount = 0;
      }

      // Reset click count after 2 seconds
      setTimeout(() => {
        card.clickCount = 0;
      }, 2000);
    }
  });
}

// Header double-click easter egg
function addHeaderEasterEgg() {
  const header = document.querySelector('.header h1');
  if (header) {
    header.addEventListener('dblclick', function () {
      showSecretMessage();
      console.log("%cYou found the header secret! 🎉", "color: #f4c430; font-size: 16px;");
    });
  }
}

// Show the secret retri message
function showSecretMessage() {
  const existingMessage = document.querySelector('.secret-retri-gay');
  if (existingMessage) return; // Don't spam it

  const secretDiv = document.createElement('div');
  secretDiv.className = 'secret-retri-gay';
  secretDiv.innerHTML = `
        <div>🏳️‍🌈 RETRI IS GAY 🏳️‍🌈</div>
        <div style="font-size: 0.8em; margin-top: 1rem;">
            And that's perfectly fabulous! ✨
        </div>
        <div style="font-size: 0.6em; margin-top: 1rem; opacity: 0.7;">
            (Click anywhere to close)
        </div>
    `;
  secretDiv.style.display = 'block';

  document.body.appendChild(secretDiv);

  // Close on click
  secretDiv.addEventListener('click', function () {
    document.body.removeChild(secretDiv);
  });

  // Auto-close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(secretDiv)) {
      document.body.removeChild(secretDiv);
    }
  }, 5000);
}

// Add some extra console fun for developers
console.log("%cWant to see more easter eggs? Try these commands:", "color: #667eea; font-weight: bold;");
console.log("%c- showSecretMessage()", "color: #48bb78;");
console.log("%c- activateKonamiMode()", "color: #48bb78;");
console.log("%c- getRandomRoast('YourName', 'dps')", "color: #48bb78;");

// Secret global functions for console users
window.showSecretMessage = showSecretMessage;
window.activateKonamiMode = activateKonamiMode; 