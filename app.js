//jshint esversion:6

const express=require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('connect-flash');
//Require modular files
const Campground = require('./modules/campground');
const seedDB = require('./seeds');
const Comment = require('./modules/comment');
const User = require('./modules/user');

//Require routing files
var campgroundRoute = require('./routes/campground'),
    commentRoute = require('./routes/comment'),
    indexRoute = require('./routes/index');

//Starting initialization statments!!!!!!!
const app =  express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
// mongoose.connect('mongodb://localhost:27017/yelp_camp');
mongoose.connect("mongodb+srv://rajat-admin:rajat1999@cluster0-nbxxl.mongodb.net/yelp_camp",{useNewUrlParser: true});

app.use(methodOverride("_method"));
app.use(flash());
//Function to initialize DB with the seed data
//seedDB();


//===========================
//Passport configuration
//==============================
app.use(require("express-session")({
  secret: "This is yatraClub",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//Use routes files
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use(indexRoute);


app.listen(process.env.PORT || 3000,function(){
  console.log('Yelpcamp Server is running successfully on port 3000!');
});
