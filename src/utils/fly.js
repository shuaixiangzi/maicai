/*
 * @Author: 翟海祥
 * @Date: 2020-04-16 20:28:53
 * @LastEditTime: 2020-04-24 13:16:32
 * @LastEditors: 翟海祥
 * @Description:
 * @FilePath: \maicai\src\utils\fly.js
 */
/**
 * Created by zhengyi.fu on 2018/8/31.
 */
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = "https://www.tuancaicn.com/api/v1/"
import commonStore from "../store";
//添加请求拦截器
fly.interceptors.request.use((request) => {
  
  console.log('request', request);
  if(request.needLoading){
    wx.showLoading({
      title: "加载中",
      mask:true
    });
  }
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    "token": commonStore.state.token,
    'content-type': 'application/json'
  };

  let authParams = {
    //公共参数
    /* "categoryType": "SaleGoodsType@sim",
    "streamNo": "wxapp153570682909641893",
    "reqSource": "MALL_H5",
    "appid": "string",
    "timestamp": new Date().getTime(),
    "sign": "string" */
  };

  request.body && Object.keys(request.body).forEach((val) => {
    if(request.body[val] === ""){
      delete request.body[val]
    };
  });
  request.body = {
    ...request.body,
    ...authParams
  }
  return request;
});

//添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      wx.hideLoading();
    }, 1000);
    
    if(response.data.status !== 100){
      wx.showToast({
        title: JSON.stringify(response.data.msg),
        icon: 'none',
        duration: 3000
      })
    }
    return response.data;//请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因
    console.log(err);
    console.log('111111', err.engine.response)
    let data = err.engine.response;
    setTimeout(() => {
      wx.hideLoading();
    }, 1000);
    /* if(err){
      return "请求失败";
    }; */
    if(data.status !== 100){
      wx.showToast({
        title: data.msg,
        icon: 'none',
        duration: 3000
      })
    }

    return data;//请求成功之后将返回值返回
  }
);

fly.config.baseURL = host;

export default fly;
