let score = 0;
let cookiesPerClick = 1;
let autoClickers = 0;
const cookieButton = document.getElementById('cookieButton');
const scoreDisplay = document.getElementById('score');
const autoClickerButton = document.getElementById('autoClickerButton');
const upgradeButton = document.getElementById('upgradeButton');
const achievementsList = document.getElementById('achievementsList');

const achievements = [
    { name: 'First Click', condition: () => score >= 1, unlocked: false },
    { name: '100 Cookies', condition: () => score >= 100, unlocked: false },
    { name: 'First Auto-Clicker', condition: () => autoClickers >= 1, unlocked: false }
];

function updateAchievements() {
    achievements.forEach(achievement => {
        if (achievement.condition() && !achievement.unlocked) {
            achievement.unlocked = true;
            const listItem = document.createElement('li');
            listItem.textContent = achievement.name;
            achievementsList.appendChild(listItem);
        }
    });
}

function saveGame() {
    localStorage.setItem('score', score);
    localStorage.setItem('cookiesPerClick', cookiesPerClick);
    localStorage.setItem('autoClickers', autoClickers);
}

function loadGame() {
    score = parseInt(localStorage.getItem('score')) || 0;
    cookiesPerClick = parseInt(localStorage.getItem('cookiesPerClick')) || 1;
    autoClickers = parseInt(localStorage.getItem('autoClickers')) || 0;
    scoreDisplay.textContent = score;
}

cookieButton.addEventListener('click', () => {
    score += cookiesPerClick;
    scoreDisplay.textContent = score;
    updateAchievements();
    saveGame();
});

autoClickerButton.addEventListener('click', () => {
    const cost = Math.ceil(10 * Math.pow(1.1, autoClickers));
    if (score >= cost) {
        score -= cost;
        autoClickers++;
        scoreDisplay.textContent = score;
        setInterval(() => {
            score++;
            scoreDisplay.textContent = score;
            updateAchievements();
            saveGame();
        }, 1000);
        updateAchievements();
        saveGame();
    }
    autoClickerButton.textContent = `Buy Auto-Clicker (${Math.ceil(10 * Math.pow(1.1, autoClickers))} cookies)`;
});

upgradeButton.addEventListener('click', () => {
    const cost = Math.ceil(20 * Math.pow(1.2, cookiesPerClick - 1));
    if (score >= cost) {
        score -= cost;
        cookiesPerClick++;
        scoreDisplay.textContent = score;
        saveGame();
    }
    upgradeButton.textContent = `Upgrade Click (${Math.ceil(20 * Math.pow(1.2, cookiesPerClick - 1))} cookies)`;
});

window.onload = loadGame;
