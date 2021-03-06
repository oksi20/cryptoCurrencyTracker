const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// библиотека для логирования
const morgan = require("morgan");
// библиотека для парсинга куки
const cookieParser = require("cookie-parser");
// библиотека для сессий
const session = require("express-session");
// модуль для работы с путями в файловой системе
const path = require("path");
// импорт класса для хранения сессий
const MongoStore = require("connect-mongo");

const bcrypt = require("bcrypt");
// импорт middleware для проверки сессий
require('dotenv').config();
const mongoUrl = process.env.DB_URL;
const PORT = process.env.PORT || 8000;

const userRouter=require('./routers/userRouter')
const cartRouter=require('./routers/cartRouter')
const statsRouter=require('./routers/statsRouter')
const app = express();

const buildHtml=path.resolve(__dirname, "../front/build/index.html");
const buildStatic=path.resolve(__dirname, "../front/build/");

app.use(express.static(buildStatic));
app.use(morgan("dev"));

function cookiesCleaner(req, res, next) {
  // если куки есть и нет текущей сессии, то чистим куки
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
}

const sessionChecker = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

// const PORT = 8000;

app.use(
  cors({
    // origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const options = {
  store: MongoStore.create({ mongoUrl:mongoUrl}),
  // ключ
  key: "user_sid",
  secret: "anything here",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // срок жизин куки
    expires: 1000 * 60 * 10,
  },
};
// подключаем middleware для использования сессий
const sessionMiddleware = session(options);

app.use(sessionMiddleware);
// подключаем middleware для чистки куки
app.use(cookiesCleaner);


// app.use("/:id/shoppingcart", cryptoRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/statistic",statsRouter)
app.use("/api/v1/", userRouter );

app.get("*", (req, res)=>{
res.sendFile(buildHtml);
})





app.listen(PORT, async () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("sucsess connect to mongoose"))
    .catch(() => console.log("error connect to mongoose"));
  console.log(`Server started at port:${PORT}`);
});
// "mongodb://localhost:27017/crypto"
// "mongodb://localhost:27017/crypto"
