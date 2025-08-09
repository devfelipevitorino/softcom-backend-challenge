import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import {
    checkDuplicateUsernameOrEmailOrCnpj,
    checkRolesExisted,
} from "../middlewares/verifySignUp.js";
 
const router = express.Router();

router.post("/auth/sign_up", [checkDuplicateUsernameOrEmailOrCnpj, checkRolesExisted], signup);
 
router.post("/auth/sign_in", signin);
 
export default router;