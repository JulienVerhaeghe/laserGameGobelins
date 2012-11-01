// fonction appelé quand tout est chargé
var WIDTH = 320;
var HEIGHT = 480;
        function initStage(){
            // création du stage
            var stage = new Kinetic.Stage({
                container : "board",
                width: WIDTH,
                height: HEIGHT
            })
            
            // background
            var backgroundLayer = new Kinetic.Layer();
            var background = new Kinetic.Rect({
                fill: 'black',
                x : 0,
                y : 0,
                width : WIDTH,
                height : HEIGHT
            });
            
           
            
            backgroundLayer.add(background);
            
            
            // foreground qui va contenir tout les objets que l'on anime
            var foregroundLayer = new Kinetic.Layer();
       
            
            
            
            // player
            var player = new Player();
            foregroundLayer.add(player);
            
            
            // ball
            var ball = new Ball();
            foregroundLayer.add(ball);
            var target = new Target();
            foregroundLayer.add(target);
			// gesion des points
			var gestionPoint = new GestionPoint();
            // game obj
            var game = new Game(stage, foregroundLayer,player, ball);
            
            
            var textScore = new Kinetic.Text({
                x: 100,
                y : 0,
                text : 'Score: '+player.points,
                textFill : 'white',
                padding : 5,
                fontSize : 8                
            });
			
            foregroundLayer.add(textScore);

            var welcomeScreen = new Kinetic.Group();
            var wbg = new Kinetic.Rect({
                        x : 0,
                        y : 0,
                        width: 130,
                        height: 20,
                        fill : '#FFF',
                        alpha: 0.9
            });
                        
            var start = new Kinetic.Text({
                        x : 0,
                        y : 0,
                        fontSize : 13,
                        fontFamily : 'Calibri',
                        text : 'Appuyer sur start',
                        textFill : 'green'
            });
            welcomeScreen.add(wbg);
            welcomeScreen.add(start);
            foregroundLayer.add(welcomeScreen);
            
            stage.add(backgroundLayer);
            stage.add(foregroundLayer);
            
            
            var rectangle2 = new Kinetic.Rect({
                        x : 50,
                        y : 100,
                        width: 40,
                        height: 40,
                        fill : '#FFF',
                        alpha: 0.9
                });
            
            foregroundLayer.add(rectangle2);

            // key events
            var input = {};
            document.addEventListener('keydown', function(e){
                
                if (game.running == true) {
                    e.preventDefault();
                };
                
                input[e.which] = true;
                
                // start game
                if (input[32] == true && game.over == false) {
                    e.preventDefault();
                    if (game.running == false) {
                        foregroundLayer.remove(welcomeScreen);
                        game.start();
                        
                    } else {
                        if (game.turn == 1) {
                            game.ball.start();
                        };
                    };
                };
                
            });
			window.scoreJoueur = new Score();
            stage.onFrame(function(){
                
                ball.move(game, player,rectangle2,target);
                scoreJoueur.onTimerEvent();
                // refresh scoreboard
                if (player.lastPoints == null){
                    
                player.lastPoints = new Array();
                }
               
                player.lastPoints.push({ x: player.getX(), y: player.getY() });
                textScore.attrs.text = 'Score: '+scoreJoueur.get('score');
               
                foregroundLayer.draw();
            });
            
        }; 
        
       