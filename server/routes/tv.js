let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//const { router } = require('../config/app');
let Show = require('../models/tv');
let ShowController = require('../controllers/tv')

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* Get route for the tv list */
// Read Operation
router.get('/',requireAuth, ShowController.DislayShowList);
/* Get route for Add Show page --> Create */
router.get('/add',requireAuth, ShowController.displayAddShow); 
/* Post route for Add Show page --> Create */
router.post('/add',requireAuth, ShowController.ProcessAddShow);
/* Get route for displaying the Edit Show page --> Update */
router.get('/edit/:id',requireAuth, ShowController.displayEditShow);
/* Post route for processing the Edit Show page --> Update */
router.post('/edit/:id',requireAuth, ShowController.ProcessEditShow);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id',requireAuth, ShowController.DeleteShow);
 module.exports = router;