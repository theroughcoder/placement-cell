const express = require("express");
const{signIn, signUp, createUser, login, createSession, profile, signOut, student, interview} = require("../controllers/users_controller");
const router = express.Router();
const passport = require('passport');

router.get('/profile', passport.checkAuthentication, profile );

router.get('/sign-up', signUp);
router.get('/sign-in', signIn);
router.get('/sign-out', signOut);
router.post('/create', createUser, passport.authenticate('local', {failureRedirect: '/user/sign-up'}), createSession);
router.post('/login', login);
router.post('/create-session', passport.authenticate('local', {failureRedirect: '/user/sign-in'}), createSession);

// use password as a middleware to authenticate 
router.post('/create-session', )
 
module.exports = router;