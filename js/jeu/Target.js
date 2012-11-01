        /* target class */
        function Target() {
            var config = {
                x: WIDTH * Math.random(),
                y: HEIGHT* Math.random(),
                radius: 30,
                fill: 'black',
                stroke: '#FFFF00',
                strokeWidth: 1,
                
                
            };
            Kinetic.Circle.call(this, config);
            this.points = 0;
            this.name = 'Target';
        };
        Target.prototype = new Kinetic.Circle({});
        Target.prototype.constructor = Target;