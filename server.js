import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import itemRoutes from "./app/routes/item.routes.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const app = express();

const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("./swagger-output.json"), "utf-8")
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Funcionando..." });
});

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", itemRoutes);

const PORT = process.env.PORT || 8080;

const initial = async () => {
  const Role = db.role; 
  const count = await Role.count();

  if (count === 0) {
    await Role.bulkCreate([
      { name: "user" },
      { name: "admin" },
      { name: "moderator" }
    ]);
    console.log("Funções padrão criadas com sucesso.");
  }
};

db.sequelize.sync({ force: false }).then(() => {
    console.log("Sincronização do banco concluída!");
    initial();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
          console.log(`Documentação em http://localhost:${PORT}/api-docs`);
    });
});
