var player;

function setup() {
  createCanvas(500, 400);

  player = new Player(100, 200);

}


function draw() {
  background(225);



  player.drawPlayer();

}

function keyPressed() {
  if (keyCode == 32) {
    player.vy -= 5;
  }
}