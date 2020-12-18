const mongoose = require("mongoose");
// const img=require()
const editSchema = new mongoose.Schema({
    bio: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required:false
    },
  });
  
  mongoose.model("Edit", editSchema);
  