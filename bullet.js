(function (root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, 3, "red")
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroid = function(asteroid) {
    if (this.isCollidedWith(asteroid)) {
      return true;
    }
  };

})(this);