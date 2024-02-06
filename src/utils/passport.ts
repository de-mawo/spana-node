import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    //   passReqToCallback: true,
    },
    function ( accessToken, refreshToken, profile, cb ) {
        console.log(profile);
        
    }
  )
);

export default passport;