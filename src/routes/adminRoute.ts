import express from "express";
import controller from "../controllers/adminController";

const router = express.Router();

router.route("/add").post(controller.createPrice);

router.route("/index").get(controller.getPrices);

router.route("/view/:tag").get(controller.getByTag)

router.route("/edit/:id").patch(controller.updatePriceB)

export default router