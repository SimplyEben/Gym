import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
  amount: { type: Number, require: true },
  tag: { type: String, require: true, unique: true },
});

export const PriceModel = mongoose.model("Price", PriceSchema);

export const addPrice = (value: Record<string, any>) =>
  new PriceModel(value).save().then((sample) => sample.toObject());

export const findPrices = () => PriceModel.find();

export const findByTag = (tag: string) => PriceModel.where("tag", tag).findOne();

export const updatePrice = (id: string, value: Record<string, any>) =>
  PriceModel.findByIdAndUpdate(id, value, { new: true, runValidators: true });
