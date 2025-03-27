const express = require('express');
const router = express.Router();

const path = require('path');

const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
    console.log("Home page request received");
    res.render('Home', { pageTitle: 'Home' });
});


exports.routes = router;