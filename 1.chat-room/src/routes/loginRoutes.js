const path = require("path");

const loginController = require("../controllers/loginController");
const usersController = require("../controllers/usersController");

const loginRouter = require("express").Router();

// Login.
loginRouter.get(
    "/", 
    (req, res) => res.render("loginGoogle")
);
loginRouter.post(
    "/",
    loginController.getToken,
    (req, res) => res.redirect("chatrooms")
);

// Logout
loginRouter.get("/logout", loginController.logout);

module.exports = loginRouter;