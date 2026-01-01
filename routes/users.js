import express from "express";
import { createuser } from "../controllers/users.js";

const router = express.Router();

router.route("/register").post(createuser ) 
 
export default router;

