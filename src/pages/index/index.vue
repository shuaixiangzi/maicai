<template>
  <div>
    <div class="topBox">
      <div class="searchBox">
        <div class="left">
          <i class="iconfont iconfontMap"></i>
          <picker mode="selector" @change="bindPickerChange" :value="index" :range="objectarray" :range-key="'name'">
            <view>{{objectarray[index].name}}</view>
          </picker>
        </div>
        <div class="right">
          <input :value="searchTxt" placeholder="搜索菜品" confirm-type='search' placeholder-style="color:#FFF"/>
        </div>
      </div>

      <!--banner-->
      <swiper :indicator-dots="indicatorDots" class="swiperBox"
        :autoplay="autoplay" :interval="interval" :duration="duration">
          <swiper-item class="item1">
            1
          </swiper-item>
          <swiper-item  class="item1">
            2
          </swiper-item>
      </swiper>
    </div>
    <!--分类-->
    <ul class="classification">
      <li>
        <div class="classiImg"></div>
        <p>蔬菜</p>
      </li>
      <li>
        <div class="classiImg"></div>
        <p>肉类</p>
      </li>
      <li>
        <div class="classiImg"></div>
        <p>蛋类</p>
      </li>
      <li>
        <div class="classiImg"></div>
        <p>水果</p>
      </li>
      <li>
        <div class="classiImg"></div>
        <p>海鲜</p>
      </li>
      <li>
        <div class="classiImg"></div>
        <p>粮油调味品</p>
      </li>
    </ul>

    <!--市场布局图和优惠券-->
    <div class="middle">
      <p>市场布局图</p>

      <swiper :indicator-dots="indicatorDots" class="swiperBox"
        :autoplay="autoplay" :interval="interval" :duration="duration">
          <swiper-item class="item1">
            布局图1
          </swiper-item>
          <swiper-item  class="item1">
            布局图2
          </swiper-item>
      </swiper>


    </div>
  </div>
</template>

<script>
import store from './store'

export default {
  data () {
    return {
      index: 0,
      objectarray: [{
        id: 0,
        name: '百通民生市场'
      },
      {
        id: 1,
        name: '东李蔬菜市场'
      }],
      searchTxt: '',
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500
    }
  },

  components: {
  },

  methods: {
    // 绑定用户信息
    bindgetuserinfo(e) {
      store.commit('saveUserInfo', e.mp.detail.userInfo)
    },
    bindgetusertoken(){
      console.log('走我了')
      let _this = this;
      _this.$httpWX.post({
          url:"token/user",
          data:{
              "code":_this.code,
              "nickname":_this.nickname,
          }
      }).then(res =>{
        console.log('成功了',res)
        _this.res = JSON.stringify(res)
        mpvue.setStorage({
          key:"token",
          data:res.data
        })
      });
    },
    payNow(){
      console.log('走我了')
      let _this = this;
      /* _this.$httpWX.post({
          url:"pay/pre_order",
          data:{
              "id":539
          }
      }).then(res =>{
        console.log('成功了',res)
      }); */

      wx.request({
        url: 'http://129.204.70.218:8080/api/v1/pay/pre_order', //仅为示例，并非真实的接口地址
        data: {
          "id":539
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'token': wx.getStorageSync('token')
        },
        success (res) {
          _this.res = JSON.stringify(res)
          console.log(res.data)
          // _this.payParam = res.data.data;
          console.log(res.data.data.timeStamp)
          console.log(res.data.data.nonceStr)
          console.log(res.data.data.package)
          console.log(res.data.data.paySign)
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success (res2) {
              _this.res = JSON.stringify(res2)
              console.log('成功', res2)
            },
            fail (res2) {
              // alert(JSON.stringify(res2));
              console.log('失败', res2)
            }
          })
        }
      })
    },

    getAddress(){
      console.log('走我了')
      let _this = this;
      /* _this.$httpWX.get({
          url:"address",
          data:{}
      }).then(res =>{
        console.log('成功了',res)
      }); */

      wx.request({
        url: 'http://129.204.70.218:8080/api/v1/address', //仅为示例，并非真实的接口地址
        data: {},
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'token': wx.getStorageSync('token')
        },
        success (res) {
          console.log(res.data)
        }
      })
    },

    payNowPay(){
      let _this = this;
      console.log(_this.payParam);

      /* wx.requestPayment(
        {
        'timeStamp': _this.payParam.timeStamp,
        'nonceStr': _this.payParam.nonceStr,
        'package': _this.payParam.package,
        'signType': 'MD5',
        'paySign': _this.payParam.paySign,
        'success':function(res){
          _this.res = JSON.stringify(res)
          console.log('成功', res)
        },
        'fail':function(res){
          console.log('失败', res)
        },
        'complete':function(res){
          console.log('完成', res)
        }
        }) */
    },

    // 微信登录
    wxToLogin(){
      let _this = this;
      wx.login({
          success (res) {
              if (res.code){
                  // 这里可以把code传给后台，后台用此获取openid及session_key
                  console.log(res.code)
                  _this.code = res.code;
              }
          },
      })
    },

    // 菜市场切换
    bindPickerChange(e){
      console.log('picker发送选择改变，携带值为', e.mp.detail.value);
      this.index = e.mp.detail.value;
      store.commit('saveMarket', e.mp.detail.value)
    },

    init(){

    }
  },

  created () {
    let _this = this;
    // let app = getApp()
  },
  mounted (){
    let _this = this;
    this.init();
    _this.wxToLogin();
  }
}
</script>

<style scoped>
.topBox{
  background-color: #4adc9f;
  height: 160px;
}

.searchBox{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  padding: 20rpx 40rpx;
}

.searchBox>div{
  flex: 1;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
}

.searchBox .left{
  color: #fff;
  line-height: 100%;
}

.searchBox .right{
  background-color: rgb(68,198,141);
  border-radius: 40rpx;
  box-sizing: border-box;
  font-size: 16px;
  padding: 5px 20px;
}

.searchBox .right input{
  color: #fff;
}

.item1{
  background-color: rgb(229,229,229);
  text-align: center;
  line-height: 180px;
}

.swiperBox{
  /* padding: 40rpx; */
  height: 180px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  margin: 10rpx 40rpx 0 40rpx;
}

.classification{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 100px;
  width: 80%;
  margin-left: 10%;
  text-align: center;
}

.classification .classiImg{
  width: 80rpx;
  height: 40px;
  background-color: #4adc9f;
  margin: 0 auto
}

.classification li{
  flex: 1;
  width: 33%;
  min-width: 33%;
  max-width: 33%;
  box-sizing: border-box;
  padding: 20rpx 0;
}

.classification li p{
  font-size: 14px;
  color: #666;
}

.middle{
  margin-top: 20px;
}

.middle p{
  padding: 0 40rpx;
  margin-bottom: 10px;
}
</style>
