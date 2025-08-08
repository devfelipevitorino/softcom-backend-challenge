import express from "express";
import { itensList } from "../controllers/item.controller.js";

import {
    verifyToken
} from "../middlewares/authJwt.js";

const router = express.Router(); 

router.get("/user/itens", [verifyToken], itensList);

export default router;