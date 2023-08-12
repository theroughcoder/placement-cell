const express = require("express");
const {home} = require("../controllers/home_controller");
const user = require("./users");
const passport = require("passport");
const {createCSV} = require("../controllers/csv_controller")
// this is router 
const router = express.Router(); 
const students = require('./students');
const interviews = require('./interviews');

// this is handling home page route 
router.get('/',passport.checkAuthentication, home ) ;
router.use('/user',  user);
router.use('/student', passport.checkAuthentication, students );
router.use('/interview', passport.checkAuthentication, interviews );
router.get('/createcsv', createCSV);
module.exports = router;
// console.log(passport); 
