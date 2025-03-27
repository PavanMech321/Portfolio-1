const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/contact', (req, res, next) => {
    console.log("Contact page request received") ;
    res.render( 'Contact',   {docTitle: 'About Us'} );

});
router.post('https://api.web3forms.com/submit', (req, res, next) =>{
    console.log("Contact form submitted") ;
    res.redirect('/');
});

module.exports = router;
