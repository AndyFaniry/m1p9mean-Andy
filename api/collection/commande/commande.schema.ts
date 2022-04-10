import * as mongoose from "mongoose";
import { Commande } from "./commande.interface";
import { PlatTypeSchema } from "../plat/plat.schema";
import { userSchema } from "../user/user.schema";

export interface CommandeDocument
  extends Commande,
    mongoose.Document {}

export const DetailTypeSchema = new mongoose.Schema({
  plat: { type: PlatTypeSchema, required: true },
  qty: { type: Number, required: true },
});

export const CommandeSchema = new mongoose.Schema({
  date: { type: String, required: true },
  etat: { type: String, required: true },
  detail: { type: [DetailTypeSchema], required: true },
  client: { type: userSchema, required: true },
  livreur: { type: userSchema },
  lieu_livraison: { type: String, required: true },
});

export const CommandeModel = mongoose.model<CommandeDocument>(
  "Commande",
  CommandeSchema,
);
