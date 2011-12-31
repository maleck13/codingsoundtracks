var indexController;
var soundtrack = require("../models").db.models.Soundtrack;

indexController = {
    homepage : function (req,res) {
        soundtrack.findValidPlaylists(function(err, data){
            console.log(data);
            console.log(err);
            res.render("index", {title: "coding soundtracks", soundtracks: data});
        });
    }
}

module.exports = indexController;