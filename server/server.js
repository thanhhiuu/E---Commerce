import configDotenv from "dotenv";
import express from "express";
const app = express();

configDotenv.config();

const port = process.env.PORT || 9900;

// * Giúp đọc được các kiểu Json
app.use(express.json());

// * Giúp đọc được các kiểu Array (Kiểu Ulr)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
