const express = require("express");
// https://expressjs.com/en/guide/routing.html#express-router
const router = express.Router();

router.get("/", (req, res) => {
    // renders the index.ejs page
    console.log("These are the req:" + req);
    res.render("index", {
        // This gets rendered as the browsers title
        // it is passed into the ejs page as the variable 'title'
        title: "Art Mastery"
    })
});

router.get("/about", (req, res) => {
    console.log("These are the req:" + req);
    res.render("about", {
        title: "About Us"
    })
});

router.get("/category*", (req, res) => {
    // renders the index.ejs page
    console.log("These are the req:" + req);
    res.render("category", {
        // This gets rendered as the browsers title
        // it is passed into the ejs page as the variable 'title'
        title: "Category View"
    })
});



module.exports = router;
