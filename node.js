const express = require('express');
const app = express();
const port = 1234
const mongo = require('mongoose');
const mysql = require('mysql');

mongo.connect('mongodb://127.0.0.1:27017/comments');
var db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	console.log('Connected!');
});

app.get('/', (req, res) => {
	res.sendfile('./home.html');
});

app.get('/mongo-comments', (req, res) => {
	db.collection('posts').find({}).toArray().then((data) => {
		res.send(data);
	}).catch((error) => {
		res.send(error);
	});
});

app.get('/mongo-comments/:id', (req, res) => {
	var id = request.params.id;
	db.collection('comments').find({id: id}).toArray().then(function(data) {
		response.send(data);
	}).catch(function(error) {
		response.send(error);
	});
});


const con = mysql.createConnection({
	host: "127.0.0.1",
	user: "rnd",
	password: "mydb",
	databse: "myDB"
});

app.get('/mysql-comments/comments', (req, res) => {
	con.connect(function(error) {
		if(error) throw error;
		con.query("SELECT * FROM comments", (err, result, fields) => {
			if(err) throw err;
			response.send(result);
		});
	});
});

app.get('/mysql-comments/comments/:id', (request, response) => {
	var id = request.params.id;
	con.connect((error) => {
		if(error) throw error;
		con.query("SELECT * FROM comments WHERE id = " + id, (err, result, fields) => {
			if(err) throw err;
			response.send(result);
		});
	});
});


app.listen(port);