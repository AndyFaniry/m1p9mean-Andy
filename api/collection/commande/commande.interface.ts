import { PlatType } from "../plat/plat.interface";
import { User } from "../user/user.interface";

export interface DetailType {
  plat: PlatType;
  qty: Number;
}

export interface Commande {
  _id?: any;
  date: Date;
  etat: Boolean;
  detail: DetailType[];
  client: User;
  livreur: User;
  prix_livraison: Number;
  lieu_livraison: String;
}
