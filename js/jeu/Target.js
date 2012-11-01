        /* target class */
        function Target() {
            var config = {
                x: 800 * Math.random(),
                y: 600* Math.random(),
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