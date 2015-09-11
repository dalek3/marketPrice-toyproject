$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: '/getdata',

		success:function(data){
			// successful request; do something with the data
			$(data).find('result iros\\.openapi\\.service\\.vo\\.goodPriceVO').each(function(){
				var goodprice = $(this).find('goodPrice').text();
				var id = $(this).find('goodId').text();
				$('.content').append('<div class="box box-body"><ul class="products-list product-list-in-box"><li.item><div class="product-info"><ul><li>'
							+id+'</li><li>'
							+goodprice+'</li></ul></div></li></ul></div>')
			});
		},
		error:function(){
		// failed request; give feedback to user
			//$('#ajax-panel').html('<p class="error"><strong>오류발생:</strong> 잠시 후 다시 이용해주세요.</p>');
		}
	});
	$.ajax({
		type: 'GET',
		url: '/getdata1',
		success:function(data){
		// successful request; do something with the data
			$('#goodName').empty();
			$(data).find('result').each(function(){
				$('#goodName').append( '이름 : '+ $(this).find('goodName').text());
			});
		},
		error:function(){
			// failed request; give feedback to user
			//$('#ajax-panel').html('<p class="error"><strong>오류발생:</strong> 잠시 후 다시 이용해주세요.</p>');
		}   
	});
});