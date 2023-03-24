function randomValue(min, max) {
    return Math.round((Math.random() * (max - min + 1)) + min);
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            battleLogs: []
        }
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%' }
        },
        allowSpecialAttack() {
            if (this.currentRound % 3 !== 0 || this.currentRound === 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {
        monsterHealth(value) {
            if (value === 0 && this.playerHealth === 0) {
                this.winner = "draw";
            } else if (value === 0) {
                this.winner = "player";
            }
        },
        playerHealth(value) {
            if (value === 0 && this.monsterHealth === 0) {
                this.winner = "draw";
            } else if (value === 0) {
                this.winner = "monster";
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            let attackValue = randomValue(8, 12);
            if (this.monsterHealth - attackValue < 0) {
                this.monsterHealth = 0;
            } else {
                this.monsterHealth -= attackValue;
            }
            this.addBattleLog("player", "attack", attackValue);
            this.attackPlayer();

        },
        attackPlayer() {
            let attackValue = randomValue(8, 14);
            if (this.playerHealth - attackValue < 0) {
                this.playerHealth = 0;
            } else {
                this.playerHealth -= attackValue;
            }
            this.addBattleLog("monster", "attack", attackValue);
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = randomValue(15, 20);
            if (this.monsterHealth - attackValue < 0) {
                this.monsterHealth = 0;
            } else {
                this.monsterHealth -= attackValue;
            }
            this.addBattleLog("player", "special-attack", attackValue);
            this.attackPlayer();

        },
        healPlayer() {
            this.currentRound++;
            let healValue = randomValue(18, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addBattleLog("player", "heal", healValue);
            this.attackPlayer();
        },
        resetGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.battleLogs = []
        },
        surrendered() {
            this.winner = "monster"
        },
        addBattleLog(who, what, value) {
            this.battleLogs.push({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }

});

app.mount('#game');