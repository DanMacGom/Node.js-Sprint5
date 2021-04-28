const usersRouter = require("express").Router();

const viewsController = require("../controllers/viewsController");
const usersController = require("../controllers/usersController.js");

usersRouter.get("/", viewsController.renderAuthentication);
usersRouter.post("/login", usersController.logInUser);
usersRouter.post("/signup", usersController.createUser);

module.exports = usersRouter;