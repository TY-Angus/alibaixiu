// 需求26热门推荐功能
$.ajax({
    url: '/posts/recommend',
    type: 'get',
    success: function (response) {
        let recommendBox = `
        {{each data}}
        <li>
            <a href="/detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
          </li>
        {{/each}}
        `
        let html = template.render(recommendBox, { data: response })
        $('#hotsBox')
    }
})
