var player;
var spikes = [];

function setup() {
  createCanvas(500, 400);

  player = new Player(100, 200);

}


function draw() {
  background(225);

  player.drawPlayer();

  if (frameCount % 100 == 0) {
    spikes.push(new Spike(500, 350));
  }

  spikes.forEach(spike =>
  {
    spike.draw();
  });
}

function keyPressed() {
  if (keyCode == 32 && player.y >= 380) {
    player.vy -= 5;
  }
}