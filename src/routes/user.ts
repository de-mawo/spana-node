import express from "express";
import { isAdmin, isUser } from "../utils/isAuth";
import {
  editUser,
  getAllUsers,
  getUserInfo,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(isAdmin, getAllUsers);
router.route("/admin-edit-user").patch(isAdmin, editUser);
router.route("/:email").patch(isUser, getUserInfo);

export default router;
