const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./configuration/index");
const User = require("./models/user");

// Json Web Token Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    async (jwt_payload, done) => {
      try {
        // Find user in specified token
        const user = await User.findById(jwt_payload.sub);

        // If user doesn't exists, handle it
        if (!user) return done(null, false);

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        // Find the user with email
        const user = await User.findOne({ email });

        // If not, handle it
        if (!user) return done(null, false);

        // Check if the password is correct
        const isValid = await user.isValidPassword(password);

        // If not, handle it
        if (!isValid) return done(null, false);

        // Otherwise, return the user
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
