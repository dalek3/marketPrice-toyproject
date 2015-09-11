var express = require('express');
var router = express.Router();
var http=require('http');
var mysql = require('mysql');


//데이터베이스와 연결합니다.
var db_config = {
	host:'us-cdbr-iron-east-02.cleardb.net',
	user: 'b2f741162c7959',
	password: '14e1591c',
	database: 'heroku_acd28e380746cfd'
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

/* GET goods 전제 */
router.get('/goods', function(req, res, next) {
  	connection.query('SELECT goodName,goodPrice,entpName,detailMean from goods a,price b,store c WHERE a.goodId = b.goodId AND b.entpId=c.entpId'
  		, function(err, data, fields) { 
  			if (err) {
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
