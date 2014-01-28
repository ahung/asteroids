(function (root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx){
    this.ctx = ctx;
    this.asteroids = [];
    this.addAsteroids(5);
    this.ship = new Asteroids.Ship;
    this.bullets = [];
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;

  Game.prototype.addAsteroids = function(numAsteroids){
    for(var i = 0; i < numAsteroids; i++){
      this.asteroids.push(Asteroids.Asteroid
        .randomAsteroid(Game.DIM_X, Game.DIM_Y));
    };
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var that = this;
    for (var i = 0; i < that.asteroids.length; i++) {
      that.asteroids[i].draw(that.ctx);
    }
    for (var i = 0; i < that.bullets.length; i++) {
      that.bullets[i].draw(that.ctx);
    }
    this.ship.draw(this.ctx);
  };

  Game.prototype.move = function() {
    var that = this;
    for (var i = 0; i < that.asteroids.length; i++) {
      that.asteroids[i].move();
    }
    for (var i = 0; i < that.bullets.length; i++) {
      that.bullets[i].move();
    }
    this.ship.move();
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.start = function() {
    var that = this
    Game.intervalID = window.setInterval(function() {
      that.bindKeyHandlers();
      that.step();
    }, 30);
  };

  Game.prototype.stop = function() {
    window.clearInterval(Game.intervalID);
  }

  Game.prototype.checkCollisions = function() {
    var that = this;
    for (var i = 0; i < that.bullets.length; i++) {
     that.bullets[i].hitAsteroids();
    }
    for (var i = 0; i < that.asteroids.length; i++) {
      if (that.asteroids[i].isCollidedWith(that.ship)){
        alert("Game over!");
        that.stop();
      }
    }
  }

  Game.prototype.bindKeyHandlers = function () {
    var that = this;
    key('w', function () {
      that.ship.power([0, -0.01])
    });
    key('a', function () {
      that.ship.power([ -0.01 , 0])
    });
    key('s', function () {
      that.ship.power([0, 0.01])
    });
    key('d', function () {
      that.ship.power([0.01, 0])
    });
    key('f', function() {
      that.fireBullet();
    });
  }

  Game.prototype.fireBullet = function(){
    var bullet = this.ship.fireBullet();
    var that = this;
    if (bullet){
      that.bullets.push(bullet)
    }
  };

  Game.prototype.removeAsteroid = function(asteroidIdx) {
    delete this.asteroids[asteroidIdx];
  };

  Game.prototype.removeBullet = function(bullet) {
    delete this.bullets[this.bullets.indexOf(bullet)]
  };

})(this);