import express from "express";
import {   decrygetAll, decryptt, encrypt } from "../controllers/messages.js";

const router = express.Router();

router.route("/").get(decrygetAll ) 
router.route("/encrypt").post(encrypt ) 
router.route("/decrypt").post( decryptt ) 
 
export default router;

