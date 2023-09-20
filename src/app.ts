import express, { Application } from "express";
// import session from "./config/session";
import dotenv from "dotenv";
import web from "./routes/web";
import auth from "./routes/auth";
import passport from "./config/passport";
import session from "express-session";

dotenv.config();

const app: Application = express();
const port = process.env.APP_PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(session());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(auth);
app.use(web);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
