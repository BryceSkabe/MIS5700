const express = require("express");
// https://expressjs.com/en/guide/routing.html#express-router
const router = express.Router();
const products = require("./api/products.json");
const sql = require("mssql");
const { sqlFetch } = require("./utils/utils");
const querystring = require('querystring');

router.get("/search/:category", async (req, res) => {
  if(req.params.category == 'painting' || req.params.category == 'photo' || req.params.category == 'ceramic' || req.params.category == 'sculpture'){
    var query = "SELECT TOP 20 * FROM mis5700.artmastery WHERE CONVERT(VARCHAR, query) = '"+req.params.category+"'";
    var all = await sqlFetch(query);    
    res.json({
      products: all}); 
  } else {
    var query = "SELECT TOP 20 * FROM mis5700.artmastery WHERE CONVERT(VARCHAR, title) LIKE '%"+req.params.category+"%'";
    var all = await sqlFetch(query);    
    res.json({
      products: all}); 
  }
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