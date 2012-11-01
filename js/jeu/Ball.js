/* ball class */
        function Ball() {
            var config = {
                radius : 20,
                fill : 'white',
                x : 75,
                y : 330
                
            };
            Kinetic.Circle.call(this, config);
            this.speed = 4;
            this.regularSpeed = 4;
            this.direction = { x: -1, y: -1 };
            
        };
        Ball.prototype = new Kinetic.Circle({});
        Ball.prototype.constructor = Ball;
        Ball.prototype.move = function(game, player,mirror){
           
            
            if (this.speed > 0 && this.attrs.y <= 0 || this.speed > 0 && this.attrs.y >= 600) {
                this.direction.y = this.direction.y * (-1)
            }
            else if(this.speed > 0 && this.attrs.x <= 0 || this.speed > 0 && this.attrs.x >= 800) {
                
                this.direction.x = this.direction.x * (-1);
            }

            else if(this.speed > 0 && mirror.intersects(this.getPosition())){
                this.direction.x = this.direction.x * (-1);
                this.direction.y = this.direction.y * (-1);
                console.log('mirror');
            }
            else if(this.speed > 0 && player.intersects(this.getPosition())){

                p1 = player.lastPoints[player.lastPoints.length - 1];
                p2 = player.lastPoints[player.lastPoints.length - 10];
                angle = Math.atan2(p1.y - p2.y, p1.x - p2.x);

                this.direction.x = this.direction.x * (-1);
                this.direction.y = this.direction.y * (-1);
                console.log('player');
            }
            
            //console.log('loop');
            this.attrs.x += this.speed * this.direction.x;
            this.attrs.y += this.speed * this.direction.y;
        };
   