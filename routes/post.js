const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requiredLogin");
const Post = mongoose.model("Post");

// get requires fro all the post
router.get("/allpost", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id username email")
    .sort('-createdAt')
    .then((posts) => {
      res.json({
        posts
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// create post route
router.post("/createpost",requireLogin, (req, res) => {
  const {
    body,
    pic
  } = req.body;

  req.user.password = undefined;
  const post = new Post({
    body,
    photo:pic,
    postedBy: req.user,
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

// create post by user which one is logged
router.get("/mypost", requireLogin, (req, res) => {
  Post.find({
      postedBy: req.user._id
    })
    .populate("postedBy", "_id username")
    .then((mypost) => {
      res.json({
        mypost
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// like route  route
router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId, {
      $push: {
        likes: req.user._id
      },
    }, {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({
        error: err
      });
    } else {
      res.json(result);
    }
  });
});

// unlike route
router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId, {
      $pull: {
        likes: req.user._id
      },
    }, {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({
        error: err
      });
    } else {
      res.json(result);
    }
  });
});

// comments route
router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id
  }
  Post.findByIdAndUpdate(
      req.body.postId, {
        $push: {
          comments: comment
        },
      }, {
        new: true,
      }
    )
    .populate("comments.postedBy", "_id username")
    .populate("postedBy", "_id username")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({
          error: err
        });
      } else {
        res.json(result);
      }
    });
});

// // delete route
// router.delete('/delete/:postId',requireLogin,(req,res)=>{
//   Post.findOne({_id:req.params.postId})
//   .populate("postedBy","_id")
//   .exec((err,post)=>{
//     if(err||!post){
//         return res.status(422).json({err:err})
//     }
//     if(post.postedBy._id.toString()===req.user._id.toString()){
//         post.remove()
//         .then(result=>{
//           res.json(result)
//         }).catch(err=>console.log(err))
//     }
//   })
// })
module.exports = router;