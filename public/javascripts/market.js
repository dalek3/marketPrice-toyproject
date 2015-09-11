$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: '/getdata2',

		success:function(data){
			// successful request; do something with the data
			$(data).find('result iros\\.openapi\\.service\\.vo\\.entpInfoVO').each(function(){
				var entpName = $(this).find('entpName').text();
				var entpTelno= $(this).find('entpTelno').text();
				var postNo= $(this).find('postNo').text();
				var plmkAddrBasic= $(this).find('plmkAddrBasic').text();
				var plmkAddrDetail= $(this).find('plmkAddrDetail').text();
				var roadAddrBasic= $(this).find('roadAddrBasic').text();
				var roadAddrDetail= $(this).find('roadAddrDetail').text();

				$('.content').append('<div class="box box-body"><ul class="products-list product-list-in-box"><li.item><div class="product-info"><ul><li>'
							+'점포명 : '+entpName+'</li><li>'
							+'전화번호 : '+entpTelno+'</li><li>'
							+'우편번호 : '+postNo+'</li><li>'
							+'주소 : '+plmkAddrBasic+' '+plmkAddrDetail+'</li></ul></div></li></ul></div>')
			});
		},
		error:function(){
		// failed request; give feedback to user
			//$('#ajax-panel').html('<p class="error"><strong>오류발생:</strong> 잠시 후 다시 이용해주세요.</p>');
		}
	});
});