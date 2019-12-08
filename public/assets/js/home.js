// 需求25 轮播图展示
$.ajax({
	type: 'get',
	url: '/slides',
	success: function (response) {
		let html = template('swipeTpl', {data: response});
		$('#swipeBox').html(html)
		let swiper = Swipe(document.querySelector('.swipe'), {
			auto: 3000,
			transitionEnd: function (index) {
			  // index++;
			  $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
			}
		  });
		  // 上/下一张
		  $('.swipe .arrow').on('click', function () {
			let _this = $(this);
			if(_this.is('.prev')) {
			  swiper.prev();
			} else if(_this.is('.next')) {
			  swiper.next();
			}
		  })
	}
});
// 需求27 最新发布展示
$.ajax({
    type:'get',
    url:'/posts/lasted',
    success:function(response){
	
        let html = template('lastTpl',{data:response})
        $('#lastBox').html(html)
    }
})