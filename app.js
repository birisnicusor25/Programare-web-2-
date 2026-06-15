require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const logger = require("./middleware/logger");

const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/teams");
const taskRoutes = require("./routes/tasks");

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectat"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || "fallback",
  resave: false,
  saveUninitialized: false
}));

app.use(logger);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", authRoutes);
app.use("/teams", teamRoutes);
app.use("/", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server pe port", PORT));