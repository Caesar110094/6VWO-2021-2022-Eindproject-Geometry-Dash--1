class GameScreen {
  constructor() {
    this.player = new Player(100, 200);
    this.spikes = [];
  }
  
  setup() {
    this.spikes = [];
  }
  
  draw() {
    if (frameCount % 100 == 0) {
      this.spikes.push(new Spike(500, 350));
    }

    this.spikes.forEach(spike =>
    {
      spike.draw();
    });

    var isColliding = false;
    for (let i = 0; i < this.spikes.length; i++) {
      if (this.spikes[i].checkCollision(this.player)) {
        isColliding = true;
        break;
      }
    }

    if (isColliding) {
      this.player.drawPlayer("red");
      return 1;
    }
    else {
      this.player.drawPlayer("green");
      return 0;
    }
  }

  keyPressed() {
    this.player.onKeyPressed();

    return 0;
  }
}