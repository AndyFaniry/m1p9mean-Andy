import { Resto } from "../resto/resto.interface";

export interface PlatType {
    _id?: any;
    resto: Resto,
    code: String;
    name: String;
    pR: Number;
    pV: Number;
    visibility: Boolean;
  }
  