// 分类列表渲染
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        let html = template('categoryTpl', { data: response })
        $('#categoryBox').html(html)
    }
})
// 添加文章分类
$('#addCategory').on('submit', function () {
    let formData = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }, error: function (xhr) {
            console.log(xhr);

        }
    })
    // 阻止表单默认提交行为
    return false;
})
// 修改文章分类
$('#categoryBox').on('click', '.edit', function () {
    let id = $(this).data('id')
    $.ajax({
        type: 'GET',
        url: '/categories/' + id,
        success: function (response) {
            let html = template('modifyTpl', response)
            $('#modifyBox').html(html)
        }
    })
})
$('#modifyBox').on('submit', '#modifyForm', function () {
    let id = $(this).data('id')
    let formData = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload()
        }
    })
    return false
})

// 删除文章分类
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('您确认删除分类')) {
        let id = $(this).data('id')
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (response) {
                location.reload()
            }
        })
    }
})