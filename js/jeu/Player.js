function Player() {
            var config = {
                x: 800 / 2,
                y: 600 / 2,
                radius: 40,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4,
                draggable :true
                
            };
            Kinetic.Circle.call(this, config);
            this.points = 0;
            this.name = 'Player';
        };
        Player.prototype = new Kinetic.Circle({});
        Player.prototype.constructor = Player;