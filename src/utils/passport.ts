import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

const extractEmail = (profile: Profile): string | null => {
  if (profile.emails && profile.emails.length > 0) {
    return profile.emails[0].value;
  } else {
    return null;
  }
};

const extractImage = (profile: Profile): string | null => {
  if (profile.photos && profile.photos.length > 0) {
    return profile.photos[0].value;
  } else {
    return null;
  }
};

type User = {
  id?: string;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
      //   passReqToCallback: true,
    },
    async function (accessToken, refreshToken, profile, done) {

      console.log(profile);
      
      const email = extractEmail(profile) as string;
      const image = extractImage(profile);

      try {
        const userExist = await prisma.user.findUnique({
          where: {
            googleId: profile.id,
          },
        });

        if (!userExist) {
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              image,
              googleId: profile.id,
            },
          });
          done(null, newUser);
        } else {
          done(null, userExist);
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    done(null, checkUser);
  } catch (error) {}
});

export default passport;
