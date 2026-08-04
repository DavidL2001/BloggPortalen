/*Jag(Katrina) hade problem med att ansluta till MongoDB Atlas på grund av DNS-problem, så jag lade till en funktion för att använda Google DNS om det behövs. 
Om ni får likadana problem så lägg till true i USE_GOOGLE_DNS i er .env-fil. Annars behöver ni inte göra något*/
import dns from "dns";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import path from "path";
import express from "express";
dotenv.config();

import postRoutes from "./routes/postRoutes";

const app = express();
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

const PORT = process.env.PORT || 5000;

//TEST
app.get("/api/test", (req, res) => {
  res.json({
    message: "BloggPortalen API works!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (process.env.USE_GOOGLE_DNS === "true") {
  dns.setServers(["8.8.8.8"]);
  console.log("Using Google DNS for MongoDB");
}

connectDB();