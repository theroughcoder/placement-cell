// schema
const mongoose = require( "mongoose");

const {ObjectId} = mongoose.Schema.Types;

const interviewSchema = mongoose.Schema(
  {
    id: {
      type: ObjectId,
      required: [true, "id is required"],
      ref: "Student",
      unique : true
    },

    company: {
      type: String,
      required: [true, "company name is required"],
    
    },
    result: {
      type: String,
      required: [true, "result is required"],
      enum: ["PASS", "FAIL", "ON HOLD", "Din't Attempt"],
      default: "ON HOLD"
    
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
    

  },
  {
    timestamps: true,
  }
);
//creating model or collection
const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
