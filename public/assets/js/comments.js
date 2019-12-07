// 需求18 评论列表渲染
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {

        let html = template('commentsTpl', response)
        $('#commentsBox').html(html)
        let page = template('pageTpl', response)
        $('#pageBox').html(page)
    }
})

// 分页渲染
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            let html = template('commentsTpl', response)
            $('#commentsBox').html(html)
            let page = template('pageTpl', response)
            $('#pageBox').html(page)
        }
    })
}

// 需求19评论审核或者删除被点击时
$('#commentsBox').on('click', '.status', function () {
    let status = $(this).attr('data-status')
    let id = $(this).data('id')
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload()
        }
    })
})
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('您确认要删除这条评论吗?')) {
        let id = $(this).data('id')
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})