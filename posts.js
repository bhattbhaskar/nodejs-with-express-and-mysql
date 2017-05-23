var express = require('express');
var router 	= express.Router();
var mysql 	= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'node_js_demo'
});

connection.connect();

//	Routes will go here
// 	Default result
router.get('/', function(req, res){
    res.json({
    	message: "Welcome to Posts"
    });
});

//Getting list of all posts
router.get('/list/', function(req, res){

	var sql = 	'select p.id,p.title,p.body,p.created_at,u.name from posts as p ';
		sql +=	'inner join users as u on p.user_id = u.id';

	connection.query(sql, function (err, rows, fields) {
  		if (err) throw err
	
		res.json({
    		rows
    	});

    });    
});

//Getting specific post
router.get('/:id', function(req, res){
   
   if(!(parseInt(req.params.id) > 0 )) {
   			res.status(500);//Set status to 404 as movie was not found
    	    res.json({message: "Please enter valid id"});
			return;
   }
   var sql 	 = 	'select p.id,p.title,p.body,p.created_at,u.name from posts as p ';
		sql +=	'inner join users as u on p.user_id = u.id where p.id = '+req.params.id;

	connection.query(sql, function (err, rows, fields) {
  		if (err) throw err
	
		if(rows.length > 0 ) {
			 res.json(rows[0]);
		} else {
			res.status(404);//Set status to 404 as movie was not found
    	    res.json({message: "Not Found"});
		}
    });

});

// adding new post
router.post('/', function(req, res) {

	var sql  = 	'insert into posts (title, body, user_id) values';
		sql  +=	'( "'+req.body.title+'" ,  "'+req.body.body+'" , "'+req.body.user_id+'")';

	connection.query(sql, function (err, result) {
  		if (err) throw err

  			if(result.insertId > 0) {

  				res.status(200);
				res.json({
						message: "record insered successfully",
						iserted_id: result.insertId
					});
  		
  			} else {
				res.status(500);
				res.json({message: "Something went wrong"});
  			}
	 });
});


// updating new post
router.put('/', function(req, res) {

	var sql  = 	'update posts set';
		sql  +=	' title = "'+req.body.title+'" , body = "'+req.body.body+'" , user_id = "'+req.body.user_id+'"';
		sql  +=  ' where id = '+req.body.id;


	connection.query(sql, function (err, result) {
  		if (err) throw err

		  	if(result.affectedRows > 0) {
  				res.status(200);
				res.json({
						message: "record updated successfully",
					});
  		  	} else {
				res.status(500);
				res.json({message: "Something went wrong. Please retry"});
  			}
	});
});

//deleteing record
router.delete('/:id', function(req, res){

	if(!(parseInt(req.params.id) > 0 )) {
   			res.status(500);//Set status to 404 as movie was not found
    	    res.json({message: "Please enter valid id"});
			return;
   }
   var sql 	  =  'delete from posts  ';
		sql  +=	 '  where id = '+req.params.id;

	connection.query(sql, function (err, result) {
  		if (err) throw err
	
		if(result.affectedRows > 0) {
  				res.status(200);
				res.json({
						message: "record delted successfully",
					});
  		  	} else {
				res.status(500);
				res.json({message: "Something went wrong. Please retry"});
  			}
    });

});


module.exports = router;	