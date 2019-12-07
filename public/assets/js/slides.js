// 需求20轮播图图片上传以及创建
$('#file').on('change', function () {
    let formData = new FormData()
    let files = this.files[0]
    formData.append('image', files)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response && response.length > 0) {
                $('#slides').val(response[0].image)
            }
        }
    })
})
$('#slidesForm').on('submit', function () {
    let formData = $(this).serialize()
    console.log(formData)
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    return false
})

// 需求21 轮播列表渲染以及删除功能
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        let html = template('slidesTpl', { data: response })
        $('#slidesBox').html(html)
    }
})
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('您确认要删除这个轮播图吗?')) {
        let id = $(this).data('id')
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})