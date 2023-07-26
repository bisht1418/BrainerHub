import { Document, Model, model, Schema } from "mongoose";

export interface IProduct extends Document {
  image: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

const productSchema: Schema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const ProductModel: Model<IProduct> = model<IProduct>("Product", productSchema);

export default ProductModel;
