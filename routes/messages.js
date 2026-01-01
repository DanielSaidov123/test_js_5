import express from "express";
import { createmessage } from "../controllers/messages.js";

const router = express.Router();

router.route("/encrypt").post(createmessage ) 
 
export default router;

