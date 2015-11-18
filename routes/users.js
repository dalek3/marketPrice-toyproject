var express = require('express');
var router = express.Router();
var http=require('http');
var mysql = require('mysql');

//데이터베이스와 연결합니다.
var db_config = {
	host:'us-cdbr-iron-east-02.cleardb.net',
	user: '',
	password: '',
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

var start = 16;
var offset = 28;//item per page
var refreshoffset = 16;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {title: '뭐살까'});
});

/*검색기능*/
router.get('/search', function(req, res, next) {
	var q= req.query.search;
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodName LIKE "%'+req.query.q+'%" LIMIT 0, ?'
		, [refreshoffset]
		,function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			} 
			start = 0;
			res.render('search', {title: '뭐살까',row: data});
		});
});

router.get('/api/search', function(req, res, next) {
	start += refreshoffset + 1;
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodName LIKE "%'+req.query.q+'%" LIMIT ?, ?'
		, [start, refreshoffset], function (err, data1) {
		console.log(start + '::' + refreshoffset);
		res.send(data1);
	});
});

/* GET goods 전제 */
router.get('/goods', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code LIMIT 0, ?'
		, [refreshoffset]
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			start = 0;
			res.render('goods', {title: '뭐살까',row: data});
		});
});

router.get('/api/goods', function(req, res, next) {
	start += refreshoffset + 1;
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code LIMIT ?, ?', [start, refreshoffset], function (err, data1) {
		console.log(start + '::' + refreshoffset);
		res.send(data1);
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
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030100000 AND goodSmlclsCode < 030200000 LIMIT 0, ?'
		, [refreshoffset]
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			start = 0;
			res.render('food', {title: '뭐살까',row: data});
		});
});

router.get('/api/food', function(req, res, next) {
	start += refreshoffset + 1;
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030100000 AND goodSmlclsCode < 030200000 LIMIT ?, ?', [start, refreshoffset], function (err, data1) {
		console.log(start + '::' + refreshoffset);
		res.send(data1);
	});
});

//GET mfood
router.get('/mfood', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030200000 AND goodSmlclsCode < 030300000 LIMIT 0, ?'
		, [refreshoffset]
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			start = 0;
			res.render('mfood', {title: '뭐살까',row: data});
		});
});

router.get('/api/mfood', function(req, res, next) {
	start += refreshoffset + 1;
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030200000 AND goodSmlclsCode < 030300000 LIMIT ?, ?', [start, refreshoffset], function (err, data1) {
		console.log(start + '::' + refreshoffset);
		res.send(data1);
	});
});

//GET etc 
router.get('/etc', function(req, res, next) {
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030300000 LIMIT 0, ?'
		, [refreshoffset]
		, function(err, data, fields) { 
			if (err) {
				console.log('error: ', err);
				throw err;
			}
			start = 0;
			res.render('etc', {title: '뭐살까',row: data});
		});
});

router.get('/api/etc', function(req, res, next) {
	start += refreshoffset + 1;
	connection.query('SELECT * FROM goods a, store b,newprice c, standard d WHERE a.goodId=c.goodId AND b.entpId=c.entpId AND a.goodTotalDivCode=d.code AND goodSmlclsCode >=030300000 LIMIT ?, ?', [start, refreshoffset], function (err, data1) {
		console.log(start + '::' + refreshoffset);
		res.send(data1);
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
