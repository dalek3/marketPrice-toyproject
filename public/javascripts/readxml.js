$(document).ready(function() {

    $.ajax({

        type: 'GET',

        url: '/getdata',

        success:function(data){

           // successful request; do something with the data

           $('#goodName').empty();

           data = $.parseXML(data);

           $(data).find('result').each(function(i){

           $('#goodName').append('현재 가격: '+ $(this).find('goodPrice').text()+'원');

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

           $('#goodId').empty();

           data = $.parseXML(data);

           $(data).find('result').each(function(i){

           $('#goodId').append( '이름 : '+ $(this).find('goodName').text());

           });

       },

       error:function(){

           // failed request; give feedback to user

           //$('#ajax-panel').html('<p class="error"><strong>오류발생:</strong> 잠시 후 다시 이용해주세요.</p>');

        }   

    });

});