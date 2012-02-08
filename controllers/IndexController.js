var indexController;
var soundtrack = require("../models").db.models.Soundtrack;

indexController = {
    homepage : function (req,res) {
        soundtrack.find().count(function(e,d){
            if(e)return res.send("an error occurred",404);
            var count = d;
            var pagnum = (req.params.page && req.params.page  === 0) ? 0 : req.params.page * 25;
            console.log("getting results from pagenum "+pagnum);
            soundtrack.pageResults(pagnum,function(err, data){
                console.log(data);
                console.log(err);
                var pages = [];
                for(var i = 0; i < count; i+=25){
                    var pi = i/25;
                    pages.push("/list/"+pi);
                }
                res.render("index", {title: "coding soundtracks", soundtracks: data,"pages":pages});
            });

        });
        
        
    }
}

module.exports = indexController;