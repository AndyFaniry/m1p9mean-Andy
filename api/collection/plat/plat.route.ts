import { Router } from "express";
import * as passport from "passport";
import { platController } from "./plat.controller";

class PlatRoute {
    router: Router;
  
    constructor() {
      this.router = Router();
      this.init();
    }
  
    private init() {
        
        this.router
        .route("/")
        .get(
            passport.authenticate("jwt", { session: false }),
            platController.getAll.bind(platController),
        )
        .post(
            passport.authenticate("jwt", { session: false }),
            platController.create.bind(platController),
            )
        .put(
            passport.authenticate("jwt", { session: false }),
            platController.update.bind(platController)
            )
        .delete(
            passport.authenticate("jwt", { session: false }),
            platController.delete.bind(platController),
        );
        this.router.route("/visible").get(
            passport.authenticate("jwt", { session: false }),
            platController.getVisible.bind(platController),
        );
        this.router.route("/resto/:restoId").get(
            passport.authenticate("jwt", { session: false }),
            platController.getByResto.bind(platController),
        );
        this.router
        .route("/:platId")
        .get(
            passport.authenticate("jwt", { session: false }),
            platController.getById.bind(platController),
        )
        .put(platController.update.bind(platController))
        .delete(
            passport.authenticate("jwt", { session: false }),
            platController.delete.bind(platController),
        );  
    }
}
const platRoute = new PlatRoute();

export const platRoutes = platRoute.router;