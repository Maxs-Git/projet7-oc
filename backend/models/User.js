const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  id: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  lastName: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
