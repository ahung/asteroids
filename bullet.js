(function (root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, 5, "red")
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function(asteroids) {
    var that = this;
    for (var i = 0; i < asteroids.length; i++) {
      if (asteroids[i].isCollidedWith(that)) {
        Asteroids.Game.removeAsteroid(i);
        Asteroids.Game.removeBullet(that);
      }
    }
  };

})(this);