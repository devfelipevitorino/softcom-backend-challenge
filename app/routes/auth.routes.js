import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import {
    checkDuplicateUsernameOrEmailOrCnpj,
    checkRolesExisted,
} from "../middlewares/verifySignUp.js";
 
const router = express.Router();
 
router.post("/signup", [checkDuplicateUsernameOrEmailOrCnpj, checkRolesExisted], signup);
 
router.post("/signin", signin);
 
export default router;