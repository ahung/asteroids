(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, 15,  "brown" );
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var pos = [Math.random() * dimX, Math.random() * dimY];
    var vel = [Math.random() * 6 - 3, Math.random() * 6 - 3];
    return new Asteroid(pos, vel);
  }
  
})(this);