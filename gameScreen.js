class GameScreen {
  constructor() {
    this.player = new Player(100, 200);
    this.spikes = [];
    this.blocks = [];
    this.levels = [];
  }
  
  preload() {
    this.levels.push(loadImage('Images/Level0.png'));
  }

  setup() {
    this.spikes = [];
    this.blocks = [];

    this.spawnLevel(this.levels[0], 500, 380);
  }
  
  draw() {
    // Spawner
    // if (frameCount % 100 == 0) {
    //   this.spikes.push(new Spike(500, 350));
    // }
    // if (frameCount % 100 == 50) {
    //   this.blocks.push(new Block(500, 350));
    // }
    // if (frameCount % 100 == 70) {
    //   this.blocks.push(new Block(500, 270));
    // }

    // Draw dingen. Beweegt de wereld naar links.
    for (let i = 0; i < this.spikes.length; i++) {
      this.spikes[i].draw();
    }
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].draw();
    }

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
        if (this.player.y > block.y) {
          return 1;
        }
        else {
          this.player.ground = block.y;
        }
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

  spawnLevel(level, offsetX, offsetY) {
    level.loadPixels();
    
    let r = -1;
    let g = -1;
    let b = -1;
    let a = -1;
    let x = -1;
    let y = -1;

    for (let i = 0; i < level.pixels.length; i += 4) {
      r = level.pixels[i];
      g = level.pixels[i + 1];
      b = level.pixels[i + 2];
      a = level.pixels[i + 3];
      x = (i/4) % level.width;
      y = level.height - floor(i/4 / level.width);

      if (a == 255) {
        if (r == 255 && g == 0 && b == 0) {
          this.spikes.push(new Spike(offsetX + x * 50, offsetY - y * 50));
        }
        else if (r == 0 && g == 0 && b == 0) {
          this.blocks.push(new Block(offsetX + x * 50, offsetY - y * 50));
        }
      }

      console.log('Color: ' + level.pixels[i] + ',' + level.pixels[i + 1] + ',' + level.pixels[i + 2] + ',' + level.pixels[i + 3] + ' | Position: ' + x + ',' + y);
    }
  }
}