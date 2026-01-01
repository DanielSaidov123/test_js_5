import express from "express";
import {   encrypt } from "../controllers/messages.js";
import { decrypt } from "dotenv";

const router = express.Router();

router.route("/encrypt").post(encrypt ) 
router.route("/decrypt").post( decrypt ) 

 
export default router;

