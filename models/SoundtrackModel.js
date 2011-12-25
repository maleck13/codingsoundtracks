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
module.exports = Soundtrack;
