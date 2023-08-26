import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "router";

require("dotenv").config(); // env 접근하기 위해 필요.

const app = express();

app.use(
  cors({
    credentials: true, // 자격 증명이 true 인 것처럼
  })
);

app.use(compression()); // 인증을 구현하는 방법에 대해 앱이 압축을 사용하는지 확인
app.use(cookieParser()); // 쿠키 사용하는지 확인
app.use(bodyParser.json()); // Json 형식의 본문 브라우저를 사용하는지 확인

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise; // mongoose.Promise가 전역 Js Promise와 동일하도록 함.
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/", router());