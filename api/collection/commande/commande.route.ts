import { Router } from "express";
import * as passport from "passport";
import { commandeController } from "./commande.controller";

class CommandeRoute {
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
            commandeController.getAll.bind(commandeController),
        )
        .post(commandeController.create.bind(commandeController))
        .put(commandeController.update.bind(commandeController))
        .delete(
            passport.authenticate("jwt", { session: false }),
            commandeController.delete.bind(commandeController),
        );
        this.router.route("/client/:clientId").get(
            passport.authenticate("jwt", { session: false }),
            commandeController.getByClient.bind(commandeController),
        );
        this.router.route("/resto/:restoId").get(
            passport.authenticate("jwt", { session: false }),
            commandeController.getByResto.bind(commandeController),
        );
        this.router.route("/livreur/:livreurId").get(
            passport.authenticate("jwt", { session: false }),
            commandeController.getByLivreur.bind(commandeController),
        );
        this.router
        .route("/:commandeId")
        .get(
            passport.authenticate("jwt", { session: false }),
            commandeController.getById.bind(commandeController),
        )
        .put(commandeController.update.bind(commandeController))
        .delete(
            passport.authenticate("jwt", { session: false }),
            commandeController.delete.bind(commandeController),
        );
    }
}
const commandeRoute = new CommandeRoute();

export const commandeRoutes = commandeRoute.router;
