// 从地址栏中获取文章id
var postId = getUrlParams('id');
// 评论是否经过人工审核
var review;
// 向服务器端发送请求 根据文章id获取文章详细信息
$.ajax({
	type: 'get',
	url: '/posts/' + postId,
	success: function (response) {
		console.log(response)
		var html = template('postTpl', response);
		$('#article').html(html)
	}
})

// 当点赞按钮发生点击事件时
$('#article').on('click', '#like', function () {
	// 向服务器端发送请求 执行点赞操作
	$.ajax({
		type: 'post',
		url: '/posts/fabulous/' + postId,
		success: function () {
			alert('点赞成功, 感谢您的支持')
		}
	})
})