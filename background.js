class Background {
  constructor() {
    this.backgroundImage = null;
    this.foregroundImage = null;
    this.vx = -5;
    this.x = 0;
    this.w = 400 * (673/248);
    this.backgroundHeight = 400;
    this.foregroundHeight = this.w * (73/673);
    this.defaultBackgroundImage = null
  }

  preload() {
    this.backgroundImage = this.defaultBackgroundImage =  loadImage('Pictures/Layers/BackgroundTinted.png');
    this.foregroundImage = loadImage('Pictures/Layers/ForegroundFloor.png');
    //this.backgroundWinImage = loadImage('Pictures/Layers/WinBackground.png');
  }

  loadLevel(level) {
    if (level.background == null) {
      this.backgroundImage = this.defaultBackgroundImage;
    }
    else {
      this.backgroundImage = level.background;
    }
  }
  
  draw(camera) {
    image(this.backgroundImage, this.x, -camera.y, this.w, this.backgroundHeight);
    image(this.backgroundImage, this.x + this.w, -camera.y, this.w, this.backgroundHeight);

    image(this.backgroundImage, this.x, - this.backgroundHeight - camera.y, this.w, this.backgroundHeight);
    image(this.backgroundImage, this.x + this.w, - this.backgroundHeight - camera.y, this.w, this.backgroundHeight);

    image(this.foregroundImage, this.x, height - 21 - camera.y, this.w, this.foregroundHeight);
    image(this.foregroundImage, this.x + this.w, height - 21 - camera.y, this.w, this.foregroundHeight);
    
    this.x += this.vx;
    if (this.x <= -this.w) {
      this.x += this.w;
    }
  }
}