const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String, required: true },
  textContent: { type: String, required: true, maxlength: 500 },
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
});

module.exports = mongoose.model("Post", postSchema);
