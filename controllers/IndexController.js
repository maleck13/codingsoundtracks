var indexController;

indexController = {
    homepage : function (req,res) {

        res.render("index", {title: "coding soundtracks"});
    }
}



module.exports = indexController;