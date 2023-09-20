import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const sessionConfig = () => {
  return session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  });
};

export default sessionConfig;
