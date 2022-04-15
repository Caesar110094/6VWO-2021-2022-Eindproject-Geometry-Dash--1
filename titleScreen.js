class TitleScreen {
  constructor() {
    this.bg;
    this.y = 0;
    this.button;
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

    if (this.playGame == false) {
      return 3;
    }
    else {
      return 0;
    }
  }

  keyPressed() {
    return 3;
  }

  setup() {
    this.button = createButton('Level 1');
    this.button.size(200, 50);
    let col = color(200, 200, 300);
    this.button.style('background-color', col);
    this.button.style("font-size", "40px");
    this.button.position(30, 70);
    this.button.mousePressed(() => this.setLevel(0));
    
    this.button = createButton('Level 2');
    this.button.size(200, 50);
    this.button.style('background-color', col);
    this.button.style("font-size", "40px");
    this.button.position(300, 70);
    this.button.mousePressed(() => this.setLevel(1));
    
    this.button = createButton('Level 3');
    this.button.size(200, 50);
    this.button.style('background-color', col);
    this.button.style("font-size", "40px");
    this.button.position(30, 170);
    this.button.mousePressed(() => this.setLevel(2));
    
    this.button = createButton('Level 4');
    this.button.size(200, 50);
    this.button.style('background-color', col);
    this.button.style("font-size", "40px");
    this.button.position(300, 170);
    this.button.mousePressed(() => this.setLevel(3));
    
    let input = createButton('Geometry Dash');
    input.style('font-size', '24px', 'color', '#ffffff');
    input.position (20, 10);

    return 3;
  }

  setLevel(levelIndex) {
    console.log(101);
    this.levelIndex = levelIndex;
    this.playGame = true;
  }
}