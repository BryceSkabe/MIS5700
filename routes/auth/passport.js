const { verifyPassword, hashPassword } = require("../utils/utils.js");

const { sqlFetch } = require("../utils/utils.js");


// Modified from this tutorial: https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// config/passport.js

// load all the things we need
var LocalStrategy = require("passport-local").Strategy;

async function findByEmail(email) {
  const users = await sqlFetch`SELECT * From users WHERE email = ${email}`;
  const user = users[0];
  return user;
}

async function saveUser({ email, hash, salt, iterations, displayName }) {
  const users = await sqlFetch`
		INSERT INTO users
			( -- columns to insert data into
			[email], [hash], [salt], [iterations], [displayName], [isAdmin]
			)
		VALUES
			( -- first row: values for the columns in the list above
					${email}, ${hash}, ${salt}, ${iterations}, ${displayName}, ${false}
			)
		SELECT id FROM users WHERE ID = @@IDENTITY`;
  const user = users[0];
  return user;
}

// expose this function to our app using module.exports
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    try {
      const users = await sqlFetch`SELECT * From users WHERE id = ${id}`;
      const user = users[0];
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // passport signup strategy
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // the name attribute of your input types in your form
        // need to match these "email" and "password"
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      async function(req, email, password, done) {
        if (req.body.password !== req.body.passwordConfirmation) {
          done(
            null,
            false,
            req.flash(
              "signupMessage",
              "The password and confirmation do not match."
            )
          );
        }

        if (!req.body.displayName || req.body.displayName.length <= 0) {
          done(
            null,
            false,
            req.flash("signupMessage", "The display name must be provided.")
          );
        }
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        const user = await findByEmail(email);

        // check to see if theres already a user with that email
        if (user) {
          return done(
            null,
            false,
            req.flash("signupMessage", "That email is already taken.")
          );
        } else {
          const { hash, salt, iterations } = await hashPassword(password);
          // if there is no user with that email
          // create the user
          // the user will be updated with the new id
          // by the call to saveUser
          var newUser = await saveUser({
            email,
            hash,
            salt,
            iterations,
            displayName: req.body.displayName
          });

          return done(null, newUser);
        }
      }
    )
  );

  // passport local strategy
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // the name attribute of your input types in your form
        // need to match these "email" and "password"
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      async function(req, email, password, done) {
        // get the user by email
        const user = await findByEmail(email);
        // if no user is found, return the message
        if (!user)
          return done(
            null,
            false,
            req.flash("loginMessage", "No user found with that email.")
          ); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (
          !(await verifyPassword(
            user.hash,
            user.salt,
            user.iterations,
            password
          ))
        )
          return done(
            null,
            false,
            req.flash("loginMessage", "Oops! Wrong password.")
          ); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        console.log("You signed in.");
        return done(null, user);
      }
    )
  );
};
