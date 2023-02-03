import mongoose, { Schema, Document, Types } from "mongoose";

export interface Store extends Document {
  name: string;
  image: string;
}

const StoreSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Store>("Store", StoreSchema);
