function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundCounter: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterHealthbarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerHealthbarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    useSpecialAttack() {
      return this.roundCounter % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player win
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.roundCounter = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.roundCounter++;
      const reducedHealth = randomValue(5, 12);
      this.monsterHealth -= reducedHealth;
      this.addLogMessage("player", "attack", reducedHealth);
      this.attackPlayer();
    },
    attackPlayer() {
      const reducedHealth = randomValue(8, 15);
      this.playerHealth -= reducedHealth;
      this.addLogMessage("monster", "attack", reducedHealth);
    },
    specialAttackMonster() {
      this.roundCounter++;
      const reducedHealth = randomValue(10, 20);
      this.monsterHealth -= reducedHealth;
      this.addLogMessage("player", "attack", reducedHealth);
      this.attackPlayer();
    },
    healPlayer() {
      this.roundCounter++;
      const healedValue = randomValue(10, 18);
      if (this.playerHealth + healedValue > 100) {
        playerHealth = 100;
      } else {
        this.playerHealth += healedValue;
      }
      this.addLogMessage("player", "heal", healedValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
