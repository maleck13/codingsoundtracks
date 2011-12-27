/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 26/12/2011
 * Time: 18:12
 * To change this template use File | Settings | File Templates.
 */
var soundtrack = require("../models").db.models.Soundtrack , user = require("../models").db.models.User,
    soundtrackController = {
        add : function (req,res) {
            var soundTrack = undefined;
            if(req.session.loggedin && req.session.user){
                console.log(req.session.user);
                if(req.method === "POST"){
                    //add playlist
                    soundTrack  = new soundtrack(req.body);
                    soundTrack._user = req.session.user._id;
                    soundTrack.rating = 0;
                    soundTrack.save();
                    res.redirect("/");
                }else{
                    res.render("addSoundtrack",{title:"Add A Coding Soundtrack"});
                }
            }else{
                res.redirect("/login");
            }
        },

        show : function (req, res) {
            var listId = req.params.id;
             if(!listId){
                 res.send("No Page Found",404);
             }else{
                soundtrack.findById(listId, function (err, data){
                    console.log(data);
                    if(err){res.send("no page found",404);}
                    else{

                        res.render('soundtrack',{title:data.name,'soundtrack':data});
                    }
                });
             }
        },
        update : function (req, res) {

        },

        delete : function (req,res) {

        }
    };


module.exports = soundtrackController;