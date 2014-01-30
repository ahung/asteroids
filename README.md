Asteroids
=========
A remake of the classic arcade game written in JavaScript.  
Check it out live: [here](asteroids.alberthung.net) 

Controls:  
 W, A, S, D to Move  
 Spacebar to Fire  
 
The game currently spawns 20 asteroids randomly (you may lose immediately) on startup.  
Both the ship and asteroids will wrap around the screen but bullets will not.  
The game ends when you have destroyed all the asteroids.  

There is currently an index.php file to have this project function on heroku. The actual game can be found in the game.html file.

To Do:  
  * Create a dead zone in the center so asteroids don't spawn there on game start
  * Change Win/Loss to messages on the canvas instead of using alerts
  * Add a buttons to Pause the game, Teleport ship randomly, and Restart the game
  * Change controls so that A and D rotate the ship to enable use of other ship graphics
