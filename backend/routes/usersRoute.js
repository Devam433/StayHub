import express from "express";
import { signIn, signUp } from "../controllers/userController.js";

const router = express.Router();

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)

router.route()
export default router;