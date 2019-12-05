// 渲染分类下拉列表
$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (response) {
        let html = template('categoryListTpl', { data: response })
        $('#category').html(html)
    }
})
// 文章封面上传
$('#feature').on('change', function () {
    let formData = new FormData()
    let file = this.files[0]
    formData.append('cover', file)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover)
        }
    })
})
// 添加文章功能
$('#addForm').on('submit', function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize();
    // 向服务器端发送请求 实现添加文章功能
    console.log(formData)
	$.ajax({
		type: 'post',
		url: '/posts',
		data: formData,
		success: function () {
			// 文章添加成功 跳转到文章列表页面
			location.href = '/admin/posts.html'
		}
	})
	// 阻止表单默认提交的行为
	return false;
});