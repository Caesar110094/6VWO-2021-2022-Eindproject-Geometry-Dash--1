class TitleScreen {
  constructor() {
    this.bg;
    this.y = 0;
    this.button;
  }
  
  
  draw() {
    //text("Druk op [SPACE] verder gaan om te beginnen", 50, 50);

    return 3;
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
    //this.button.mousePressed(changeBG);
    this.button = createButton('Level 2');
    this.button.size(200, 50);
    this.button.style('background-color', col);
    this.button.style("font-size", "40px");
    this.button.position(300, 70);
    //this.button.mousePressed(changeBG);
    this.button = createButton('Level 3');
    this.button.size(200, 50);
    this.button.style('background-color', col);
    this.button.style("font-size", "40px");
    this.button.position(30, 170);
    //this.button.mousePressed(changeBG);
    this.button = createButton('Level 4');
    this.button.size(200, 50);
    this.button.style('background-color', col);
    this.button.style("font-size", "40px");
    this.button.position(300, 170);
    //this.button.mousePressed(changeBG);
    this.bg = loadImage('Background.png');
    
    let input = createButton('Geometry Dash');
    input.style('font-size', '24px', 'color', '#ffffff');
    input.position (20, 10);

    return 3;
  }

  changeBG() {
    
  }
}