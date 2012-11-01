//classe qui contient les infos sur le joueur et qui crée le palet qu'il va controler
        function Player() {
            //configuration du paler
            var config = {
                x: 800 / 2,
                y: 600 / 2,
                radius: 40,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4,
                draggable :true   
            };
            //appel de la configuration plus haut dans e but de creer le palet
            Kinetic.Circle.call(this, config);
            //les points de départ du joueur
            this.points = 0;
            this.taille = 30;
            this.limits = 30;
            this.lastPoints = null;
            //son nom @todo proposé de rentrer son nom voir e recuperer via fb connect
            this.name = 'Player';
        };
        // création du palet
        Player.prototype = new Kinetic.Circle({});
        // on précise qui est le constructeur de la class
        Player.prototype.constructor = Player;

        //recuperer la direction ou doit aller la balle
        Player.prototype.getDirection = function(){

        };
        //recuperer la vittesse que va devoir prendre la balle
        Player.prototype.getSpeed = function(){

        };
