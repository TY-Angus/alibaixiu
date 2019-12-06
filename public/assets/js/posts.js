// 需求13文章列表渲染
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        let html = template('postListTpl', response)
        $('#postListBox').html(html)
    }
})
// 处理日期格式
function formateDate(date) {
    let dateAt = new Date(date)
    return dateAt.getFullYear() + '-' + (dateAt.getMonth() + 1) + '-' + dateAt.getDate()
}

