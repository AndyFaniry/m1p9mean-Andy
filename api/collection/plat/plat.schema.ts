import * as mongoose from "mongoose";
import { PlatType } from "./plat.interface";
import { RestoSchema } from "../resto/resto.schema";

export interface PlatDocument extends PlatType, mongoose.Document {}

export const PlatTypeSchema = new mongoose.Schema({
  resto: { type: RestoSchema, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  pR: { type: Number, required: true },
  pV: { type: Number, required: true },
  visibility: { type: Boolean, required: true },
});


export const PlatModel = mongoose.model<PlatDocument>(
  "Plat",
  PlatTypeSchema,
);
