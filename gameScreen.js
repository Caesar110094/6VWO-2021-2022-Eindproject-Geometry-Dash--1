class GameScreen {
  constructor(titleScreen) {
    this.player = new Player(100, 200);
    this.camera = new Camera();
    this.melodyTool = new MelodyTool();
    this.spikes = [];
    this.blocks = [];
    this.jumpPads = [];
    this.jumpOrbs = [];
    this.levels = [];
    this.background = new Background();
    this.endX = -1;
    this.attempts = 1;
    this.deathCount = 0;
    this.font = loadFont('Fonts/ARCADECLASSIC.TTF');
    this.levelMusic = null;
    this.stageClearMusic = null;
    this.osc = new p5.Oscillator(300);
    this.levelIndex = 0;
    this.titleScreen = titleScreen;
    this.goToMenu = false;
  }
  
  preload() {
    //this.levels.push(loadImage('Images/Level1.png'));
    //this.levels.push(new Level(loadImage('Images/Level2.png'), loadSound('Music/LevelMusic.mp3')));
    //this.levels.push(loadImage('Images/Level3.png'));
    //this.levels.push(loadImage('Images/LevelJumpPadExample2.png'));
    //this.levels.push(new Level(loadImage('Images/LevelJumpPadExample2.png'), loadSound('Music/LevelMusic.mp3')));
    //this.levels.push(new Level(loadImage('Images/LevelJumpOrbExample.png'), loadSound('Music/LevelMusic.mp3')));
    this.levels.push(new Level(loadImage('Images/Level1.png'), loadSound('Music/LevelMusic.mp3'), loadImage("Pictures/Layers/BackgroundTinted.png")));
    this.levels.push(new Level(loadImage('Images/Level2.png'), loadSound('Music/LevelMusic.mp3'), loadImage("Pictures/Layers/BackgroundTinted.png")));
    this.levels.push(new Level(loadImage('Images/Level3.png'), loadSound('Music/LevelMusic.mp3'), loadImage("Pictures/Layers/BackgroundTinted.png")));
    this.levels.push(new Level(loadImage('Images/Level5.png'), loadSound('Music/Level5_Music.mp3'), loadImage("Pictures/Layers/Level5_Background.png")));
    
    this.foregroundFloor = loadImage('Pictures/Layers/ForegroundFloor.png');
    this.stageClearMusic = loadSound('Music/StageClear.mp3');
    this.player.preload();
    this.background.preload();
  }
  
  setup() {
    this.spikes = [];
    this.blocks = [];
    this.jumpPads = [];
    this.jumpOrbs = [];

    this.goToMenu = false;
    
    this.levelIndex = this.titleScreen.levelIndex;
    this.spawnLevel(this.levels[this.levelIndex], 500, 380);
    this.player.setup();

    this.levelMusic.setVolume(0.3);
    this.levelMusic.play();
    
    // Neem aantal pogingen dat speler heeft begaan.
    this.attempts = getItem("Attempts");
    if (this.attempts == null) {
      this.attempts = 1;
    }
    
    // Neem aantal deaths dat speler heeft begaan
    this.deathCount = getItem("Deaths");
    if (this.deathCount == null) {
      this.deathCount = 0;
    }
  }

  start() {
    // create Button
    this.MenuButton = createButton ('Menu')
    this.MenuButton.size(100,50)
    this.MenuButton.style('background-color', color(200, 200, 300));
    this.MenuButton.style("font-size", "18px");
    this.MenuButton.position(470,10);
    this.MenuButton.mousePressed(() => {
      this.goToMenu = true;
      this.MenuButton.remove();
    });
  }
  
  draw() {
    this.player.input();
    
    //image(this.foregroundFloor, 0, 300);
    
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
    // if (frameCount % 100 == 70) {
    //   this.jumpPads.push(new JumpPad(500, 270));
    // }

    // Update camera.
    this.camera.draw(this.player);

    // Draw achtergrond.
    this.background.draw(this.camera);
    
    // Draw dingen. Beweegt de wereld naar links.
    for (let i = 0; i < this.spikes.length; i++) {
      this.spikes[i].draw(this.camera);
    }
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].draw(this.camera);
    }
    for (let i = 0; i < this.jumpPads.length; i++) {
      this.jumpPads[i].draw(this.camera);
    }
    for (let i = 0; i < this.jumpOrbs.length; i++) {
      this.jumpOrbs[i].draw(this.camera);
    }

    // Check blok-speler horizontale collision.
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].checkCollision(this.player)) {
        this.onDeath();
        return 1;
      }
    }

    this.player.drawPlayer('red', this.camera);
    
    // Check block-speler verticale collision.
    this.player.ground = this.player.trueGround;
    let gameOver = false;
    this.blocks.forEach(block =>
    {
      if (block.checkCollision(this.player)) {
        if (this.player.y > block.y) {
          gameOver = true;
        }
        else {
          this.player.ground = block.y;
        }
      }
    });
    if (gameOver) {
      this.onDeath();
      return 1;
    }

    // Check spike-speler collision.
    for (let i = 0; i < this.spikes.length; i++) {
      if (this.spikes[i].checkCollision(this.player)) {
        this.onDeath();
        return 1;
      }
    }

    // Check jump pad en speler collision.
    for (let i = 0; i < this.jumpPads.length; i++) {
      if (this.jumpPads[i].checkCollision(this.player)) {
        this.player.vy = -15;
        this.player.y = this.jumpPads[i].y + this.jumpPads[i].h - this.jumpPads[i].collisionHeight - this.player.h;
        break;
      }
    }

    // Check jump orb en speler collision.
    this.player.canJumpOnJumpOrb = false;
    for (let i = 0; i < this.jumpOrbs.length; i++) {
      if (this.jumpOrbs[i].checkCollision(this.player)) {
        this.player.canJumpOnJumpOrb = true;
      }
    }

    this.player.checkGround();

    // Check win-scenario.
    if (this.player.worldX > this.endX) {
      this.onWin();
      return 2;
    }

    // UI
    textAlign(LEFT, BASELINE);
    fill('black');
    rect(0, 0, width, 30);
    fill('white');
    textSize(16);
    textFont(this.font);
    text('Attempt ' + this.attempts, 16, 22);
    text('FPS ' + round(frameRate()), 536, 22);
    text('Deaths ' + this.deathCount, 150, 22);

    if (this.goToMenu) {
      return 3;
    }
    
    this.melodyTool.update(this.player);
    
    return 0;
  }

  onWin() {
    this.levelMusic.stop();
    this.stageClearMusic.play();

    // Opslaan van aantal pogingen.
    this.attempts = 1;
    console.log(this.attempts);
    storeItem('Attempts', this.attempts);

    this.melodyTool.print();
  }
  
  onDeath() {
    this.levelMusic.stop();
    this.playDeathSound();

    // Opslaan van aantal doden.
    this.deathCount = this.deathCount + 1;
    console.log(this.deathCount);
    storeItem('Deaths', this.deathCount);

    // Opslaan van aantal pogingen.
    this.attempts = this.attempts + 1;
    console.log(this.attempts);
    storeItem('Attempts', this.attempts);
  }

  spawnLevel(level, offsetX, offsetY) {
    level.layout.loadPixels();
    
    let r = -1;
    let g = -1;
    let b = -1;
    let a = -1;
    let x = -1;
    let y = -1;

    for (let i = 0; i < level.layout.pixels.length; i += 4) {
      r = level.layout.pixels[i];
      g = level.layout.pixels[i + 1];
      b = level.layout.pixels[i + 2];
      a = level.layout.pixels[i + 3];
      x = (i/4) % level.layout.width;
      y = level.layout.height - floor(i/4 / level.layout.width);

      if (a == 255) {
        if (r == 255 && g == 0 && b == 0) {
          this.spikes.push(new Spike(offsetX + x * 50, offsetY - y * 50));
        }
        else if (r == 255 && g == 255 && b == 0) {
          this.jumpPads.push(new JumpPad(offsetX + x * 50, offsetY - y * 50));
        }
        else if (r == 0 && g == 0 && b == 0) {
          this.blocks.push(new Block(offsetX + x * 50, offsetY - y * 50));
        }
        else if (r == 0 && g == 0 && b == 255) {
          this.jumpOrbs.push(new JumpOrb(offsetX + x * 50, offsetY - y * 50));
        }
      }

      //console.log('Color: ' + level.pixels[i] + ',' + level.pixels[i + 1] + ',' + level.pixels[i + 2] + ',' + level.pixels[i + 3] + ' | Position: ' + x + ',' + y);
    }

    this.endX = offsetX + level.layout.width * 50 + 50;
    console.log(this.endX);

    this.levelMusic = level.music;

    this.background.loadLevel(level);
  }

  playDeathSound() {
    this.osc.start();
    this.osc.amp(0.5);
    this.osc.freq(900);
    this.osc.freq(20, 0.2);
  }
}