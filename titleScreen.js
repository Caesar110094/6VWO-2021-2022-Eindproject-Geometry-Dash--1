class TitleScreen {
  constructor() {
    this.bg;
    this.y = 0;
    this.saltyButton;
    this.storiesButton;
    this.XFunkButton;
    this.timesButton;
    this.backgroundImage;
    this.levelIndex = 0;
    this.playGame = false;
    this.font = loadFont('Fonts/ARCADECLASSIC.TTF');
    
    this.playerAnimation = [];
    this.playerAnimationFrameLength = 5;
    this.playerAnimationIndex = 0;
    this.playerAnimationFrameTimer = 0;
  }
  
  preload() {
    this.backgroundImage = loadImage("Pictures/Layers/Background.png");

    this.playerAnimation.push(loadImage('Pictures/Player/Still/Still 1&5.png'));
    this.playerAnimation.push(loadImage('Pictures/Player/Still/Still 2&4.png'));
    this.playerAnimation.push(loadImage('Pictures/Player/Still/Still 3.png'));
    this.playerAnimation.push(loadImage('Pictures/Player/Still/Still 2&4.png'));
    this.playerAnimation.push(loadImage('Pictures/Player/Still/Still 1&5.png'));
    this.playerAnimation.push(loadImage('Pictures/Player/Still/Still 6.png'));
    this.playerAnimation.push(loadImage('Pictures/Player/Still/Still 7.png'));
    this.playerAnimation.push(loadImage('Pictures/Player/Still/Still 8.png'));
    
    return 3;
  }
  
  draw() {
    image(this.backgroundImage, 0, 0, (673/248) * height, height);
    fill('black');
    rect(0, 0, width, 40);
    
    this.playerAnimationFrameTimer -= 1;
    if (this.playerAnimationFrameTimer <= 0) {
      this.playerAnimationFrameTimer = this.playerAnimationFrameLength;
      
      this.playerAnimationIndex++;
      if (this.playerAnimationIndex >= this.playerAnimation.length) {
        this.playerAnimationIndex = 0;
      }
    }

    image(this.playerAnimation[this.playerAnimationIndex], 400, 200, 100, 100);
    
    if (this.playGame == false) {
      return 3;
    }
    else {
      this.timesButton.remove();
      this.saltyButton.remove();
      this.storiesButton.remove();
      this.XFunkButton.remove();
      this.GeoButton.remove();
      
      this.playGame = false;
      return 0;
    }
  }

  keyPressed() {
    return 3;
  }

  setup() {
    let col = 'black';
    let textColor = color(255, 255, 255);
    
    this.saltyButton = createButton('Salty');
    this.saltyButton.size(200, 30);
    this.saltyButton.style('background-color', col);
    this.saltyButton.style("font-size", "30px");
    this.saltyButton.style("border", "none");
    this.saltyButton.style("color", textColor);
    this.saltyButton.style("font-family", "ArcadeClassic");
    this.saltyButton.position(30, 70);
    this.saltyButton.mousePressed(() => this.setLevel(0));
    
    this.storiesButton = createButton('Stories');
    this.storiesButton.size(200, 30);
    this.storiesButton.style('background-color', col);
    this.storiesButton.style("font-size", "30px");
    this.storiesButton.style("border", "none");
    this.storiesButton.style("color", textColor);
    this.storiesButton.style("font-family", "ArcadeClassic");
    this.storiesButton.position(30, 110);
    this.storiesButton.mousePressed(() => this.setLevel(1));
    
    this.XFunkButton = createButton('XFunk');
    this.XFunkButton.size(200, 30);
    this.XFunkButton.style('background-color', col);
    this.XFunkButton.style("font-size", "30px");
    this.XFunkButton.style("border", "none");
    this.XFunkButton.style("color", textColor);
    this.XFunkButton.style("font-family", "ArcadeClassic");
    this.XFunkButton.position(30, 150);
    this.XFunkButton.mousePressed(() => this.setLevel(2));
    
    this.timesButton = createButton('Times');
    this.timesButton.size(200, 30);
    this.timesButton.style('background-color', col);
    this.timesButton.style("font-size", "30px");
    this.timesButton.style("border", "none");
    this.timesButton.style("color", textColor);
    this.timesButton.style("font-family", "ArcadeClassic");
    this.timesButton.position(30, 190);
    this.timesButton.mousePressed(() => this.setLevel(3));

    this.GeoButton = createButton ('Slime Dash')
    this.GeoButton.size(300,50)
    this.GeoButton.style('background-color', color(200, 200, 300, 0));
    this.GeoButton.style('border', 'none');
    this.GeoButton.style('color', 'white');
    this.GeoButton.style("font-size", "40px");
    this.GeoButton.style("font-family", "ArcadeClassic");
    this.GeoButton.position(-30,5);

    return 3;
  }

  setLevel(levelIndex) {
    this.levelIndex = levelIndex;
    this.playGame = true;
  }
}