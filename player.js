class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
    this.vy = 0;
    this.vx = -5;
    this.gravity = 0.4;
    this.trueGround = 380;
    this.ground = this.trueGround;
    this.worldX = 0;
    this.startX = x;
    this.startY = y;

    this.canJumpOnJumpOrb = false;
    this.hasJumpedOnJumpOrb = false;
    
    this.forewardAnimation = [];
    this.forewardAnimationFrameLength = 5;

    this.jumpAnimation = [];
    this.jumpAnimationFrameLength = 12;

    this.currentAnimationType = -1;
    this.currentAnimation = null;
    this.currentAnimationFrameLength = 0;
    this.currentImage = null;
    this.currentIndex = 0;
    this.currentTimer = 0;

    this.keyWasDown = false;

    this.osc = new p5.Oscillator(300);
  }

  // 0 = Foreward
  // 1 = Jump
  playAnimation(animationType) {
    this.currentIndex = 0;
    if (animationType == 0) {
      this.currentAnimation = this.forewardAnimation;
      this.currentAnimationFrameLength = this.forewardAnimationFrameLength;
    }
    else if (animationType == 1) {
      this.currentAnimation = this.jumpAnimation;
      this.currentAnimationFrameLength = this.jumpAnimationFrameLength;
    }
    this.currentImage = this.currentAnimation[this.currentIndex];
    this.currentAnimationType = animationType;
  }
  
  preload() {
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 1.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 2.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 3&7.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 4.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 5.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 6.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 3&7.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 8.png'));
    
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 1.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 2.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 3.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 4.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 5.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 6.png'));

    this.playAnimation(0);
  }

  setup() {
    this.vy = 0;
    this.worldX = 0;
    this.x = this.startX;
    this.y = this.startY;
  }
  
  drawPlayer(color, camera) {
    image(this.currentImage, this.x - camera.x, this.y - camera.y, this.w, this.h);

    if (this.currentTimer <= 0) {
      this.currentTimer = this.currentAnimationFrameLength;
      this.currentIndex += 1;
      if (this.currentIndex >= this.currentAnimation.length) {
        this.currentIndex = 0;
      }
      this.currentImage = this.currentAnimation[this.currentIndex];
    }
    this.currentTimer -= 1;
    
    this.vy += this.gravity;
    this.y += this.vy;

    this.worldX -= this.vx;

    if (!this.canJumpOnJumpOrb) {
      this.hasJumpedOnJumpOrb = false;
    }
  }

  checkGround() {
    if (this.y + this.h > this.ground && this.vy > 0) {
      this.vy = 0;
      this.y = this.ground - this.h;
      
      if (this.currentAnimationType == 1) {
        this.playAnimation(0);
      }
    }
  }

  input() {
    if (keyIsDown(32) && !this.keyWasDown) {
      if (this.y + this.h >= this.ground) {
        this.jump();
      }
      else if (this.canJumpOnJumpOrb && !this.hasJumpedOnJumpOrb) {
        this.jump();
        this.hasJumpedOnJumpOrb = true;
      }

      this.keyWasDown = true;
    }
    else if (!keyIsDown(32)) {
      this.keyWasDown = false;
    }
  }

  playJumpSound() {
    this.osc.start();
    this.osc.amp(0.3);
    this.osc.freq(100);
    this.osc.freq(200, 0.01);
    this.osc.amp(0, 0.2, 0.1);
  }

  jump() {
    this.vy = -10;
    this.playAnimation(1);
    this.playJumpSound();
  }
}