/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 24/12/2011
 * Time: 12:21
 * To change this template use File | Settings | File Templates.
 */
/** User Model **/
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;


var User = new Schema({
    username : {type : String, index : true,validate:/\d\w/}
    ,password : {type:String}
    ,email : {type:String}
});

//validation functions
User.path("password").validate(function(value){
   return (value.length > 6);
},{message:"password must be longer than 6 chars"});


User.path("username").validate(function(value){
    var valid = false;
    valid = ('string' === typeof value);
    valid = (valid) ? (value.match(/[^\d\w]/) === null) : false;
    if(valid){
        User.findByUserName(value,function (err,data) {

        })
    }
});
/**
 *
 * @param name String
 * @param callback function(err,data)
 */
User.statics.findByUserName = function (name,callback) {
    if('string' === typeof name){
        console.log("")
        return this.findOne().where({"username":name}).run(callback);
    }else{
        throw{name:"InvalidArgException", message:"username must be a string"};
    }
};


module.exports = User;