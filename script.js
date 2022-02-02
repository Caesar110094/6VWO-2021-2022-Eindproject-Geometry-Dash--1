var player;
var spikes = [];

function setup() {
  createCanvas(500, 400);

  player = new Player(100, 200);
}

function draw() {
  background(225);

  if (frameCount % 100 == 0) {
    spikes.push(new Spike(500, 350));
  }

  spikes.forEach(spike =>
  {
    spike.draw();
  });

  var isColliding = false;
  for (let i = 0; i < spikes.length; i++) {
    if (spikes[i].checkCollision(player)) {
      isColliding = true;
      break;
    }
  }

  if (isColliding) {
    player.drawPlayer("red");
  }
  else {
    player.drawPlayer("green");
  }
}

function keyPressed() {
  if (keyCode == 32 && player.y >= 380) {
    player.vy -= 5;
  }
}