// 需求3退出登录
$('#logout').on('click', function () {
  let isConfirm = confirm('您确定要退出吗?')
  if (isConfirm) {
    $.ajax({
      url: '/logout',
      type: 'post',
      success: function () {
        location.href = '/admin/login.html'
      },
      error:function(){
        alert('退出失败')
      }
    })
  }
})