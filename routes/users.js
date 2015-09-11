var express = require('express');
var router = express.Router();
var http=require('http');

var servicekey = 'YWj8qq5V0WpoccMC8GOXs%2BCxVePxpCqq%2FftHFru%2Fum0NN6I7oHUbxIIPHW%2FSRPm1%2FUEJ6JM7xTeuPBU0zEldYQ%3D%3D';
/* GET */
router.get('/getdata', function (req, res){
	var url = 'http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getProductPriceInfoSvc.do?goodInspectDay=20150904&entpId=2&ServiceKey='+servicekey;
	if (url){
		http.get(url, function (web){
			web.on('data', function (buffer){
				res.write(buffer);
			});
			web.on('end', function (){
				res.end();
			});
		});
	}else{
		res.send('url error');
	}
});

/* GET */
router.get('/getdata1', function (req, res){
	var url = 'http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getProductInfoSvc.do?ServiceKey='+servicekey;
	if (url){
		http.get(url, function (web){
			web.on('data', function (buffer){
				res.write(buffer);
			});
			web.on('end', function (){
				res.end();
			});
		});
	}else{
		res.send('url error');
	}
});

/* GET */
router.get('/getdata2', function (req, res){
	var url = 'http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getStoreInfoSvc.do?ServiceKey='+servicekey;
	if (url){
		http.get(url, function (web){
			web.on('data', function (buffer){
				res.write(buffer);
			});
			web.on('end', function (){
				res.end();
			});
		});
	}else{
		res.send('url error');
	}
});

/* GET goods 전제 */
router.get('/goods', function(req, res, next) {
  res.render('goods');
});

/* GET detail */


/* GET food */
router.get('/goods/food', function(req, res, next) {
  res.render('goods');
});

/* GET mfood */
router.get('/goods/mfood', function(req, res, next) {
  res.render('goods');
});

/* GET etc */
router.get('/goods/etc', function(req, res, next) {
  res.render('goods');
});

/* GET map */
router.get('/market', function(req, res, next) {
  res.render('market');
});


module.exports = router;
