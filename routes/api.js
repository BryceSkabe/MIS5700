const express = require("express");
// https://expressjs.com/en/guide/routing.html#express-router
const router = express.Router();
const products = require("./api/products.json");
const sql = require("mssql");
const { sqlFetch } = require("./utils/utils");

router.get("/getAll", async (req, res) => {
  var all = await sqlFetch`
  	  SELECT TOP 20 * 
      FROM mis5700.artmastery
      `;    
  res.json({
    products: all}); 
});


router.get("/me", async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      error: "You are not logged in!"
    });
  } else {
    res.json({
      me: {
        id: user.id,
        email: user.email,
        displayName: user.displayName
      }
    });
  }
});

module.exports = router;