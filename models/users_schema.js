// schema
const mongoose = require( "mongoose");

const {ObjectId} = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"], 
      trim: true,
      text: true,
    },
    // username: {
    //   type: String,
    //   required: [true, "username is required"],
    //   trim: true,
    //   text: true,
    //   unique: true,
    // },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },

  },
  {
    timestamps: true,
  }
);
//creating model or collection
const User = mongoose.model("User", userSchema);

module.exports = User;
