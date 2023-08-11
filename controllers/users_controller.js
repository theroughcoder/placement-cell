const User = require("../models/users_schema");
const { authenticate } = require("passport");

// for rendering sign in page 
module.exports.signIn = async function(req, res) {
    if(req.isAuthenticated()){
        res.redirect("/user/profile");
    }
    res.render("sign_in");
}
// for rendering sign up page 
module.exports.signUp = async function(req, res) {
    if(req.isAuthenticated()){
        res.redirect("/user/profile");
    }
    res.render("sign_up");
}
// for rendeing profile 
module.exports.profile = async function(req, res) {
    res.render("profile"); 
}
// for rendeing student page
module.exports.student = async function(req, res) {
    res.render("student_page"); 
}
// for rendeing interview page
module.exports.interview = async function(req, res) {
    res.render("interview_page"); 
}

// for creating users
module.exports.createUser = async function(req, res, next) {

    console.log(req.body.email);
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            c_password
        } = req.body;
        if(password != c_password){
            
            res.redirect('back');
        }
        console.log("hii");
        
        const check = await User.findOne({ email });
        if (check) {
            res.redirect('back');
        }
        
        // const cryptedPassword = bcrypt.hashSync(req.body.password, 12);
        // let tempUsername = first_name + last_name;
        // let newUsername = await validateUsername(tempUsername);
        
        const capitalize = s => s[0].toUpperCase() + s.slice(1)
        
        const user = new User({
            first_name: capitalize(first_name), 
            last_name: capitalize(last_name),
            email,
            password
          
        });
        await user.save(); 
 
        next();
           
      } catch (error) {  
        res.status(500).json({ message: error.message });
      } 
}

// login function for login users
module.exports.login = async function(req, res) {
        const {email, password} = req.body;
        console.log(req.cookies.id);
    try {
        
        const check = await User.findOne({ email });
        if (!check || check.password != password) {
            res.redirect('back');
        }
        
        res.cookie("id", "love").redirect("/");
       
      } catch (error) {  
        res.status(500).json({ message: error.message });
      } 
}
// for logging out users 
module.exports.signOut = async function (req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      })
}

module.exports.createSession = async function(req, res) {
    res.redirect("/");
}