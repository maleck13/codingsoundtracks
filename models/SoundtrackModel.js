/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 24/12/2011
 * Time: 12:21
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require("mongoose")
    , Schema = mongoose.Schema;

var Soundtrack = new Schema({
   userid :Schema.ObjectId,
   tracks : {type: Array},
   description: {type: String},
   tags : {type : String},
   link : {type : String},
   rank : {type : Number},
   name : {type : String},
   comments : {type : Array} //author and text
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
        .run(callback);
}

Soundtrack.path("tags").validate(function(value){
    if('Array' === typeof value){
        return true;
    }
    return false;
}, "tags error");

Soundtrack.path("description").validate(function(value){
    if('String' === typeof value){
        return true;
    }
    return false;
}, "description error");

Soundtrack.path("tracks").validate(function(value){
    if('Array' === typeof value){
        return true;
    }
    return false;
}, "tracks error");

Soundtrack.path("link").validate(function(value){
    if(value.search(/http:\/\/[a-z0-9\-\.]+\.[a-z][a-z][a-z\.]*/gi) !== -1){
        return true;
    }
    return false;
}, "link error");

Soundtrack.path("name").validate(function(value){
    if('String' === typeof value){
        return true;
    }
    return false;
}, "name error");

Soundtrack.path("rank").validate(function(value){
    if('Number' === typeof value){
        return true;
    }
    return false;
}, "link error");

Soundtrack.path("comments").validate(function(value){
    if('Array' === typeof value){
        return true;
    }
    return false;
}, "comments error");


module.exports = Soundtrack;
