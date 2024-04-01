import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
} from "../controllers/eventControllers";
import { isAdmin } from "../utils/isAuth";

const router = express.Router();

router.route("/").get(isAdmin, getAllEvents).post(isAdmin, createEvent);
router.route("/:id").patch(isAdmin, deleteEvent);

export default router;
