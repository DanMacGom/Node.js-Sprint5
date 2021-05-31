const path = require("path");

const loginController = require("../controllers/loginController");
const usersController = require("../controllers/usersController");
const chatroomsController = require("../controllers/chatroomsController");

const loginRouter = require("express").Router();

// Signup.
loginRouter.get(
    "/",
    (req, res) => res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"))
);
loginRouter.post(
    "/",
    usersController.createUserMiddleware,
    loginController.getCookieMiddleware,
    chatroomsController.getChatroomMiddleware,
    (req, res) => res.redirect("chatrooms")
);

// Login.
loginRouter.get(
    "/login",
    (req, res) => res.status(200).sendFile(path.resolve(__dirname, "../views/login.html"))
);
loginRouter.post(
    "/login",
    usersController.validateUserMiddleware, 
    loginController.getCookieMiddleware,
    chatroomsController.getChatroomMiddleware, 
    (req, res) => res.redirect("chatrooms")
);

// Logout.
loginRouter.get(
    "/logout",
    loginController.logout
);

module.exports = loginRouter;