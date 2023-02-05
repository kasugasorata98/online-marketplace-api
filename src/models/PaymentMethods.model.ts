import mongoose, { Schema, Document } from "mongoose";

export interface PaymentMethod extends Document {
  name: string;
}

const paymentMethodSchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<PaymentMethod>(
  "PaymentMethod",
  paymentMethodSchema
);
