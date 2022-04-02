import * as express from "express";
import { Server } from "http";
import passport from "./app.authentication";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import { appRoutes } from "./app.routes";
export class App {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
  }

  public init(port: number): Server {
    this.app.use(passport.initialize());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.initRoutes();
    return this.app.listen(port, () => {
      console.log(`app started, listening on port ${port}`);
    });
  }

  private initRoutes() {
    this.app.use("/api/v1", appRoutes);
  }
}

export const app = new App();
