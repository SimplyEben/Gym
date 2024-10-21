import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: { type: String, require: true },
  address: { type: String, require: true },
  purpose: { type: String, require: true },
  number: { type: String, require: true },
  medical_condition: { type: String },
  subscription_date: { type: Date, default: Date.now },
  date_create: { type: Date, default: Date.now },
});

const MemberModel = mongoose.model("Member", MemberSchema);

export const add = (value: Record<string, any>) =>
  new MemberModel(value).save().then((Member) => Member.toObject());

export const getMembers = () => MemberModel.find();

export const listMembers = (page: number = 1, limit: number = 20) =>
  MemberModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

export const deleteMember = (id: string) =>
  MemberModel.findByIdAndDelete(id).exec();

export const findMemberById = (id: string) => MemberModel.findById(id);

export default MemberModel;
