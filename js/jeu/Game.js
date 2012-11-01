/* game class */
        function Game(stage, foregroundLayer, player, target, ball) {
            this.stage = stage;
            this.foregroundLayer = foregroundLayer;
            this.level = 1;
            this.player = player;
            this.target = target,
            this.ball = ball;
            this.running = false;
            this.over = false;
        };
        Game.prototype.start = function() {
            this.running = true;
            this.stage.start();
        };