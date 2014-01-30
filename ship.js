(function (root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, [600, 400], [0,0], 15, "blue")
  };

  Ship.inherits(Asteroids.MovingObject);
  
  Ship.img = new Image();
  Ship.img.src = 'ship.png';

  Ship.prototype.power = function(impulse){
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function(game){
    var that = this;
    var speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    var bulletVel = [this.vel[0] / speed * 6, this.vel[1] / speed * 6];
    new Asteroids.Bullet(that.pos.slice(), bulletVel, game);
  };
  
  Ship.prototype.draw = function (ctx) {
    ctx.drawImage(Ship.img, this.pos[0] - 15, this.pos[1] - 15);
  }

})(this);