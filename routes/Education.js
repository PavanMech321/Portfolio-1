const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/education', (req, res, next) => {
    console.log("Education page request received") ;
    res.render( 'Education',   {docTitle: 'Education'} );

});

module.exports = router;