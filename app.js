const express=require('express');
const bodyParser=require('body-parser');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const authenticateRoute=require('./routes/authenticateRoute.js');

const UserModel=require('./models/userModel.js');

const app=express();

const path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_LOCAL);





//middleware for flash
app.use(flash());

//middleware for session
app.use(session({
    secret:'hello',
    resave:true,
    saveuninitialized:true
}));

//global variable setup
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash(('success_msg'));
    res.locals.error_msg=req.flash(('error_msg'));
    next();

});

//middleware for Body Parser
app.use(bodyParser.urlencoded({extended:true}));

//middleware for Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(authenticateRoute);
app.listen(4000,()=>{
    console.log('Server Started at PORT:'+process.env.port);
});

