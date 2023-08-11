const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Users = require("../models/users_schema");

// authentication doing using password 
passport.use(new localStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    // find a user and establish an identity 
    try{
        const user = await Users.findOne({email: email})
        if(!user || user.password != password){
            console.log("Invalid email/password");
            return done(null, false);
        }

        return done(null, user);
    }catch(err){
        console.log("Error in finding user --> passport");
        return  done(err);
    }
}));

// serializing the user to decide which key is to be kept in cookie 

passport.serializeUser( function(user, done){
    done(null, user.id);
})

// deserialize user form  key in the cookie 

passport.deserializeUser( function(id, done){
    try{
        const user = Users.findById(id);

        return done(null, user);
    }catch(err){
        console.log("Error in finding user --> passport");
        return  done(err); 
    }
})

// check if the user is authenticated 

passport.checkAuthentication = function(req, res, next) {
    // if the user is signed in, then pass the request to next()
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in 
    res.redirect('/user/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next) {
    // if the user is signed in, then pass the request to next()

    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    // if the user is not signed in 
    next();
}
