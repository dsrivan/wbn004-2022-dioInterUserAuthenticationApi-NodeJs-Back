import express from "express";
import errorHandler from "./middleware/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de rotas
app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

// Configurações do Handler de Erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(process.env.PORT, () =>
  console.log(`App rodando na porta ${process.env.PORT}`)
);
