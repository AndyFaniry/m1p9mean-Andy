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
  delivery_man: User;
  delivery_price: Number;
  delivery_place: String;
}
