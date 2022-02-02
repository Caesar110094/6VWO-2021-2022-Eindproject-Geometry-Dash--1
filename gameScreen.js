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
    if (frameCount % 100 == 0) {
      this.spikes.push(new Spike(500, 350));
    }
    
    if (frameCount % 100 == 50) {
      this.blocks.push(new Block(500, 350));
    }

    // Draw dingen.
    this.spikes.forEach(spike =>
    {
      spike.draw();
    });
    this.blocks.forEach(block =>
    {
      block.draw();
    });

    var isColliding = false;
    for (let i = 0; i < this.spikes.length; i++) {
      if (this.spikes[i].checkCollision(this.player)) {
        isColliding = true;
        break;
      }
    }

    // blokken die onder de speler zitten.
    var stepBlocks = [];
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.player.x + this.player.w >= this.blocks[i].x
      && this.player.x + this.player.w <= this.blocks[i].x + this.blocks[i].w) || (this.player.x >= this.blocks[i].x && this.player.x <= this.blocks[i].x + this.blocks[i].w)) {
        stepBlocks.push(this.blocks[i]);
      }
    }

    if (stepBlocks.length > 0) {
      var lowestY = 380;
      for (let i = 1; i < stepBlocks.length; i++) {
        if (stepBlocks[i].y < lowestY) {
          lowestY = stepBlocks[i].y;
        }
      }

      console.log(lowestY);

      this.player.ground = lowestY;
    }
    else {
      this.player.ground = 380;
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