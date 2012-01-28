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



var generate_mongo_url = function(obj){
    obj.hostname = 'localhost';
    obj.port = 27017;
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

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
    mongoUrl = generate_mongo_url(mongo);

}else{
    mongoUrl = generate_mongo_url({db:"soundtracks"});

}
db = mongoose.connect(mongoUrl);





mongoose.model('User', require('./UserModel'));
mongoose.model("Soundtrack",require("./SoundtrackModel"));
exports.db = mongoose;
