/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 26/12/2011
 * Time: 18:12
 * To change this template use File | Settings | File Templates.
 */
var soundtrack = require("../models").db.models.Soundtrack , soundtracks  = require("../models").db.models.Soundtrack,
    soundtrackController = {
        add : function (req,res) {
            var soundTrack = undefined;
            if(req.session.loggedin){
                if(req.method === "POST"){
                    //add playlist
                    soundTrack  = new soundtrack(req.body);
                    soundTrack.user = req.session.user;
                    soundTrack.rating = 0;
                    soundTrack.save();
                    res.redirect("/");
                }else{
                    res.render("addSoundtrack",{title:"Add A Coding Soundtrack"});
                }
            }else{
                res.redirect("/login");
            }
        }
    };


module.exports = soundtrackController;