// 需求25 轮播图展示
$.ajax({
	type: 'get',
	url: '/slides',
	success: function (response) {
		var html = template('swipeTpl', {data: response});
		$('#swipeBox').html(html)
	}
});
// 需求27 最新发布展示
$.ajax({
    type:'get',
    url:'/posts/lasted',
    success:function(response){
		console.log(response)
        let html = template('lastTpl',{data:response})
        $('#lastBox').html(html)
    }
})