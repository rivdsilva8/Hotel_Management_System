import express from "express";
const app = express();
import session from "express-session";
import configRoutes from "./routes/RoutesIndex.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + "/public");

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "AuthState",
    secret: "secret session",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
    //cookie: { secure: false },
  })
);
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    helpers: {
      eq: (v1, v2) => v1 === v2,
      isSelected: function (code, phonePrefix) {
        return code === phonePrefix ? 'selected ="selected"' : "";
      },
    },
  })
);
app.set("view engine", "handlebars");

//if user is admin, never let them see login and register
app.use("/login", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    }
  }
  next();
});

app.use("/register", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    }
  }
  next();
});

//if user is staff, never let them see login and register
app.use("/login", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "staff") {
      return res.redirect("/staff");
    }
  }
  next();
});

app.use("/register", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "staff") {
      return res.redirect("/staff");
    }
  }
  next();
});

//if user is guest, never let them see login and register
app.use("/login", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "user") {
      return res.redirect("/guest");
    }
  }
  next();
});

app.use("/register", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "user") {
      return res.redirect("/guest");
    }
  }
  next();
});

//if you are not an admin send to homescreen
app.use("/admin", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role != "admin") {
      console.log("you are not a admin! redirecting to home");
      return res.redirect("/");
    }
  }
  next();
});
//if you are not a staff send to homescreen
app.use("/staff", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role != "staff") {
      console.log("you are not a staff! redirecting to home");
      return res.redirect("/");
    }
  }
  next();
});

//if you are not a guest send to homescreen
app.use("/guest", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role != "user") {
      console.log("you are not a guest! redirecting to home");
      return res.redirect("/");
    }
  }
  next();
});

//if trying to access guest,admin or staff unauthenticated - send back to login
app.use("/admin", (req, res, next) => {
  if (!req.session.user) {
    console.log("you are not an admin! redirecting to login");
    return res.redirect("/login");
  }
  next();
});

app.use("/staff", (req, res, next) => {
  if (!req.session.user) {
    console.log("you are not a staff! redirecting to login");
    return res.redirect("/login");
  }
  next();
});

app.use("/guest", (req, res, next) => {
  if (!req.session.user) {
    console.log("you are not a guest! redirecting to login");
    return res.redirect("/login");
  }
  next();
});

//middleware to log all requests
app.use("/", (req, res, next) => {
  if (req.originalUrl === "/favicon.ico") {
    return next();
  }

  if (req.originalUrl.startsWith("/public")) {
    return next();
  }

  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${
      req.session.user ? "Authenticated User" : "Non-Authenticated User"
    })`
  );

  next();
});

app.use("/logout", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
