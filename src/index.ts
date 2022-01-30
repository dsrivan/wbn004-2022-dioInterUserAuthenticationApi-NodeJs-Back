import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 3000;

app.get("/status", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    foo: "Teste ivan",
  });
});

app.listen(PORT, () => console.log(`App rodando na porta ${PORT}`));
