import { Request, Response } from "express";
import SampleModel, {
  add,
  deleteMember,
  findMemberById,
  listMembers,
} from "../models/memberModel";

const addSample = async (req: Request, res: Response) => {
  const {
    name,
    address,
    purpose,
    number,
    medical_condition,
    subscription_date,
  } = req.body;

  const result = await add({
    name,
    address,
    purpose,
    number,
    medical_condition,
    subscription_date,
  });

  console.log("result", result);
  res.json(result);
};

const listSample = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const samples = await listMembers(page, limit);

    res.json(samples);
  } catch (e) {
    console.log(e);
  }
};

const deleteSamples = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("id to be deleted", id);
    const result = await deleteMember(id);
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

const getSampleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("get sample ", id);
    const result = await findMemberById(id);
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

const pagedList = async (req: Request, res: Response) => {
  try {
    const { category = "All", page = 1, limit = 20 } = req.query;

    const filter = category !== "All" ? { category } : {};

    const pageNumber = parseInt(page.toString());
    const limitNumber = parseInt(limit.toString());

    const totalItems = await SampleModel.countDocuments(filter);

    // Now, use the aggregation pipeline to randomly sample and paginate
    const samples = await SampleModel.aggregate([
      { $match: filter },
      { $sample: { size: totalItems } },
      { $skip: (pageNumber - 1) * limitNumber },
      { $limit: limitNumber },
    ]);

    res.json({
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalItems / limitNumber),
      totalItems,
      samples,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching samples." });
  }
};

export default {
  addSample,
  getSampleById,
  listSample,
  pagedList,
  deleteSamples,
};
