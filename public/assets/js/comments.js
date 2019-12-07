// 需求18 评论列表渲染
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        let html = template('commentsTpl', response)
        $('#commentsBox').html(html)
    }
})