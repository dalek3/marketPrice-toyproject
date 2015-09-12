var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	connection.query('SELECT goodName,goodPrice,entpName,detailMean FROM goods a,price b,store c WHERE a.goodId = b.goodId AND b.entpId=c.entpId'
			, function(err, data, fields) { 
				if (err) {
				console.log('error: ', err);
				throw err;
			}
		//res.send(data);
		res.render('index', {title: '뭐살까', row: data});
	});
});

module.exports = router;
