const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const {
  createUser,
  getUserByEmail,
  getUserByGoogleId,
  getUserById,
  updateUser,
} = require("../data/userRepository");

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user ? { id: user.id, email: user.email } : null);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value?.toLowerCase();
      try {
        let user = await getUserByGoogleId(profile.id);

        if (!user && email) {
          user = await getUserByEmail(email);
          if (user && !user.googleId) {
            user = await updateUser(user.id, { googleId: profile.id });
          }
        }

        if (!user) {
          user = await createUser({
            googleId: profile.id,
            fullName: profile.displayName,
            email,
            passwordHash: null,
          });
        }

        return done(null, { id: user.id, email: user.email });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
