(function ($) {

    //demo data
    var contacts = [
        { name: "joe", lastname:'dalton',score:'70',sexe:'M',photo:'' },
        { name: "averel", lastname:'dalton',score:'90',sexe:'M',photo:'' },
        { name: "monique", lastname:'parson',score:'980',sexe:'F',photo:'' }
     
    ];

    //define product model
    var Contact = Backbone.Model.extend({
        defaults: {
            name: "",
            score: "0",
            sexe: "",
            photo: "/img/placeholder.png"
        }
    });

    //define directory collection
    var Directory = Backbone.Collection.extend({
        model: Contact
    });

    //define individual contact view
    var ContactView = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",
        template: _.template($("#contactTemplate").html()),
        

        render: function () {
			
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    });

    //define master view Scores
    var DirectoryView = Backbone.View.extend({
        el: $("#content"),

        initialize: function () {
            this.collection = new Directory(contacts);

            this.render();
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
           
        },

        render: function () {
            this.$el.html('<header><div id="filter"><label>Show me:</label></div></header>');
            this.$el.find("article").remove();

            _.each(this.collection.models, function (item) {
                this.renderContact(item);
            }, this);
        },

        renderContact: function (item) {
            var contactView = new ContactView({
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
                this.collection.reset(contacts);
                contactsRouter.navigate("filter/all");
            } else {
                this.collection.reset(contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("sexe").toLowerCase() === filterType;
                    });

                this.collection.reset(filtered);

                contactsRouter.navigate("filter/" + filterType);
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
    var ContactsRouter = Backbone.Router.extend({
        routes: {
            "filter/:type": "urlFilter",
            "game": "showGame",
            "score":'showScore',
            "*actions" : "showHome"

        },

        urlFilter: function (type) {
            directory.filterType = type;
            directory.trigger("change:filterType");
        },
        showGame : function(){
            var gameView = new GameView();
            gameView.render();
        },
        showHome : function(){
            var homeView = new HomeView();
			console.log('home');
            homeView.render();
        },
        showScore : function(){
            //create instance of master view
           var directory = new DirectoryView();
        }
    });

    

    //create router instance
    var contactsRouter = new ContactsRouter();

    //start history service
    Backbone.history.start();
    function trace(texte){
        console.log(texte);
    };
} (jQuery));