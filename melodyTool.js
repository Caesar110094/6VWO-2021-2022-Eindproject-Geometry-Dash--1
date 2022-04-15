class MelodyTool {
  constructor() {
    this.beats = [];
    this.keyWasDown = false;
  }

  update(player) {
    if (keyIsDown(77) && !this.keyWasDown) {
      this.beats.push(round(player.x / 50));
      
      this.keyWasDown = true;
    }
    else if (!keyIsDown(77)) {
      this.keyWasDown = false;
    }
  }

  print() {
    for (let i = 0; i < this.beats.length; i++) {
      console.log(this.beats[i]);
    }
  }
}