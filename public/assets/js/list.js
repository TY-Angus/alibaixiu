// 文章分类列表页
// 获取id渲染列表和分类信息
// 获取地址栏中的categoryId参数
var categoryId = getUrlParams('categoryId');
$.ajax({
	type: 'get',
	url: '/posts/category/' + categoryId,
	success: function (response) {
		var html = template('listTpl', {data: response});
		$('#listBox').html(html);
	}
});
$.ajax({
	type: 'get',
	url: '/categories/'+ categoryId,
	success: function (response) {
		$('#categoryTitle').html(response.title)
	}
})