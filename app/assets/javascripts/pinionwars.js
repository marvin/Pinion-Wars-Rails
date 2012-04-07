window.onload = function() {
  var direction, pickNewDirection;
  Crafty.init(800, 450);
  Crafty.canvas.init;

  Crafty.sprite(32, "/assets/sprites.png", {
    minion:     [0, 0],
    explosion:  [0, 1]
  });

  Crafty.audio.add("shot", [
    "/assets/laser.wav"
  ]);

  Crafty.scene("loading", function() {
    Crafty.load(["/assets/sprites.png"], function() {
      return Crafty.scene("start");
    });
    Crafty.background("#141414");
    return Crafty.e("2D, DOM, Text").attr({
      w: 100,
      h: 30,
      x: 350,
      y: 220
    }).text("Loading ...").css({
      "text-align": "center"
    });
  });

  Crafty.scene("start", function() {
    Crafty.background("#141414");
    return Crafty.e("2D, DOM, Text, Mouse").attr({
      w: 100,
      h: 30,
      x: 350,
      y: 220
    }).text("Click to Start").css({
      "text-align": "center"
    }).bind("Click", function(e) {
        return Crafty.scene("main");
    });

  });

  Crafty.scene("loading");

  Crafty.scene("main", function() {
    var score = 0;
    var count = 60;


    var scoreEnt = Crafty.e("2D, DOM, Text").attr({
      w: 100,
      h: 30,
      x: 0,
      y: 0
      }).text("Score: " + score );

    var timeEnt = Crafty.e("2D, DOM, Text").attr({
      w: 100,
      h: 30,
      x: 700,
      y: 0
      }).text("Time: " + count + " sec");

    handleCounter = function() {
      if (count == 0) {
        return Crafty.scene("end");
      } else {
        count -= 1;
        timeEnt.text("Time: " + count + " sec");
      }
    }

    window.setInterval("handleCounter()", 1000);


      var minion = function() { 
          var randomX = Crafty.math.randomInt(100,700);
          var randomY = Crafty.math.randomInt(50,400);  

          Crafty.e("Enemy").attr({
            x: randomX,
            y: randomY
          }).bind("MouseDown", function(){
              Crafty.audio.play("shot");
              this.destroy();
              score += 1;
              scoreEnt.text("Score: "+score);
              m = Crafty.math.randomInt(1,3);
              for (i=0;i<m;i++) {
                minion();
              } 
              this.die();
              this.unbind("MouseDown");
            });
        };

    minion();
    
  });

  Crafty.c("Enemy", {
        init: function () {
            var directions = [    {name:  'minionUp',     x: 0, y: -2, spriteRow: 0}, 
                                  {name:  'minionRight',       x: 2, y: 0, spriteRow: 0}, 
                                  {name:  'minionDown',     x: 0, y: 2, spriteRow: 0}, 
                                  {name:  'minionLeft',     x: -2, y: 0, spriteRow: 0}, 
                                  {name:  'minionUpRight',     x: 2, y: -2, spriteRow: 0}, 
                                  {name:  'minionUpLeft',     x: -2, y: -2, spriteRow: 0},
                                  {name:  'minionUpRight',     x: 2, y: 2, spriteRow: 0}, 
                                  {name:  'minionUpLeft',     x: -2, y: 2, spriteRow: 0}
                                     ];

            // Just to get things started...                    
            if (!direction) {
                var direction = directions[Crafty.math.randomInt(0,7)];
            }

            this.requires("2D, Canvas, minion, SpriteAnimation, Mouse");
            this.animate("minion",1,0,2);
            this.bind("EnterFrame", function() { 
                    // keep them in the frame
                    if(this.x < 0) {
                        direction = directions[1];
                    }
                    if(this.x > 772) {
                        direction = directions[3];
                    }
                    if(this.y < 0) {
                        direction = directions[2];
                    }
                    if(this.y > 418) {
                        direction = directions[0];
                    }
                    
                    if(!this.isPlaying()){
                      direction = pickNewDirection();
                      this.animate("minion", 30);
                      this.x += direction.x;
                      this.y += direction.y;
                    }    
            });
            
            var pickNewDirection = function() {
                if(Crafty.math.randomInt(0,60) === 30) {
                     direction = directions[Crafty.math.randomInt(0, 7)];
                }
                return direction;
            };
        },

         die:function(){
          Crafty.e("Explosion").attr({
            x:this.x,
            y:this.y
          });
        
          this.destroy();
        }
    });

  Crafty.c("Explosion",{
    init:function(){
        this.addComponent("2D","Canvas","explosion","SpriteAnimation")
        .animate("explode",0,1,7)
        .animate("explode", 6)
        .timeout(function(){this.destroy()},500);
    }
  });

Crafty.scene("end", function() {
    Crafty.background("#141414");
    return Crafty.e("2D, DOM, Text, Mouse").attr({
      w: 100,
      h: 30,
      x: 350,
      y: 220
    }).text("Game Over. Click to restart").css({
      "text-align": "center"
    }).bind("Click", function(e) {
        return Crafty.scene("main");
    });

  });

};