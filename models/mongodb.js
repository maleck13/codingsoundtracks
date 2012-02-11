/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 24/12/2011
 * Time: 12:33
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , db   = null
    , mongoUrl = null;

//change for mongohq

var generate_mongo_url = function(obj){
    obj = obj || {};
    obj.hostname = '178.79.185.58';
    obj.port =  27017;
    obj.db = 'codingsoundtracks';
    obj.username="codingsoundtracks";
    obj.password="JJyxNoDq";
    
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
};

mongoUrl = generate_mongo_url();

db = mongoose.connect(mongoUrl);





mongoose.model('User', require('./UserModel'));
mongoose.model("Soundtrack",require("./SoundtrackModel"));
exports.db = mongoose;