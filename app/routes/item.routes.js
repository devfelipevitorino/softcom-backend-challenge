import express from "express";
import { 
    itensList,
    itemFindById,
    itemCreate,
    itemUpdate,
    itemDelete
} from "../controllers/item.controller.js";

import { verifyToken } from "../middlewares/authJwt.js";

const router = express.Router(); 

router.get("/user/itens", [verifyToken], itensList);

router.get("/user/item/:id", [verifyToken], itemFindById);

router.post("/user/item", [verifyToken], itemCreate);

router.put("/user/item/:id", [verifyToken], itemUpdate);

router.delete("/user/item/:id", [verifyToken], itemDelete);

export default router;
