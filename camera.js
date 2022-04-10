class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  draw(player) {
    if (player.y < player.trueGround - 200) {
      this.y = player.y - (player.trueGround - 200);
    }
    else if (player.y > player.trueGround) {
      this.y = player.y - player.trueGround;
    }
    else {
      this.y = 0;
    }
  }
}