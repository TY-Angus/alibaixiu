//封装一个转对象函数
function serializeObj(form) {
    let arr = form.serializeArray()
    let obj = {}
    $.each(arr, (i, item) => {
        obj[item.name] = item.value
    })
    return obj
}
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
            let page = template('pageTpl', response)
            $('#pageBox').html(page)
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
var filterData = {}
$('#filterForm').on('submit', function () {
    let formData = serializeObj($(this))
    filterData = formData
    render(formData, 1)
    return false
})

// 需求15 分页功能
function changePage(page) {
    render(filterData, page)
}

// 需求17 文章删除功能
$('#postListBox').on('click', '.delete', function () {
    if (confirm('您确认要删除这篇文章吗?')) {
        let id = $(this).data('id')
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            sunccess: function () {
                location.reload()
            }
        })
    }
})
