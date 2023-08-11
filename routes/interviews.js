const express = require("express");
const{interviews, addInterview, deleteInterview, editInterview} = require("../controllers/interviews_controller");
const router = express.Router();
const passport = require('passport');

router.get('/', interviews);
router.post('/addinterview', addInterview);
router.post('/deleteinterview', deleteInterview) ;
router.post('/edit/:id', editInterview) ;

module.exports = router;