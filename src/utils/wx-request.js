const host = 'http://129.204.70.218:8080/api/v1/'

function request (url, method, data, header) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    console.log(header)
    wx.request({
      url: host + url,
      method: method,
      data: data,
      headers: header,
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data, obj.header)
}

function post (obj) {
  return request(obj.url, 'POST', obj.data, obj.header)
}

export default {
  request,
  get,
  post,
  host
}
