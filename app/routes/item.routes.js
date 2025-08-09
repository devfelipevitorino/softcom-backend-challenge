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

router.get("/user/itens/:id", [verifyToken], itemFindById);

router.post("/user/itens", [verifyToken], itemCreate);

router.put("/user/itens/:id", [verifyToken], itemUpdate);

router.delete("/user/itens/:id", [verifyToken], itemDelete);

export default router;
