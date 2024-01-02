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

// ! Việc gọi initRouter giúp khởi tạo hệ thống routing của app
// ! Cũng như việc truyền app vào initRouter giúp ta có thể sử dụng đối tượng app để sử dụng hệ thống routing bên trong initRouter
initRouter(app);

app.listen(port, () => {
  console.log("listening on port " + port);
});
