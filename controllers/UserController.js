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
                });
                res.send("post");

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
                console.log(data);
                if(err)res.send("error occurred");
                if(data.username === req.body.username && data.password === req.body.password){
                        req.session.loggedin = true;
                        req.session.user = data;
                        res.redirect("/");
                }else{
                    res.render("login",{title:"login"});
                }
            });
        }else{
           res.render("login",{title:"login"});
        }
    },

    logout : function(req,res){
        req.session.loggedin = false;
        req.session.user = null;
        res.redirect("/login");
    }
    
}



module.exports = userController;