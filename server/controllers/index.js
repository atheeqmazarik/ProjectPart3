let express = require('express');
let router = express.Router();
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next)=>{
    res.render('index', { 
        title: 'Home', 
        displayName: req.user ? req.user.displayName:''
    });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { 
        title: 'About',
        displayName: req.user ? req.user.displayName:''
    });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { 
        title: 'Contact Us',
        displayName: req.user ? req.user.displayName:''
    });
}

module.exports.displayLoginPage = (req, res,next) => {
    if (!req.user)
    {
        res.render('auth/login',
        {
            title: 'login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }
}


module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // server error
        if (err) {
            return next(err);
        }
        // is a login error
        if (!user) {
            req.flash('loginMessage', 'AuthenticationError');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/login');
        });
    })(req, res, next);
};


module.exports.displayRegisterPage = (req,res,next)=>{
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
            {
                title: 'register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            })
    }
    else
    {
        return res.redirect('/')
    }
}

module.exports.processRegisterPage = (req,res,next) => {
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email:req.body.email,
        displayName: req.body.displayName
    })
    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log("Error inserting the new user");
            if(err.name=="UserExistsError")
                {
                    req.flash('registerMessage',
                    'Registration Error: User Already Exists');
                }
            return res.render('auth/register',
            {
                title:'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName:''
            });
        }
        else
        {
            // if registrations not successful
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/tvlist')
            })
        }
    })
}

module.exports.performLogout = (req,res,next)=>
{

    req.logout(function(err){
        if(err){
            return next(err);
        }
    })
    res.redirect('/');
}

