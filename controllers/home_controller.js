
const Interview = require('../models/interview_schema');

// used for rendering home page 
module.exports.home = async function (req, res) {
  const interviews = await Interview.find({}).populate('id').sort({createdAt: -1});

  //  console.log(task);
    res.render("home", {interview: interviews});
  }  