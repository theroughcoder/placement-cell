// schema
const mongoose = require( "mongoose");

const {ObjectId} = mongoose.Schema.Types;

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    
    },
    batch: {
      type: String,
      required: [true, "batch is required"],
      trim: true,
    },
    college: {
      type: String,
      required: [true, "batch is required"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "status is required"],
      trim: true,
      enum : ['Placed','Not placed'],
        default: 'placed'
    },
    DSA: {
      type: Number,
      required: [true, "DSA is required"],
      trim: true,
    },
    webD: {
      type: Number,
      required: [true, "WebD is required"],
      trim: true,
    },
    react: {
      type: Number,
      required: [true, "WebD is required"],
      trim: true,
    },
    interview: {
      type: ObjectId,
      ref: "Interview"
      
    },

  },
  {
    timestamps: true,
  }
);
//creating model or collection
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
