class PlayerData {
  constructor(levelsCount) {
    this.levelsFinished = [];
    this.levelsAttempts = [];
    this.deathCount;

    for (let i = 0; i < levelsCount; i++) {
      this.levelsAttempts.push(0);
    }
  }
}