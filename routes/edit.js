const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requiredLogin");

// const Edit=require('../models/edit')
const Edit = mongoose.model("Edit");


// create post route
router.post("/edit", requireLogin,(req, res) => {
    const {
      bio,
      pic
    } = req.body;
  
    // req.user.password = undefined;
    const post = new Edit({
      bio,
      photo:pic,
    });
  
    post
      .save()
      .then((result) => {
        res.json({
          post: result
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/editpic", requireLogin,(req, res) => {
    Edit.findOne()
      .then((profile) => {
        res.json({
          profile
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  
  module.exports = router;
