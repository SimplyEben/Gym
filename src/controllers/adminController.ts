import { Request, Response } from "express";
import { addPrice, findByTag, findPrices,updatePrice } from "../models/adminModel";

const createPrice = async (req: Request, res: Response) => {
  const { tag, amount } = req.body;

  try {
    if (!tag || !amount) {
      return res
        .status(400)
        .json({ msg: "tag or amount of price model can't be null" });
    }

    const results = await addPrice({ tag, amount });

    res.json(results);
  } catch (e) {
    console.error("create price => Service error whiles creating tag");
    res.status(500).json({ msg: "Service error whiles creating tag" });
  }
};

const getPrices = async (req: Request, res: Response) => {
  try {
    const results = await findPrices();

    res.json(results);
  } catch (e) {
    console.error("get price => server error whiles fetching");
    res.status(500).json({ msg: "Service error whiles creating tag" });
  }
};

const getByTag = async (req: Request, res: Response) => {
  try {
    const { tag } = req.params;

    if (!tag) {
      res.status(400).json({ msg: "Tag must be passed as a path variable " });
    }

    const result = await findByTag(tag);

    res.json(result);
  } catch (e) {
    console.error("get price by tag ");
    res.status(500).json({ msg: "Service error whiles getting price by tag" });
  }
};

const updatePriceB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, tag } = req.body;

    if (!id)
      res.status(400).json({ msg: "Id must be passed when doing an update" });

    const result = await updatePrice(id,{amount,tag});

    res.json(result)

  } catch (e) {
    console.error("update price error");
    res.status(500).json({ msg: "Service error whiles udpating price" });
  }
};

export default { createPrice, getPrices, getByTag,updatePriceB };
