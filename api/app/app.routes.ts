import { Router } from "express";
import { commandeRoutes } from "../collection/commande/commande.route";
import { platRoutes } from "../collection/plat/plat.route";
import { restoRoutes } from "../collection/resto/resto.route";
import { userRoutes } from "../collection/user/user.route";

class AppRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get("/api-status", (req, res) =>
      res.json({ status: "API is OK" }),
    );
    this.router.use("/user", userRoutes);
    this.router.use("/commande", commandeRoutes);
    this.router.use("/resto", restoRoutes);
    this.router.use("/plat", platRoutes);
  }
}

const appRouter = new AppRouter();
export const appRoutes = appRouter.router;
