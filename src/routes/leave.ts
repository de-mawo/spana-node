import express from "express";
import { isAdmin, isUser } from "../utils/isAuth";
import {
  createLeave,
  editLeave,
  getAllLeaveDays,
} from "../controllers/leaveController";

const router = express.Router();

router.route("/").get(isAdmin, getAllLeaveDays).post(isUser, createLeave);

router.route("/:id").patch(isAdmin, editLeave);

export default router;
