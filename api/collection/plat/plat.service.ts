
import { Resto } from "../resto/resto.interface";
import { PlatType } from "./plat.interface";
import { PlatModel } from "./plat.schema";

class PlatService {
    async getAll(): Promise<PlatType[] | null> {
        return PlatModel.find().exec();
    }
    async create(item: PlatType): Promise<PlatType> {
    return PlatModel.create(item);
    }  
    async getById(id: string): Promise<PlatType | null> {
        return PlatModel.findById(id).exec();
    }
    async delete(id: string): Promise<boolean> {
        return PlatModel.deleteOne({ _id: id }).then(() => true);
    }
    async update(item: PlatType): Promise<PlatType | null> {
        return PlatModel
          .findByIdAndUpdate(item._id, item, { new: true })
          .exec();
    }
    async getByResto(id: string): Promise<PlatType[] | null> {
        return PlatModel.find({"resto.lastName":id}).exec();
    }
    async getVisible(): Promise<PlatType[] | null> {
        return PlatModel.find({visibility:true}).exec();
    }
}

export const platService = new PlatService();