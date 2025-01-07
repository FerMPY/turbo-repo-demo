import express from "express";
import cors from "cors";
import Routes from "./routes/index.js";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/", Routes);

app.listen(PORT, () => {
  console.log(`Inventory service running on port ${PORT}`);
});
