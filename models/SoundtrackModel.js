/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 24/12/2011
 * Time: 12:21
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require("mongoose")
    , Schema = mongoose.Schema;

var Vote = new Schema(
    {
        type:{type:String},
        uid : {type : String}
    }
);

var Comment = new Schema({
    _user :{ type: Schema.ObjectId, ref:'User'},
    comment : {type: String}
});

var Soundtrack = new Schema({
   _user :{ type: Schema.ObjectId, ref:'User'},
   tracks : {type: Array},
   description: {type: String},
   tags : {type : String},
   link : {type : String},
   rank : {type : Number},
   name : {type : String},
   votes : {type : [Vote]},
   comments : {type : [Comment]} //author and text
});


Soundtrack.statics.deleteSoundtrack = function (soundtrack,callback) {

    if('object' === typeof soundtrack || 'string' ===  typeof soundtrack ){
        this.remove(soundtrack).run(callback);
    }

};



Soundtrack.statics.findValidPlaylists = function(callback) {
    this.find()
        .where("link").ne(null)
        .where("tracks").ne(null)
        .sort('rank','descending')
        .run(callback);
};


Soundtrack.statics.deleteById = function (id,cb) {
  this.find().where("_id",id).run(function (err,ob){
      if(err)cb(err);
      else{
          this.remove(ob).run(cb);
      }
  });  
};

Soundtrack.statics.getSoundtrackVotes = function (sid, callback) {
    this.findOne().where("_id",sid).select('votes').run(callback);
};

Soundtrack.statics.getComments = function (sid,callback) {
    this.findOne().where("_id",sid).populate("comments._user").select("comments").run(callback);
}

Soundtrack.statics.findById = function (id,callback) {
    if('string' === typeof id && 'function' === typeof callback){
        this.findOne().where("_id",id).populate("_user").populate("comments._user").run(callback);
    }else{
        throw{message:"id must be a string and callback must be a function",type:"InvalidArgsException"};
    }
};

Soundtrack.statics.searchByKeyWords = function (words, callback) {
    var searchWords = (words.indexOf(",") !== -1)?words.split(","):words;
    if(searchWords instanceof Array){
        searchWords = searchWords.join("|");
    }
    var regex = new RegExp(".*"+searchWords+".*",'g');
    this.find().where("tags").regex(regex).run(callback);


};

//Soundtrack.path("tags").validate(function(value){
//    if('Array' === typeof value){
//        return true;
//    }
//    return false;
//}, "tags error");

Soundtrack.path("description").validate(function(value){
    if('string' === typeof value){
        return true;
    }
    return false;
}, "description error");

Soundtrack.path("link").validate(function(value){
    if(value.search(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) !== -1){
        return true;
    }
    return false;
}, "link error");

Soundtrack.path("name").validate(function(value){
    if('string' === typeof value){
        return true;
    }
    return false;
}, "name error");

//Soundtrack.path("rank").validate(function(value){
//    console.log(value + typeof value);
//    if('number' === typeof value){
//        return true;
//    }
//    return false;
//}, "rank error");

//Soundtrack.path("comments").validate(function(value){
//    if('Array' === typeof value){
//        return true;
//    }
//    return false;
//}, "comments error");


module.exports = Soundtrack;
