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
    username : {type : String, index : {unique:true}}
    ,password : {type:String}
    ,email : {type:String, index:{unique:true}}
    ,language : {type:String}
});


/**
 *
 * @param name String
 * @param callback function(err,data)
 */
User.statics.findByUserName = function (name,callback) {
    console.log(name);
    if('string' === typeof name){
        return this.findOne().where('username',name).run(callback);
    }else{
        throw{name:"InvalidArgException", message:"username must be a string"};
    }
};


//validation functions
//User.path("password").validate(function(value){
//   return (value.length > 6);
//},{message:"password must be longer than 6 chars"});


User.path("username").validate(function(value){
    console.log("validating");
    var valid = false;
    valid = ('string' === typeof value);
    valid = (value.length > 3);
    valid = (valid) ? (value.match(/[^\d\w]/) === null) : false;
    return valid;
},"username error");

User.path("email").validate(function(value){
    console.log("validating email " + value);
    var valid = false;
    valid = ('string' === typeof value);
    valid = (value.length >=5);
    valid = (valid)?(value.search(/^[\d\w\.-_&]+@[\d\w\.-]+\.[\d\w]{2,5}$/i)!== -1) : false;
    console.log("valid = " +valid)
    return valid;
},"Email is invalid");

function notEmpty(value){
    console.log("called notEmpty");
    return ('string' === typeof value && value.length >0);
}



module.exports = User;