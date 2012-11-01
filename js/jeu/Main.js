// fonction appelé quand tout est chargé
        function initStage(){
            // création du stage
            var stage = new Kinetic.Stage({
                container : "board",
                width: 800,
                height: 600
            })
            
            // background
            var backgroundLayer = new Kinetic.Layer();
            var background = new Kinetic.Rect({
                fill: 'black',
                x : 0,
                y : 0,
                width : 800,
                height : 600
            });
            
           
            
            backgroundLayer.add(background);
            
            
            // foreground qui va contenir tout les objets que l'on anime
            var foregroundLayer = new Kinetic.Layer();
            //ajout d'un fond 
            
            
            
            // player
            var player = new Player();
            foregroundLayer.add(player);
            
            
            // ball
            var ball = new Ball();
            foregroundLayer.add(ball);
            var target = new Target();
            foregroundLayer.add(target);
            // game obj
            var game = new Game(stage, foregroundLayer,player, ball);
            
            
            
            var welcomeScreen = new Kinetic.Group();
            var wbg = new Kinetic.Rect({
                        x : 260,
                        y : 230,
                        width: 290,
                        height: 120,
                        fill : '#666',
                        alpha: 0.9
            });
                        
            var start = new Kinetic.Text({
                        x : 295,
                        y : 315,
                        fontSize : 13,
                        fontFamily : 'Calibri',
                        text : 'Appuyer sur start',
                        textFill : 'white'
            });
            welcomeScreen.add(wbg);
            welcomeScreen.add(start);
            foregroundLayer.add(welcomeScreen);
            
            stage.add(backgroundLayer);
            stage.add(foregroundLayer);
            
            
            var rectangle2 = new Kinetic.Rect({
                        x : 400,
                        y : 360,
                        width: 120,
                        height: 120,
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

            stage.onFrame(function(){
                
                ball.move(game, player,rectangle2,target);
                
                // refresh scoreboard
                if (player.lastPoints == null){
                    
                player.lastPoints = new Array();
                }
               // console.log('push X : ', player.getX(),' Y : ' ,player.getY());
                player.lastPoints.push({ x: player.getX(), y: player.getY() });
               
               
                foregroundLayer.draw();
            });
            
        }; 
        
        $(function(){
            initStage();
        });