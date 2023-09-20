import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import { db } from "./db";
import { users } from "../schema/user";
import { eq } from "drizzle-orm";

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0].value as string;
      const user = await db.select().from(users).where(eq(users.email, email));

      if (user.length === 0) {
        await db.insert(users).values({
          name: profile.displayName,
          email: email,
          password: "",
          avatar: profile.photos?.[0].value,
        });
      }

      done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: any, done) => {
  done(null, user);
});

export default passport;
