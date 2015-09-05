var express = require('express');
var router = express.Router();
var http=require('http');
var servicekey = 'YWj8qq5V0WpoccMC8GOXs%2BCxVePxpCqq%2FftHFru%2Fum0NN6I7oHUbxIIPHW%2FSRPm1%2FUEJ6JM7xTeuPBU0zEldYQ%3D%3D';
var goodid = 11;

/* GET */
router.get('/getdata', function (req, res){
	var url = 'http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getProductPriceInfoSvc.do?goodInspectDay=20150904&entpId=27&goodId='+goodid+'&ServiceKey='+servicekey;
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
	var url = 'http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getProductInfoSvc.do?goodId='+goodid+'&ServiceKey='+servicekey;
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
/* GET home page. */
router.get('/goods', function(req, res, next) {
  res.render('goods');
});

module.exports = router;
