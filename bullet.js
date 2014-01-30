(function (root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    game.bullets.push(this);
    Asteroids.MovingObject.call(this, pos, vel, 3, "red");
  }

  Bullet.inherits(Asteroids.MovingObject);

})(this);