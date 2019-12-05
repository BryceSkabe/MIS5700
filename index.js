// this looks for .env file in root of project.
// this require should be the first thing in the file
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const indexRoutes = require("./routes/index.js");
const apiRoutes = require("./routes/api.js");
var expressLayouts = require("express-ejs-layouts");
const sql = require("mssql");

// order matters
// Setup ejs as view engine we need the 'ejs' npm module for this
app.set("view engine", "ejs");
// Express-ejs-layouts handles doing layout files and has
// other nice templating features.
app.use(expressLayouts);

app.use("/", indexRoutes);
app.use("/api", apiRoutes);
app.use(express.static("public"));

async function start() {
  // create the connection to the database
  await sql
    .connect(
      `mssql://${encodeURIComponent(
        process.env.MSSQL_USER
      )}:${encodeURIComponent(process.env.MSSQL_PASS)}@${encodeURIComponent(
        process.env.MSSQL_IP
      )}/${encodeURIComponent(process.env.MSSQL_DB)}`
    )
    .then(function(pool) {
      console.log("Microsoft SQL Server connected");
      return pool;
    })
    .catch(function(err) {
      console.error(
        "MSSQL Connection Error: Something went wrong connecting to Microsoft SQL Server. Check that it is running and that your environment variables are set correctly in you .env file."
      );
      throw err;
    });
  app.listen(port, () =>
    console.log(
      `Example app listening on port ${port}.\nTry opening your browser to http://localhost:${port}!`
    )
  );
}

start();