/*Jag(Katrina) hade problem med att ansluta till MongoDB Atlas på grund av DNS-problem, så jag lade till en funktion för att använda Google DNS om det behövs. 
Om ni får likadana problem så lägg till true i USE_GOOGLE_DNS i er .env-fil. Annars behöver ni inte göra något*/
import dns from "dns";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

if (process.env.USE_GOOGLE_DNS === "true") {
  dns.setServers(["8.8.8.8"]);
  console.log("Using Google DNS for MongoDB");
}

connectDB();