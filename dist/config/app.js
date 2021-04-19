"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const test_routes_1 = require("../routes/test_routes");
const common_routes_1 = require("../routes/common_routes");
const user_routes_1 = require("../routes/user_routes");
const envronment_1 = require("../envronment");
class App {
    constructor() {
        this.mongoUrl = "mongodb+srv://admin:admin@cluster0.4susw.mongodb.net/" +
            envronment_1.default.getDBName() +
            "?retryWrites=true&w=majority";
        this.test_routes = new test_routes_1.TestRoutes();
        this.common_routes = new common_routes_1.CommonRoutes();
        this.user_routes = new user_routes_1.UserRoutes();
        this.app = express();
        this.config();
        this.mongoSetup();
        this.test_routes.route(this.app);
        this.common_routes.route(this.app);
        this.user_routes.route(this.app);
        console.log(this.mongoUrl);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose
            .connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
            .then((_res) => console.log("success connect mongo!"));
    }
}
exports.default = new App().app;
