const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const db = require("./config/mongoose");
var cookieParser = require('cookie-parser')
// use for cookie session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./config/passport-local-strategy");
const routes = require("./routes");
const MongoStore = require('connect-mongo');
var expressLayouts = require('express-ejs-layouts');
// const sassMiddleware = require('node-sass-middleware')


// set the view engine to ejs
app.set('view engine', 'ejs');
// set the views to views path
app.set("views", path.join(__dirname, "views"));
// parsing encoded data 
app.use(express.urlencoded());
// used for parsing cookies 
app.use(cookieParser());
// for using static files 
app.use( express.static("assets")); 
// for using layouts 
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScript', true);


app.use(session({
  name: "codeial",
  secret: "secretKey",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  // store: new MongoStore({
  //   mongooseConnection : db,
  //   autoRemove: "disabled"
  // },
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/project_template' 
  })
  // function(err){
  //   console.log(err); 
  // }) 
}));
app.use(passport.initialize()); 
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// this is route middleware 
app.use("/", routes); 

// server listener 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})         
     