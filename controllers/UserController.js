/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 24/12/2011
 * Time: 15:52
 * To change this template use File | Settings | File Templates.
 */
var userController,
    user;
user = require("../models").db.User;

userController = {
    register : function (req,res) {
        res.send("register");
    }
}



module.exports = userController;