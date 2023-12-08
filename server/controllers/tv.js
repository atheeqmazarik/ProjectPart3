let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

let Show = require('../models/tv')

//For displaying the list
module.exports.DislayShowList = async (req,res,next)=>{ //< Mark function as async
    try{
       const tvList = await Show.find(); //< Use of await keyword
       res.render('tv/list', {
          title: 'Course List', 
          tvList: tvList,
          displayName: req.user ? req.user.displayName:''
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('tv/list', {
          error: 'Error on server'
       });
    }
 };


//For adding a show to the list
 module.exports.displayAddShow = async (req,res,next)=>{
    try{
        res.render('tv/add',
        {
            title:'Add Course',
            displayName: req.user ? req.user.displayName:''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('tv/list',
        {
            error: 'Error on the server'
        });
    }
};

//For processing the added show
module.exports.ProcessAddShow = async (req,res,next)=>{
    try
    {
        let newShow = Show 
        ({
            "name":req.body.name,
            "creator":req.body.creator,
            "genres":req.body.genres,
            "episodes":req.body.episodes,
            "certification":req.body.certification,
            "status":req.body.status,
            "release":req.body.release,
            "description":req.body.description,
            "watching":req.body.watching,
            "watched":req.body.watched,
            "rating":req.body.rating

        });
        Show.create(newShow).then(() =>{
            res.redirect('/tvlist')
        })
    }
    catch(error)
    {
        console.error(err);
        res.render('tv/list',
        {
            error: 'Error on the server'
        });
    }
};


//for editing an entry
module.exports.displayEditShow = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const showToEdit = await Show.findById(id);
    res.render('tv/edit',
    {
        title:'Edit Course',
        Show:showToEdit,
        displayName: req.user ? req.user.displayName:''
    })
}
catch(error){
    console.error(err);
    res.render('tv/list',
    {
        error: 'Error on the server'
    });
}
}

//for processing an edited entry
module.exports.ProcessEditShow = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedShow = Show({
            "_id":id,
            "name":req.body.name,
            "creator":req.body.creator,
            "genres":req.body.genres,
            "episodes":req.body.episodes,
            "certification":req.body.certification,
            "status":req.body.status,
            "release":req.body.release,
            "description":req.body.description,
            "watching":req.body.watching,
            "watched":req.body.watched,
            "rating":req.body.rating
        });
        Show.findByIdAndUpdate(id,updatedShow).then(()=>{
            res.redirect('/tvlist')
        });
    }
    catch(error){
        console.error(err);
        res.render('tv/list',
        {
            error: 'Error on the server'
        });
    }
}

//for deleting an entry
module.exports.DeleteShow = (req,res,next)=>{
    try{
        let id = req.params.id;
        Show.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/tvlist')
        })
    }
    catch(error){
        console.error(err);
        res.render('tv/list',
        {
            error: 'Error on the server'
        });
    }
}
