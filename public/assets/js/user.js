// 需求四 创建新用户

$('#userForm').on('submit', function () {
	// 获取的是字符串类型的
	let formData = $(this).serialize()
	// console.log(formData)
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			location.reload()
		},
		error: function () {
			alert('注册用户失败')
		}
	})
	return false
})

// 需求五 显示用户列表
$.ajax({
	type: 'get',
	url: '/users',
	success: function (data) {
		let html = template('userTpl',{data})
		$('#userBox').html(html)
	},
	error: function () {
		alert('用户列表获取失败')
	}
})

