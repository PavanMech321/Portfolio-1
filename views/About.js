const path = require('path')             ;

const express = require('express')       ;

const rootDir = require('../util/path')  ;

const adminData = require('./admin')     ;

const router = express.Router()          ;

router.get('/about', (req, res, next) => {
    console.log("About page request received") ;
    res.render( 'about',   {docTitle: 'About Us'} );

});

module.exports = router                   ;