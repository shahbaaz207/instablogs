const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requireLogin=require('../middleware/requiredLogin')
//secret key of token
const JWT_SECRET = "rejdkddgb3edfgg";

// get route to verifiy the token
router.get('/protected',requireLogin,(req,res)=>{
    res.send('hello to you')
})

// signUp routerv
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(404).json({
          error: "user already exists with that email",
        });
      }
      bcrypt.hash(password, 12).then((hashpassword) => {
        const user = new User({
          email,
          password: hashpassword,
          username,
        });
        user
          .save()
          .then((user) => {
            res.json({
              message: "saved successfully",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// signIn or login router
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add the email & password" });
  }
  // match the email on database
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(404).json({ error: "invalid Email or Password" });
    }
    // match the password on database
    bcrypt
      .compare(password, savedUser.password)
      .then((domatch) => {
        if (domatch) {
          // res.json({message:'successfully sign In'})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const {_id,username,email,pic}=savedUser
          res.json({ token,user:{_id,username,email,pic} });
        } else {
          return res.status(404).json({ error: "invalid Email or Password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
