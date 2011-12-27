/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 24/12/2011
 * Time: 15:52
 * To change this template use File | Settings | File Templates.
 */
var userController,
    User;
User = require("../models").db.models.User;

userController = {
    register : function (req,res) {
        var newUser;
        if(req.method === "POST"){
            try{

                newUser = new User(req.body);
                newUser.save(function(err,data){
                    console.log(err +  data);
                    if(err)res.send("an error occurred");
                    else{
                        req.session.loggedin = true;
                        req.session.user = data;
                        res.redirect("/");
                    }
                });


            }catch(e){
                res.send(e.message);
            }
        }else{
            res.render("register",{title:"register for codingsoundtracks"});
        }
    },

    login : function(req,res){
        if(req.method === "POST"){
            User.findByUserName(req.body.username,function(err,data){
                if(err)res.send("error occurred");
                if(data.username === req.body.username && data.password === req.body.password){
                        req.session.loggedin = true;
                        req.session.user = data;
                        res.redirect("/");
                }else{
                    res.render("login",{title:"login",error:{message:"username or password incorrect"}});
                }
            });
        }else{
           res.render("login",{title:"login"});
        }
    },

    logout : function(req, res){
        req.session.destroy();
        res.send("logged out");
    },

    //utitlity function to check if username is available
    checkUsernameAvailable : function (req,res) {
        var username = req.body.username, notok = {message:"not ok"}, ok = {message:"ok"};
        if(! username || username.length < 3) res.send(notok);
        else{
            User.findByUserName(req.body.username,function (err, data) {
                console.log(data);
                if(data){
                    res.send(notok);
                }else{
                    res.send(ok);
                }
            });
        }
    }

}



module.exports = userController;