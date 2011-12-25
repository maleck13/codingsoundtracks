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


app.get("/register",controllers.userController.register);
app.post("/register",controllers.userController.register);
console.log(controllers);

var port = (process.env.VMC_APP_PORT || 3000);
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);