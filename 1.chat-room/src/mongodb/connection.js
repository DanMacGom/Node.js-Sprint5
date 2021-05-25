const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../.env") });

mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/ChatApp`,
    { 
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, 
        useFindAndModify: false, autoIndex: true 
    },
    (err) => {
        if (err) {
            console.log(err);
        }

        console.log("Connected to mongodb!");
    }
);
