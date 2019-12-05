// 需求10修改密码
$('#modifyForm').on('submit', function () {
    let formData = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function (response) {
            alert(response.message)
            location.href = '/admin/login.html'
        },
        error: function (xhr) {
            alert(JSON.parse(xhr.responseText).message)
        }
    })

    return false
})