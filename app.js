/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 24/12/2011
 * Time: 11:18
 * To change this template use File | Settings | File Templates.
 */
/**
 * Module dependencies.
 */

var express     = require('express')
    , db          = require("./models").db
    , MemoryStore = require('express/node_modules/connect').session.MemoryStore
    , controllers = require("./controllers");


var users = db.models.User;
users.remove({email:""},function(err,data){});

var app = module.exports = express.createServer();

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "blahblah", store: new MemoryStore({ reapInterval:  60000 * 10 })}));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});
//sets up helpers available in the views
app.dynamicHelpers({
   session: function (req, res){
       return req.session;
   } 
});

module.exports = app;
//homepage
app.get("/", controllers.indexController.homepage);
app.get("/list/:page",controllers.indexController.homepage);

//registration page
app.get("/register",controllers.userController.register);
app.post("/register",controllers.userController.register);

//login page
app.all("/login",controllers.userController.login);
app.get("/logout",controllers.userController.logout);
app.post("/user/checkname",controllers.userController.checkUsernameAvailable);

//soundtracks
//comment on soundtrack:
app.all("/soundtrack/comment/:id",controllers.soundtrackController.addComment);
app.all("/soundtrack/add",controllers.soundtrackController.add);
app.all("/soundtrack/delete/:id",controllers.soundtrackController.deleteTrack);
app.get("/soundtrack/update/:id",controllers.soundtrackController.update);
app.get("/soundtrack/show/:id",controllers.soundtrackController.show);

//posted to via jquery ajax call
app.get("/soundtrack/vote/:id/:vote",controllers.soundtrackController.vote);
app.all("/soundtrack/search",controllers.soundtrackController.search);
app.all("/soundtrack/list/:type/:callback",controllers.soundtrackController.list);


var port = (3000);
app.listen(port);
console.log("Express server listening on port");

