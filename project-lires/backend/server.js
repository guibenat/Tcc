import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import librasRoutes from "./routes/libras.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API Libras está rodando!");
});

app.use("/api/libras", librasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
