/* Classe qui contient les informations sur le déroulement du jeu */
        function Game(stage, foregroundLayer, player, target, ball) {
            //propriétés
            this.stage = stage;
            this.foregroundLayer = foregroundLayer;
            this.level = 1;
            this.player = player;
            this.target = target,
            this.ball = ball;
            this.running = false;
            this.over = false;
        };
        //--- methodes
        // commencer le jeu
        Game.prototype.start = function() {
            this.running = true;
            this.stage.start();
        };
		Game.prototype.stop = function() {
            this.running = false;
            this.stage.stop();
        };
        Game.prototype.finish = function() {
            this.stop();
            var message = new Kinetic.Text({
                        x : 0,
                        y : 0,
                        fontSize : 14,
                        fontFamily : 'Calibri',
                        text : 'GAME OVER',
                        textFill : 'white'
                    });
            this.over = true;

            
            
            window.app.navigate("#gameFinish", {trigger: true})
            
        };