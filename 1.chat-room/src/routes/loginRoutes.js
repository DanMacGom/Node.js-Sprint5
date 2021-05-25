const path = require("path");

const loginController = require("../controllers/loginController");
const usersController = require("../controllers/usersController");

const loginRouter = require("express").Router();

// Signup.
loginRouter.get(
    "/", 
    (req, res) => res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"))
);
loginRouter.post(
    "/", 
    usersController.createUserMiddleware, 
    loginController.getCookie
);

// Login.
loginRouter.get(
    "/login", 
    (req, res) => res.status(200).sendFile(path.resolve(__dirname, "../views/login.html"))
);
loginRouter.post(
    "/login", 
    usersController.validateUserMiddleware, 
    loginController.getCookie
);

module.exports = loginRouter;