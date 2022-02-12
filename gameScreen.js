class GameScreen {
  constructor() {
    this.player = new Player(100, 200);
    this.spikes = [];
    this.blocks = [];
  }
  
  setup() {
    this.spikes = [];
    this.blocks = [];
  }
  
  draw() {
    // Spawner
    if (frameCount % 100 == 0) {
      this.spikes.push(new Spike(500, 350));
    }
    if (frameCount % 100 == 50) {
      this.blocks.push(new Block(500, 350));
    }
    if (frameCount % 100 == 70) {
      this.blocks.push(new Block(500, 270));
    }

    // Draw dingen. Beweegt de wereld naar links.
    this.spikes.forEach(spike =>
    {
      spike.draw();
    });
    this.blocks.forEach(block =>
    {
      block.draw();
    });

    // Check blok-speler horizontale collision.
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].checkCollision(this.player)) {
        return 1;
      }
    }

    this.player.drawPlayer('red');

    // Check block-speler verticale collision.
    this.player.ground = this.player.trueGround;
    this.blocks.forEach(block =>
    {
      if (block.checkCollision(this.player)) {
        this.player.ground = block.y;
      }
    });

    // Check spike-speler collision.
    for (let i = 0; i < this.spikes.length; i++) {
      if (this.spikes[i].checkCollision(this.player)) {
        return 1;
      }
    }

    this.player.checkGround();
  
    return 0;
  }

  keyPressed() {
    this.player.onKeyPressed();

    return 0;
  }
}