import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_ORIGIN,  // production frontend
    "http://localhost:5173"     // local frontend
  ],
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "x-admin-password"]
}));

app.use(express.json());

// Routes
app.use("/api/forms", formRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error(err));

