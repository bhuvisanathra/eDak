import express from "express";
import { registerController } from "../controllers/registerController.js";
import { activationController } from "../controllers/activationController.js";
import { loginController } from "../controllers/loginController.js";
import { forgotPasswordController } from "../controllers/forgotPasswordController.js";
import { resetPasswordController } from "../controllers/resetPasswordController.js";
//import { googleLoginController } from "../controllers/googleLoginController.js";
import { validRegister, validLogin, forgotPasswordValidator, resetPasswordValidator } from "../helpers/valid.js";

const router = express.Router();

router.post("/register", validRegister, registerController);
router.post("/login", validLogin, loginController);
router.post("/activate", activationController);
router.put("/password/forgot", forgotPasswordValidator, forgotPasswordController);
router.put("/password/reset", resetPasswordValidator, resetPasswordController);
//router.post("/googlelogin", googleLoginController);

export default router;