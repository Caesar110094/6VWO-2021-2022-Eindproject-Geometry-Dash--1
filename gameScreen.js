class GameScreen {
  constructor(titleScreen, playerData) {
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
    this.font = loadFont('Fonts/ARCADECLASSIC.TTF');
    this.levelMusic = null;
    this.stageClearMusic = null;
    this.osc = new p5.Oscillator(300);
    this.levelIndex = 0;
    this.titleScreen = titleScreen;
    this.goToMenu = false;
    this.playerData = playerData;
  }
  
  preload() {
    //this.levels.push(loadImage('Images/Level1.png'));
    //this.levels.push(new Level(loadImage('Images/Level2.png'), loadSound('Music/LevelMusic.mp3')));
    //this.levels.push(loadImage('Images/Level3.png'));
    //this.levels.push(loadImage('Images/LevelJumpPadExample2.png'));
    //this.levels.push(new Level(loadImage('Images/LevelJumpPadExample2.png'), loadSound('Music/LevelMusic.mp3')));
    //this.levels.push(new Level(loadImage('Images/LevelJumpOrbExample.png'), loadSound('Music/LevelMusic.mp3')));
    this.levels.push(new Level(loadImage('Images/Level1.png'), loadSound('Music/LevelMusic.mp3'), loadImage("Pictures/Layers/BackgroundTinted.png")));
    this.levels.push(new Level(loadImage('Images/Level2.png'), loadSound('Music/Level2_Music.mp3'), loadImage("Pictures/Layers/GreenBackground.png")));
    this.levels.push(new Level(loadImage('Images/Level3.png'), loadSound('Music/Level3_Music.mp3'), 
loadImage("Pictures/Layers/PurpleBackground.png")));
    this.levels.push(new Level(loadImage('Images/Level4.png'), loadSound('Music/Level4_Music.mp3'),loadImage("Pictures/Layers/RedBackground.png")));
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

    if (this.levelMusic != null) {
      this.levelMusic.stop();
    }
    
    this.levelIndex = this.titleScreen.levelIndex;
    this.spawnLevel(this.levels[this.levelIndex], 500, 380);
    this.player.setup();

    this.levelMusic.setVolume(0.3);
    this.levelMusic.play();
    
    // Neem aantal pogingen dat speler heeft begaan.
    if (this.getAttemptsCount() == null) {
      this.setAttemptsCount(0);
    }
    
    // Neem aantal deaths dat speler heeft begaan
    if (this.playerData.deathCount == null) {
      this.playerData.deathCount = 0;
    }

    // create Button
    this.MenuButton = createButton('Menu');
    this.MenuButton.size(75,25)
    this.MenuButton.style('background-color', color(200, 200, 300, 0));
    this.MenuButton.style("font-size", "16px");
    this.MenuButton.style("font-family", "ArcadeClassic");
    this.MenuButton.style("color", "white");
    this.MenuButton.style("border", "black");
    this.MenuButton.position(460,12);
    this.MenuButton.mousePressed(() => {
      this.goToMenu = true;
      this.MenuButton.remove();
      this.levelMusic.stop();
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
    text('Attempt ' + this.getAttemptsCount(), 16, 22);
    text('FPS ' + round(frameRate()), 536, 22);
    text('Deaths ' + this.playerData.deathCount, 150, 22);

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
    this.setAttemptsCount(1);
    if (!this.playerData.levelsFinished.includes(this.levelIndex)) {
      this.playerData.levelsFinished.push(this.levelIndex);
    }
    
    storeItem('Player', this.playerData);

    this.melodyTool.print();

    this.MenuButton.remove();
  }
  
  onDeath() {
    this.levelMusic.stop();
    this.playDeathSound();

    // Opslaan van aantal doden.
    this.playerData.deathCount = this.playerData.deathCount + 1;

    // Opslaan van aantal pogingen.
    this.setAttemptsCount(this.getAttemptsCount() + 1);
    
    storeItem('Player', this.playerData);

    this.MenuButton.remove();
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

    this.levelMusic = level.music;

    this.background.loadLevel(level);
  }

  playDeathSound() {
    this.osc.start();
    this.osc.amp(0.5);
    this.osc.freq(900);
    this.osc.freq(20, 0.2);
  }

  getAttemptsCount() {
    return this.playerData.levelsAttempts[this.levelIndex];
  }

  setAttemptsCount(newValue) {
    this.playerData.levelsAttempts[this.levelIndex] = newValue;
  }
}