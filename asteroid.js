(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, 20,  "brown" );
  };

  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.img = new Image();
  Asteroid.img.src = 'asteroid.png';

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var pos = [Math.random() * dimX, Math.random() * dimY];
    var vel = [Math.random() * 6 - 3, Math.random() * 6 - 3];
    return new Asteroid(pos, vel);
  }
  
  Asteroid.prototype.draw = function (ctx) {
    ctx.drawImage(Asteroid.img, this.pos[0] - 20, this.pos[1] - 20);
  }
  
})(this);