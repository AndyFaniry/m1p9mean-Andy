import { PlatType } from "../plat/plat.interface";
import { User } from "../user/user.interface";

export interface DetailType {
  plat: PlatType;
  qty: Number;
}

export interface Commande {
  _id?: any;
  date: String;
  etat: String;
  detail: DetailType[];
  client: User;
  livreur: User;
  lieu_livraison: String;
}
