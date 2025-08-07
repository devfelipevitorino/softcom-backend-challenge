import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Funcionando..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);

const PORT = process.env.PORT || 8080;

db.sequelize.sync({ force: false }).then(() => {
    console.log("Sincronização do banco concluída!");
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
