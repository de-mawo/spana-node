import express from "express";
import { createEvent, getAllEvents } from "../controllers/eventControllers";

const router = express.Router();

router.route("/").get(getAllEvents).post(createEvent);

export default router;
