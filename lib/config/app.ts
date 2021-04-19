import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/common_routes";
import { UserRoutes } from "../routes/user_routes";
import envronment from "../envronment";
import * as dotenv from "dotenv";

dotenv.config();

class App {
  public app: express.Application;
  public mongoUrl: string =
    `${process.env.URI_DB}` +
    envronment.getDBName() +
    "?retryWrites=true&w=majority";
  private test_routes: TestRoutes = new TestRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();
  private user_routes: UserRoutes = new UserRoutes();
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.test_routes.route(this.app);
    this.common_routes.route(this.app);
    this.user_routes.route(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
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
export default new App().app;
