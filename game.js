(function (root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx){
    this.ctx = ctx;
    this.asteroids = [];
    this.addAsteroids(15);
    this.ship = new Asteroids.Ship;
    this.bullets = [];
  };

  Game.DIM_X = 1200;
  Game.DIM_Y = 800;

  Game.prototype.addAsteroids = function(numAsteroids){
    for(var i = 0; i < numAsteroids; i++){
      this.asteroids.push(Asteroids.Asteroid
        .randomAsteroid(Game.DIM_X, Game.DIM_Y));
    };
  };

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
    key('space', function() {
      that.fireBullet();
    });
  }
  
  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.bullets.length; i++) {
      for (var j = 0; j < this.asteroids.length; j++) {
        if (this.bullets[i].hitAsteroid(this.asteroids[j])) {
          this.removeAsteroid(j);
          this.removeBullet(this.bullets[i]);
        }
      }
    }
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)){
        alert("Game over!");
        this.stop();
      }
    }
  }
  
  Game.prototype.checkOutOfBounds = function () {
    var that = this;
    this.asteroids.forEach(function (asteroid) {
      if (that.isOutOfBounds(asteroid.pos)) {
        that.wrapAround(asteroid);
      }
    });
    this.bullets.forEach(function (bullet) {
      if (that.isOutOfBounds(bullet.pos)) {
        that.removeBullet(bullet);
      }
    });
    if (this.isOutOfBounds(this.ship.pos)) {
      this.wrapAround(this.ship);
    };
  }
  
  Game.prototype.wrapAround = function (movingObj) {
    if (movingObj.pos[0] > Game.DIM_X) { 
      movingObj.pos[0] = 0;
    } else if (movingObj.pos[0] < 0) { 
      movingObj.pos[0] = Game.DIM_X;
    } else if (movingObj.pos[1] > Game.DIM_Y) { 
      movingObj.pos[1] = 0;
    } else { 
      movingObj.pos[1] = Game.DIM_Y;
    }
  }

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
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

  Game.prototype.start = function() {
    var that = this
    Game.intervalID = window.setInterval(function() {
      that.bindKeyHandlers();
      that.step();
    }, 30);
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkCollisions();
    this.checkOutOfBounds();
    this.won();
  };

  Game.prototype.stop = function() {
    window.clearInterval(Game.intervalID);
  }

  Game.prototype.fireBullet = function(){
    var that = this;
    if (this.ship.vel != [0, 0]) {
      that.bullets.push(that.ship.fireBullet());
    }
  };

  Game.prototype.removeAsteroid = function(asteroidIdx) {
    this.asteroids.splice(asteroidIdx, 1);
  };

  Game.prototype.removeBullet = function(bullet) {
    var idx = this.bullets.indexOf(bullet)
    this.bullets.splice(idx, 1);
  };
  
  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] > Game.DIM_X) || (pos[0] < 0) || (pos[1] > Game.DIM_Y) || 
      (pos[1] < 0);
  };
  
  Game.prototype.won = function () {
    if (this.asteroids.length === 0) {
      alert("Congratulations! You've Destroyed All the Asteroids!")
      this.stop();
    }
  }

})(this);