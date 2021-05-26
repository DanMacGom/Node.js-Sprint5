const usersController = require("../controllers/usersController");

const userRouter = require("express").Router();
const googleAuth = require("../auth/googleAuth");

userRouter.get(
    "/",
    googleAuth.checkAuthenticated, 
    usersController.getAllUsers
);

module.exports = userRouter;