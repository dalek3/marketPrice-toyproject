var express = require('express');
var router = express.Router();
var http=require('http');
var mysql = require('mysql');


//데이터베이스와 연결합니다.
var connection = mysql.createConnection({
	host:'us-cdbr-iron-east-02.cleardb.net',
	user: 'b2f741162c7959',
	password: '14e1591c',
	database: 'heroku_acd28e380746cfd'
});

connection.connect();

/* GET goods 전제 */
router.get('/goods', function(req, res, next) {
  	connection.query('SELECT goodName,goodPrice,detailMean from goods a,price b WHERE a.goodId = b.goodId ', function(err, data, fields) {  		if (err) {
				console.log('error: ', err);
				throw err;
			}
		res.render('goods', {row: data});
	});
});

/* GET detail */

// GET food
/*
router.get('/goods/food', function(req, res, next) {
  res.render('goods');
});

//GET mfood
router.get('/goods/mfood', function(req, res, next) {
  res.render('goods');
});

///GET etc 
router.get('/goods/etc', function(req, res, next) {
  res.render('goods');
});*/

/* GET market */
router.get('/market', function(req, res, next) {
	connection.query('SELECT * from store', function(err, rows, fields) {
		if (err) {
			console.log('error: ', err);
			throw err;
		}
		  res.render('market', {row: rows});
	})
});


module.exports = router;
