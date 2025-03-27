const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/skills', (req, res, next) => {
    console.log("Skills page request received") ;
    res.render( 'Skills',   {docTitle: 'About Us'} );

});

module.exports = router;