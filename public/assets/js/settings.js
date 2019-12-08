// 需求23 网站配置以及渲染
$('#logo').on('change', function () {
    let formData = new FormData()
    let files = this.files[0]
    formData.append('logo', files)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#image').prop('src', response[0].logo)
            $('#site_logo').val(response[0].logo)
        }
    })
})
$('#setSiteForm').on('submit', function () {
    let formData = $(this).serialize()
    $.ajax({
        type: 'post',
        data: formData,
        url: '/settings',
        success: function () {
            location.reload()
        }
    })
    return false
})
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        if (response) {
            $('#site_logo').val(response.logo)
            $('#image').prop('src', response.logo)
            $('#site_name').val(response.title)
            $('#site_description').val(response.description)
            $('input[name="comment"]').prop('checked', response.comment)
			$('input[name="review"]').prop('checked', response.review)
        }
    }
})