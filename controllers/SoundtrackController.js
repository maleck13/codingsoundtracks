/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 26/12/2011
 * Time: 18:12
 * To change this template use File | Settings | File Templates.
 */
var soundtrack = require("../models").db.models.Soundtrack , user = require("../models").db.models.User,
    soundtrackController = {
        add:function (req, res) {
            var soundTrack = undefined;
            if (req.session.loggedin && req.session.user) {
                console.log(req.session.user);
                if (req.method === "POST") {
                    //add playlist
                    soundTrack = new soundtrack(req.body);
                    soundTrack._user = req.session.user._id;
                    soundTrack.rating = 0;
                    soundTrack.save();
                    res.redirect("/");
                } else {
                    res.render("addSoundtrack", {title:"Add A Coding Soundtrack"});
                }
            } else {
                res.redirect("/login");
            }
        },

        show:function (req, res) {
            var listId = req.params.id;
            if (!listId) {
                res.send("No Page Found", 404);
            } else {
                soundtrack.findById(listId, function (err, data) {
                    console.log(data);
                    if (err) {
                        res.send("no page found", 404);
                    }
                    else {

                        res.render('soundtrack', {title:data.name, 'soundtrack':data});
                    }
                });
            }
        },
        update:function (req, res) {
            //load soundtrack check if owner is equal to logged in user
            //if so update
            if (req.params.id && req.session.user) {
                soundtrack.findById(req.params.id, function (err, data) {
                    if (err)res.send("an error occurred");
                    if (req.session.user._id === data._user._id) {
                        res.render("/addSoundtrack", {title:"edit", soundtrack:data});
                    }
                    res.redirect("/login");
                })
            } else {
                res.redirect("/soundtrack/add");
            }
        },

        deleteTrack:function (req, res) {
            //load soundtrack check if owner is equal to logged in user
            //if so delete
            if (undefined === req.session.user) {
                res.send({code:500, message:"must be logged in to vote"});
                return;
            }
            if (req.params.id) {
                console.log("delete");

                soundtrack.findById(req.params.id, function (err, data) {
                    if (data._user._id !== req.session.user._id) {
                        res.send({message:"denied"}, 503);
                    } else {
                        soundtrack.deleteSoundtrack(data._id, function (err, data) {
                            res.send({message:"ok"});
                        });

                    }
                });
            } else {
                res.send({message:"denied"}, 503);
            }
        },

        vote:function (req, res) {
            //function to count the votes up
            console.log("voter = "+req.session.user._id);
            var countUpVotes = function(votes){
                var count = 0;
                console.log(votes);
                if(votes instanceof Array){
                    for(var i =0; i < votes.length; i++){
                        if(votes[i].type === "up"){
                            console.log("counting up vote");
                            count+= 1;
                        }
                        else{
                            console.log("counting down vote");
                            count-= 1;
                        }
                    }
                }
                console.log("vote count "+count+ req.session.user._id);
                return count;
            };
            var trackid = req.params.id,
                userid, voteType = req.params.vote, voted = false;


            userid = req.session.user._id;
            soundtrack.findById(trackid, function (err, data) {
                console.log(data);
                if (err) {
                    res.send("sorry an error occurred");
                    return;
                }
                else {
                    if (data.votes.length === 0) {
                        console.log("votes length === 0");
                        data.votes.push({uid:req.session.user._id, type:voteType});

                    } else {
                        for (var i = 0; i < data.votes.length; i++) {
                            console.log("checking exsiting vote "+data.votes[i].uid+" against "+req.session.user._id);
                            if (data.votes[i].uid === userid) {

                                    data.votes[i].type = voteType;
                                    voted = true;
                                    break;

                            }
                        }
                        if(!voted){
                            console.log("not voted");
                            data.votes.push({type:voteType,uid:userid});
                        }

                    }
                    data.rank = countUpVotes(data.votes);
                    data.save(function (err, suc) {
                        if (err) { console.log(err);}
                        else console.log("success");

                            res.send({code:200, message:"ok","rating":data.rank});
                            return;

                    });
                }
            });
        }
    };


module.exports = soundtrackController;