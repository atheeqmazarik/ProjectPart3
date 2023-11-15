var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Show = require('../models/tv');
let ShowController = require('../controllers/tv')
/* Get route for the tv list */
// Read Operation
router.get('/', ShowController.DislayShowList);
/* Get route for Add Show page --> Create */
router.get('/add', ShowController.AddShow); 
/* Post route for Add Show page --> Create */
router.post('/add', ShowController.ProcessShow);
/* Get route for displaying the Edit Show page --> Update */
router.get('/edit/:id', ShowController.EditShow);
/* Post route for processing the Edit Show page --> Update */
router.post('/edit/:id', ShowController.ProcessEditShow);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', ShowController.DeleteShow);
 module.exports = router;