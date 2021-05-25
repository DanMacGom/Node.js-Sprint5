const usersController = require("../controllers/usersController");

const userRouter = require("express").Router();

userRouter.get(
    "/", 
    usersController.getAllUsers
);
userRouter.delete(
    "/:userId", 
    usersController.deleteUser
);

module.exports = userRouter;