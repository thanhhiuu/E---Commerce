import configDotenv from "dotenv";
import express from "express";
import dbConnect from "./config/dbConnect.js";
import initRouter from "./router/index.js";
const app = express();

configDotenv.config();

const port = process.env.PORT || 9900;

// * Giúp đọc được các kiểu Json
app.use(express.json());

// * Giúp đọc được các kiểu Array (Kiểu Ulr)
app.use(express.urlencoded({ extended: true }));
// Gọi phương thức kết nối mongoDB
dbConnect();

initRouter(app);

app.listen(port, () => {
  console.log("listening on port " + port);
});
