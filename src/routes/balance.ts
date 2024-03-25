import express from "express";
import { isAdmin } from "../utils/isAuth";
import { createBalance, editBalance, getAllBalances } from "../controllers/balanceController";

const router = express.Router();

router.route("/").get(isAdmin, getAllBalances).post(isAdmin, createBalance);

router
.route('/:id')
.patch(isAdmin, editBalance);

export default router;
