import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Challenge Backend",
    description: "Documentação"
  },
  host: "localhost:8080",
  basePath: "/api/v1",   
  schemes: ["http"],
  definitions: {
    User: {
      username: "any",
      email: "any",
      cnpj: "any",
      password: "any"
    },
    Item: {
      name: "any",
      description: "any",
      price: 1.00,
      userId: 1
    }
  },
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Digite o token JWT no formato: Bearer {token}"
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app/routes/auth.routes.js", "./app/routes/item.routes.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
