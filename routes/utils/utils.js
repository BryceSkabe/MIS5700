const crypto = require("crypto");
const sql = require("mssql");

// route middleware to make sure a user is logged in
module.exports.isLoggedIn = function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the login page
  req.flash("error", "You must be logged in to visit that page.");
  res.redirect("/login");
};

//this sqlfetch module is moved from the core routes/api.js file
module.exports.sqlFetch = async (...args) => {
  try {
    const result = await sql.query(...args);
    const resultingRows = result.recordsets[0];
    return resultingRows;
  } catch (err) {
    const err2 = new Error(
      "Something went wrong with that last sql query. View the call stack here and more details in the next error:"
    );
    console.error(err2.message);
    console.log(err2.stack);
    throw err;
  }
};

function pbkdf2(password, salt, iterations) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) {
          // reject the promise so the .catch will fire.
          return reject(err);
        }
        // resolve the promise so the .then will fire.
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

/**
 * https://stackoverflow.com/a/17201493/2066736
 * @param {string} password
 * @returns {Promise<{salt: string, hash: string, iterations: }>}
 */
module.exports.hashPassword = async password => {
  var salt = crypto.randomBytes(128).toString("base64");
  var iterations = 100000;
  const hash = await pbkdf2(password, salt, iterations);
  return {
    salt: salt,
    hash: hash,
    iterations: iterations
  };
};

/**
 * https://stackoverflow.com/a/17201493/2066736
 * @param {string} savedHash
 * @param {*} savedSalt
 * @param {*} savedIterations
 * @param {*} passwordAttempt
 */
module.exports.verifyPassword = async function verifyPassword(
  savedHash,
  savedSalt,
  savedIterations,
  passwordAttempt
) {
  return (
    savedHash == (await pbkdf2(passwordAttempt, savedSalt, savedIterations))
  );
};