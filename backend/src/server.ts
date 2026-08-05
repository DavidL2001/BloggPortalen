import dns from "dns";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";
import postRoutes from "./routes/postRoutes";

dotenv.config();

/*
Katrina hade problem med att ansluta till MongoDB Atlas på grund av DNS-problem.
Om samma problem uppstår kan USE_GOOGLE_DNS=true läggas till i .env-filen.
Annars behöver inget ändras.
*/
if (process.env.USE_GOOGLE_DNS === "true") {
  dns.setServers(["8.8.8.8"]);
  console.log("Using Google DNS for MongoDB");
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);
app.use("/api/posts", postRoutes);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();