import { User } from "../user/user.interface";
import { Resto } from "./resto.interface";
import { RestoModel } from "./resto.schema";
import * as bcrypt from "bcrypt";
import { mailService } from "../../shared/mail/mail.service";
import { mailRenderService } from "../../shared/mail/mail-render.service";
import { userService } from "../user/user.service";
import { userModel } from "../user/user.schema";

class RestoService {
    async getAll(): Promise<Resto[] | null> {
        return RestoModel.find().exec();
    }
    async create(item: Resto): Promise<Resto> {
        var mdp = 'restaurant@'+(item.user.lastName).split(" ",1);
        item.user.password = await bcrypt.hash(mdp, 10);
        const resto = (await RestoModel.create(item)) as Resto;
        await this.sendSignupSuccessMail(resto.user,mdp);
        await userService.create(item.user);
        return resto;
    }  
    async getById(id: string): Promise<Resto | null> {
        return RestoModel.findById(id).exec();
    }
    async delete(idResto: string): Promise<boolean> {
       await this.getById(idResto).then((res)=>{
            userService.deleteByLogin(res.user.login).then(()=>true)   
        });
        return RestoModel.deleteOne({ _id: idResto }).then(() => true);
    }
    async update(item: Resto): Promise<Resto | null> {
        userService.updateByLogin(item.user);
        return RestoModel
          .findByIdAndUpdate(item._id, item, { new: true })
          .exec();
    }
    async sendSignupSuccessMail(user: User,mdp: string) {
        await mailService.sendMail({
          content: await mailRenderService.renderCreateSuccess(user,mdp),
          subject: `E-Kaly enregistrement restaurant: ${user.lastName} `,
          to: user.login,
        });
      }
}

export const restoService = new RestoService();