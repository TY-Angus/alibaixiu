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
	success: function (response) {
		let html = template('userTpl', { data: response })
		$('#userBox').html(html)
	},
	error: function () {
		alert('用户列表获取失败')
	}
})

// 需求6 图片与解析和图片上传
$('#modifyBox').on('change', '#avatar', function () {
	let formData = new FormData()
	// this.files[0]指第一张图片
	formData.append('avatar', this.files[0])
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax()方法不要解析请求参数
		processData: false,
		// 告诉$.ajax()方法不要设置参数的类型
		contentType: false,
		success: function (response) {
			// response[0].avatar返回的是图片的路径
			$('#preview').attr('src', response[0].avatar)
			$('#hiddenAvatar').val(response[0].avatar)
		}

	})

})

// 需求7 添加用户编辑功能
$('#userBox').on('click', '.edit', function () {
	let id = $(this).attr('data-id')
	$.ajax({
		type: 'GET',
		url: '/users/' + id,
		success: function (response) {
			let html = template('modifyTpl', response)
			$('#modifyBox').html(html)
		}
	})
})
$('#modifyBox').on('submit', '#modifyForm', function () {
	let formData = $(this).serialize()
	let id = $(this).attr('data-id')
	$.ajax({
		type: 'put',
		url: '/users/' + id,
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

// 需求8添加删除用户功能
$('#userBox').on('click', '.delete', function () {
	let id = $(this).attr('data-id')
	if (confirm('确认要删除吗?')) {
		$.ajax({
			url: '/users/' + id,
			type: 'delete',
			success: function () {
				location.reload()
			}
		})
	}
})
// 需求9单选和全选以及批量删除
$('#selectAll').on('click', function () {
	let isChecked = this.checked
	if (isChecked) {
		$('#deleteMany').show()
	} else {
		$('#deleteMany').hind()
	}
	$('#userBox').find('input:checkbox').attr('checked', isChecked)
})
$('#userBox').on('click', 'input:checkbox', function () {
	let allCheck = $('#userBox input:checkbox')
	let isChecked = allCheck.length == allCheck.filter(':checked').length
	$('#selectAll').prop('checked', isChecked)

	if (allCheck.filter(':checked').length >= 1) {
		$('#deleteMany').show()
	} else {
		$('#deleteMany').hide()
	}
})
$('#deleteMany').on('click', function () {
	let arr = $('#userBox input:checkbox').filter(':checked').toArray().map(x => $(x).attr('data-id'))
	if (confirm('您确认要进行批量删除吗?')) {
		$.ajax({
			type: 'delete',
			url: '/users/' + arr.join('-'),
			success: function () {
				location.reload()
			}
		})
	}
})





