import express from "express";
import { createuser, getUser } from "../controllers/users.js";

const router = express.Router();

router.route("/register").post(createuser ) 
router.route("/me").get( getUser) 

 
export default router;

