/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 28/12/2011
 * Time: 19:11
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require("mongoose")
    , Schema = mongoose.Schema,
    Vote = new Schema({
        type:{type:String},
        _user : {type: Schema.ObjectId, ref:'User'}
    });

module.exports = Vote;
