(function ($) {

    //demo data
   /*var scoresBDD = [{"name":"Verhaeghe","lastname":"julien","score":"787","sexe":"M","photo":""},{"name":"Tartenfion","lastname":null,"score":"4567","sexe":"M","photo":""},{"name":"DFGHJ","lastname":"DFGHJK","score":"34567","sexe":"F","photo":""},{"name":"DFG","lastname":"OKJN","score":"123","sexe":"F","photo":""}];*/

    //define product model
    window.Score = Backbone.Model.extend({
		urlRoot :'http://julien-verhaeghe.fr/projetJS/api/index.php/scores',
        defaults: {
            name: "",
            score: "0",
            sexe: "",
            photo: "/img/placeholder.png"
        },
		onTimerEvent : function(){
			var scoreActuel = this.get('score');
			scoreActuel -=3;
			this.set({'score' : scoreActuel });
		}
    });

    //define directory collection
    var Directory = Backbone.Collection.extend({
		url:"http://julien-verhaeghe.fr/projetJS/api/index.php/scores",
        model: Score
    });

    //define individual contact view
    var ScoreView = Backbone.View.extend({
        tagName: "article",
        className: "score-container",
        template: _.template($("#scoreTemplate").html()),
        

        render: function () {
			
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    });

    //define master view Scores
    var DirectoryView = Backbone.View.extend({
        el: $("#content"),

        initialize: function () {
            this.collection = new Directory();

            this.render();
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
           
        },

        render: function () {
            this.$el.find("article").remove();
            this.$el.html('<header><div id="filter"><label>Show me:</label></div></header>');

            _.each(this.collection.models, function (item) {
                this.renderScore(item);
            }, this);
            this.createSelect();
			
        },

        renderScore: function (item) {
            var contactView = new ScoreView({
                model: item
            });
            this.$el.append(contactView.render().el);
        },

        getTypes: function () {
            return _.uniq(this.collection.pluck("sexe"), false, function (type) {
                return type.toLowerCase();
            });
        },

        createSelect: function () {
            var filter = this.$el.find("#filter"),
                select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item.toLowerCase(),
                    text: item.toLowerCase()
                }).appendTo(select);
            });

            return select;
        },

        //add ui events
        events: {
            "change #filter select": "setFilter",
            
        },

        //Set filter property and fire change event
        setFilter: function (e) {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        //filter the view
        filterByType: function () {
            if (this.filterType === "all") {
                this.collection.reset();
                app.navigate("filter/all");
            } else {
                this.collection.reset( { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("sexe").toLowerCase() === filterType;
                    });

                this.collection.reset(filtered);

                app.navigate("filter/" + filterType);
            }
        }

        
        
    });
	
    //define master view Game
    var GameView = Backbone.View.extend({
        el: $("#content"),

        tagName: "div",
        className: "game",
        template: _.template($("#gameTemplate").html()),
        

        render: function () {
            this.$el.html(this.template());
			initStage();
            return this;
        },

    });
    //define master view Game
    var GameFinishView = Backbone.View.extend({
        el: $("#content"),

        tagName: "div",
        className: "gameFinish",
        template: _.template($("#gameFinishTemplate").html()),
        

        render: function () {
			console.log('render gameFinish ');
            this.$el.html(this.template(this.model.toJSON()));
            
            return this;
        },

    });
    //define master view Home
    var HomeView = Backbone.View.extend({
        el: $("#content"),

        tagName: "div",
        className: "home",
        template: _.template($("#homeTemplate").html()),
        

        render: function () {
			console.log($("#homeTemplate"));
            this.$el.html(this.template());
            return this;
        },

    });
    //add routing
    var ScoreRouteur = Backbone.Router.extend({
        routes: {
            "filter/:type": "urlFilter",
            "game": "showGame",
            "score":'showScore',
            "gameFinish" : 'showFinishGame',
            "*actions" : "showHome"

        },

        urlFilter: function (type) {
            directory.filterType = type;
            directory.trigger("change:filterType");
        },
        showGame : function(){
            
            gameView.render();
        },
        showFinishGame : function(){
			console.log('showFinisjGame');
            var gameFinishView = new GameFinishView({
				model : window.scoreJoueur
			});
            gameFinishView.render();
        },
        showHome : function(){
            
		
            homeView.render();
        },
        showScore : function(){
            directory.render();
           
        }
    });
    var gameView = new GameView();
    
    var homeView = new HomeView();
	window.directory = new DirectoryView();
    

    //create router instance
    window.app = new ScoreRouteur();

    //start history service
    Backbone.history.start();
    function trace(texte){
        console.log(texte);
    };
} (jQuery));