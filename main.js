var exp 		= require("express");
var app 		= exp();
var router 		= exp.Router();
var bodyParser 	= require('body-parser');
var multer 		= require('multer');
var upload 		= multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Require the Router we defined in posts.js
var posts = require('./posts.js');

//Use the Router on the sub route /posts
app.use('/posts', posts);

// App is workin on port 3000
app.listen(3000);