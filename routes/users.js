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

/* GET home page. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code'
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			res.render('', {title: '뭐살까',row: data});
		});
});

/*검색기능*/
router.get('/search', function(req, res, next) {
	var q= req.query.search;
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodName LIKE "%'+req.query.q+'%"'
		,function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			} 
			console.log(q); 
			res.render('search', {title: '뭐살까',row: data});
		});
});

/* GET goods 전제 */
router.get('/goods', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code'
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			res.render('goods', {title: '뭐살까',row: data});
		});
});

/* GET goods detail */
router.get('/goodsView', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b, standard d WHERE a.goodTotalDivCode=d.code AND goodId=? AND entpId=?' 
		,[req.query.goodId, req.query.entpId]
		,function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			connection.query('SELECT * FROM price WHERE goodId=? AND entpId=?' 
				,[req.query.goodId, req.query.entpId]
				,function(err, prices, fields) { 
					res.render('goodDetail', {title: '뭐살까',row: data, price: prices});
				});
		});
});

// GET food
router.get('/food', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030100000 AND goodSmlclsCode < 030200000'
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			} 
			res.render('goods', {title: '뭐살까',row: data});
		});
});

//GET mfood
router.get('/mfood', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030200000 AND goodSmlclsCode < 030300000'
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			res.render('goods', {title: '뭐살까',row: data});
		});
});

//GET etc 
router.get('/etc', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030300000'
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			res.render('goods', {title: '뭐살까',row: data});
		});
});

/* GET market */
router.get('/market', function(req, res, next) {
	connection.query('SELECT * from store', function(err, rows, fields) {
		if (err) {
			console.log('error: ', err);
			throw err;
		}
		res.render('market', {title: '뭐살까',row: rows});
	})
});

/* GET market  detail*/
router.get('/marketView', function(req, res, next) {
	connection.query('SELECT * from store WHERE entpId=?'
		,[req.query.entpId]
		, function(err,  data, fields) {
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			res.render('marketDetail', {title: '뭐살까',row: data});
		})
});


module.exports = router;