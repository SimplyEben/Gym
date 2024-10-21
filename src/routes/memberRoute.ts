import express from "express";
import sampleController from "../controllers/memberController";

const router = express.Router();

router.route("/add").post(sampleController.addSample);

router.route("/index").get(sampleController.pagedList)

router.route("/delete/:id").delete(sampleController.deleteSamples)

router.route("/view/:id").get(sampleController.getSampleById)

export default router;
