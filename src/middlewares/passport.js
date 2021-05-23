import User from "./../models/user";
import PassportJwt from "passport-jwt";
const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

export const passport = () => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload._id);
        if (user) return done(null, user);
        else return done(null, false);
      } catch (error) {
        console.log(error);
      }
    })
  );
};
