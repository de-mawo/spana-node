import express from "express";
import { createEvent, getAllEvents } from "../controllers/eventControllers";
import {isAdmin} from '../utils/isAuth'

const router = express.Router();



router.route("/").get(isAdmin,getAllEvents).post(createEvent);

export default router;
