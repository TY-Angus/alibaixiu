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


// 需求16文章修改功能
// 取url 中的参数
function getUrlParams(name) {
    let query = location.search.substring(1).split('&')
    if (query && query.length) {
        for (let i = 0; i < query.length; i++) {
            let temp = query[i].split('=')
            if (name == temp[0]) {
                return temp[1]
            } else {
                return -1
            }
        }
    }
}
// 获取浏览器后面的id 根据id来渲染编辑文章界面
let id = getUrlParams('id')
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            console.log(response.createAt)
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function (categories) {
                    response.categories = categories;
                    let html = template('modifyTpl', response)
                    $('#modifyBox').html(html)
                }
            })
        }
    })
}
$('#modifyBox').on('submit', '#modifyForm', function () {
    let formData = $(this).serialize()
    let id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        }
    })
    return false
})

