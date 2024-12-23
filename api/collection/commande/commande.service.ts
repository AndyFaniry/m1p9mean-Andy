import { User } from "../user/user.interface";
import { Commande } from "./commande.interface";
import { CommandeModel } from "./commande.schema";

class CommandeService {
  async getAll(): Promise<Commande[] | null> {
    return CommandeModel.find().exec();
  }
  async create(item: Commande): Promise<Commande> {
    return CommandeModel.create(item);
    }  
    async getById(id: string): Promise<Commande | null> {
        return CommandeModel.findById(id).exec();
    }
    async delete(id: string): Promise<boolean> {
        return CommandeModel.deleteOne({ _id: id }).then(() => true);
    }
    async update(item: Commande): Promise<Commande | null> {
        return CommandeModel
          .findByIdAndUpdate(item._id, item, { new: true })
          .exec();
    }
    async getByClient(login: string): Promise<Commande[] | null> {
        return CommandeModel.find({"client.login":login}).exec();
    }
    async getByResto(login: string): Promise<Commande[] | null> {
        return CommandeModel.find({"detail.plat.user.login":login,"etat":{$in:["commande","en cours"]}}).exec();
    }
    async getByLivreur(login: string): Promise<Commande[] | null> {
        return CommandeModel.find({"livreur.login":login}).exec();
    }
    async getOrderNotDelivered(id: string): Promise<Commande[] | null> {
        return CommandeModel.find({"livreur._id":id, "etat": false}).exec();
    }
    async deliver(item: Commande): Promise<Commande | null> {
        return CommandeModel
          .findByIdAndUpdate(item._id, item, { new: true })
          .exec();
    }
}

export const commandeService = new CommandeService();
