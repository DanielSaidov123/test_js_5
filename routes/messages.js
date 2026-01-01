import express from "express";
import { createmessage, masseg } from "../controllers/messages.js";

const router = express.Router();

router.route("/encrypt").post(createmessage ) 
router.route("/decrypt").post(masseg ) 

 
export default router;

