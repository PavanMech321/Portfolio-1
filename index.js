const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/Home');
const education = require('./routes/Education');

const SkillsRoutes = require('./routes/Skills');
const contactRoutes = require('./routes/Contact');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminData.routes);
app.use(education);

app.use(SkillsRoutes);

app.use(contactRoutes);


app.use((req, res, next) => {
    console.log("Page not Found");
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404');
});

app.listen(3000);