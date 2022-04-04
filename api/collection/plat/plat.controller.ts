import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller/controller-read.interface";
import { ControllerWrite } from "../../common/controller/controller-write.interface";
import { wrapToSendBackResponse } from "../../shared/wrap-to-send-back-response";
import { PlatType } from "./plat.interface";
import { platService } from "./plat.service";

class PlatController implements ControllerRead, ControllerWrite {

    getAll(req: Request, res: Response, next: NextFunction): void {
        wrapToSendBackResponse<PlatType[] | null>(
          platService.getAll(),
          res,
          next,
        );
    }
    getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<PlatType | null>(
      platService.getById(req.params.PlatTypeId),
      res,
      next,
    );
  }
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<PlatType>(
      platService.create(req.body),
      res,
      next,
    );
  }
  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      platService.delete(req.params.platId),
      res,
      next,
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<PlatType | null>(
      platService.update(req.body),
      res,
      next,
    );
  }
    getByResto(req: Request, res: Response, next: NextFunction): void {
      wrapToSendBackResponse<PlatType[] | null>(
        platService.getByResto(req.params.restoId),
        res,
        next,
      );
  }
}

export const platController = new PlatController();