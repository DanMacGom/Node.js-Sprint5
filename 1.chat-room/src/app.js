const express = require('express');
const path = require("path");
const gal = require('google-auth-library');
const dotenv = require("dotenv");
const cookies = require("cookie-parser");

dotenv.config({ path: path.resolve("../../.env") });

const usersRouter = require("./routes/usersRoutes");
const chatroomsRouter = require("./routes/chatroomsRoutes");
const loginRouter = require("./routes/loginRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookies());

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '../src/views'))
app.use(express.static(path.resolve(__dirname, '../public')));

app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/chatrooms", chatroomsRouter);

module.exports = app;