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
  }
  
  preload() {
    this.backgroundImage = loadImage("Pictures/Layers/Background.png");
    
    return 3;
  }
  
  draw() {
    image(this.backgroundImage, 0, 0, (673/248) * height, height);
    fill('black');
    rect(0, 0, width, 30);

    if (this.playGame == false) {
      return 3;
    }
    else {
      this.timesButton.remove();
      this.saltyButton.remove();
      this.storiesButton.remove();
      this.XFunkButton.remove();
      this.GeoButton.remove();
      console.log('Hello');
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
    this.saltyButton.size(200, 50);
    this.saltyButton.style('background-color', col);
    this.saltyButton.style("font-size", "20");
    this.saltyButton.style("border", "none");
    this.saltyButton.style("color", textColor);
    this.saltyButton.position(30, 70);
    this.saltyButton.mousePressed(() => this.setLevel(0));
    
    this.storiesButton = createButton('Stories');
    this.storiesButton.size(200, 50);
    this.storiesButton.style('background-color', col);
    this.storiesButton.style("font-size", "20");
    this.storiesButton.style("border", "none");
    this.storiesButton.style("color", textColor);
    this.storiesButton.position(300, 70);
    this.storiesButton.mousePressed(() => this.setLevel(1));
    
    this.XFunkButton = createButton('XFunk');
    this.XFunkButton.size(200, 50);
    this.XFunkButton.style('background-color', col);
    this.XFunkButton.style("font-size", "20");
    this.XFunkButton.style("border", "none");
    this.XFunkButton.style("color", textColor);
    this.XFunkButton.position(30, 170);
    this.XFunkButton.mousePressed(() => this.setLevel(2));
    
    this.timesButton = createButton('Times');
    this.timesButton.size(200, 50);
    this.timesButton.style('background-color', col);
    this.timesButton.style("font-size", "20");
    this.timesButton.style("border", "none");
    this.timesButton.style("color", textColor);
    this.timesButton.position(300, 170);
    this.timesButton.mousePressed(() => this.setLevel(3));

    this.GeoButton = createButton ('Slime Dash')
    this.GeoButton.size(100,50)
    this.GeoButton.style('background-color', color(200, 200, 300, 0));
    this.GeoButton.style('border', 'none');
    this.GeoButton.style('color', 'white');
    this.GeoButton.style("font-size", "20");
    this.GeoButton.position(0,0);

    return 3;
  }

  setLevel(levelIndex) {
    this.levelIndex = levelIndex;
    this.playGame = true;
  }
}