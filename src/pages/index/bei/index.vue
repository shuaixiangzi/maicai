<template>
  <div @click="clickHandle">
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>
    {{res}}
    <button @click="bindgetusertoken">获取token</button>
    <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo">用户授权{{nickname}}</button>
    <button @click="payNow">微信支付</button>
    <button @click="payNowPay">立即支付</button>
    <button @click="getAddress">获取地址</button>
  </div>
</template>

<script>
import card from '@/components/card'
import store from '../store'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: ''
      },
      code: '',
      nickname: '',
      payParam: {},
      res: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    bindgetuserinfo(e) {
      console.log(11111)
      console.log(e)
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
    }
  },

  created () {
    let _this = this;
    // let app = getApp()
  },
  mounted (){
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
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
