 // Définition de la classe Ball
        function Ball() {
            var config = {
                radius : 20,
                fill : 'white',
                x : 75,
                y : 330
                
            };
            Kinetic.Circle.call(this, config);
            // sa vitesse actuelle
            this.speedX = 4;
            this.speedY = 4; 
            
            this.speedAdded = 4;
            
            
        };
        Ball.prototype = new Kinetic.Circle({});
        Ball.prototype.constructor = Ball;

        Ball.prototype.moreSpeed = function(){
            this.speedAdded =4;
            
        }

        Ball.prototype.verticalBounce = function(){
            console.log('vertical');
            this.speedX = this.speedX * (-1)
            
        }
        Ball.prototype.horizontalBounce = function(){
            console.log('horizontal');
            this.speedY = this.speedY * (-1)
        }
        // comment la bale doit se deplacer et gestion des collisions
        Ball.prototype.move = function(game, player,mirror,target){

            // si la balle touche le mur horizontal
            if (this.attrs.y <= 0 ||  this.attrs.y >= HEIGHT) {
                this.horizontalBounce();
            }
            // si la balle touche le mur vertical
            else if( this.attrs.x <= 0 ||  this.attrs.x >= WIDTH) {
                this.verticalBounce();
            }

            // si la balle touche un obstacle
            else if( mirror.intersects(this.getPosition())){
                this.verticalBounce();
                this.horizontalBounce();
            }
            // si la balle touche le joueur
            else if( player.intersects(this.getPosition())){

                p1 = player.lastPoints[player.lastPoints.length - 1];
                //console.log(p1);
                p2 = player.lastPoints[player.lastPoints.length - 10];
               
                angle = Math.atan2(p1.y - p2.y, p1.x - p2.x);

                this.speedX = Math.cos(angle);
                this.speedY = Math.sin(angle);
                this.speedX = this.speedX * this.speedAdded;
                this.speedY =this.speedY* this.speedAdded;
                this.moreSpeed();
                console.log(this.speedAdded);
            }

            else if( target.intersects(this.getPosition())){
                game.finish();
            }
            this.attrs.x +=  this.speedX;
            this.attrs.y +=  this.speedY;
        };