/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 26/12/2011
 * Time: 12:58
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
        $('form[name="registerform"] input[name="username"]').bind("keyup",checkUsername);
        $('form[name="registerform"] input[name="password"]').bind("keyup",checkPassword);
        $('form[name="registerform"] input[name="email"]').bind("keyup",checkEmail);
        $('form').submit(checkRequired);
        $('form[name="addsoundtrack"]').submit(checkValidLink);

});

function checkValidLink(){
    console.log("checkValidLink");
    var valid = false,
        ele = $(this).find('input[name="link"]'), value = ele.val() || "",
        helpele = ele.parent().find('.help-inline');

    valid   = ('string' === typeof value);
    valid   = (valid)?(value.match(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) !== null):false;
    if(!valid){
        helpele.css("color","red");
        helpele.html("your link does not appear to be valid");
    }
    return valid;
}

function checkUsername () {
   var valid = false, value = $(this).val(), helpele = $(this).parent().find('.help-inline');
   console.log(value + helpele);
   valid = ('string' === typeof value);
   console.log("string");
   console.log(valid);
   valid = (valid) ? (value.search(/[^\d\w\-]+[^_]/) === -1) : false;
    console.log("regex");
    console.log(valid);
   if(!valid){
       help(helpele,"your username is invalid");
   }else{
       console.log("posting");
       $.post("/user/checkname",{username:value},function(data){
           console.log(data);
            if(data.message === "ok"){ help(helpele,""); }
            else {help(helpele,"username is invalid");}
       },"json");
   }
}

function checkPassword () {
    var valid = false, value = $(this).val(), helpele = $(this).parent().find('.help-inline');
    valid = (value.length > 5);
    if(!valid){
        help(helpele,"password must be more than 5 chars");
        return false;
    }else{
        help(helpele,"");
        return true;
    }
}

function checkEmail () {
    var valid = false, helpele = $(this).parent().find(".help-inline"), value = $(this).val();
    valid = (value.length > 5);
    //regex says match from start digit word . - _ & plus an @ followed by digit word . - plus a . followed by between 2 and 5 digit words
    valid = (value.search(/^[\d\w\.-_&]+@[\d\w\.-]+\.[\d\w]{2,5}$/i) !== -1);
    if (valid) {
        help(helpele, "");
        return true;
    } else {
        help(helpele, "email address appears invalid");
        return false;
    }

}

function help(ele,message){
    ele.html(message);
}

function checkRequired(){
    console.log("checkRequired");
    var reqInputs   = $(this).find(".required"),
        helpele     = undefined,
        bgcolor     = undefined,
        valid       = true;
    console.log(reqInputs);

    if(reqInputs.length > 0){
        reqInputs.each(function(){
            helpele = $(this).parent().find(".help-inline");
            bgcolor = (helpele)? helpele.css("color"):undefined;
            if($(this).val() === ""){
                  if(helpele.length > 0){
                      helpele.css("color","red");
                      helpele.html("this is a required field");
                      valid = false;
                  }else{
                      alert($(this).attr("name") + " is a required field");
                      valid = false;
                  }
            }
        });
    }
    return valid;
}

