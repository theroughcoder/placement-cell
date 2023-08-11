const express = require("express");
const{students, addStudent, deleteStudent} = require("../controllers/students_controller");
const router = express.Router();
const passport = require('passport');

router.get('/', students);
router.post('/addstudent', addStudent);
router.post('/deletestudent', deleteStudent ) ;


module.exports = router;