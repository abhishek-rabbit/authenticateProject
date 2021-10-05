const express=require('express');
const userModel=require('../models/userModel.js');
const router=express.Router();
const  passport=require('passport');

//Router for Login Page
router.get('/',(req,res)=>{
    res.render('login');
});
//Router for Signup Page
router.get('/register',(req,res)=>{
    res.render('signup');
});
//Router for Change Password
router.get('/changepassword',(req,res)=>{
    res.render('changepassword.ejs');
});
//Router for Dashboard
router.get('/dashboard',(req,res)=>{
    res.render('dashboard.ejs');
});
//Router for Forget Password
router.get('/forgetpassword',(req,res)=>{
    res.render('forgetpassword.ejs');
});
//Router for Change Password
router.get('/changepassword',(req,res)=>{
    res.render('changepassword.ejs');
});
//Router for Signup Form Action 
router.post('/signup',(req,res)=>{
    let userData={
        name:req.body.name,
        email:req.body.email
    };
    let password=req.body.password;
    userModel.register(userData,password,(err,user)=>{
        if(err){
            req.flash('error_msg','Errot'+err);
            res.redirect('/register');

        }
        passport.authenticate('local',(req,res,()=>{
            req.flash('success_msg','Account Register Successfully');
            res.redirect('/login');
        }))
    })
})



module.exports=router;