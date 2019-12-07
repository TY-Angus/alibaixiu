// 需求13文章列表渲染
function render(data, page) {
    data.page = page || 1
    $.ajax({
        type: 'get',
        url: '/posts',
        data: data,
        success: function (response) {
            let html = template('postListTpl', response)
            $('#postListBox').html(html)
        }
    })
}
// 处理日期格式
function formateDate(date) {
    let dateAt = new Date(date)
    return dateAt.getFullYear() + '-' + (dateAt.getMonth() + 1) + '-' + dateAt.getDate()
}
render({}, 1)

// 需求14筛选功能
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        let html = template('categoryTpl', { data: response })
        $('#categoryBox').html(html)
    }
})
$('#filterForm').on('submit', function () {
    let formData = $(this).serialize()
    render(formData, 1)
    return false
})
