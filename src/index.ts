import express, { Request, Response, NextFunction } from "express";
import usersRoute from "./routes/users.route";

const app = express();
const PORT = 3000;

app.use(usersRoute);

app.listen(PORT, () => console.log(`App rodando na porta ${PORT}`));
