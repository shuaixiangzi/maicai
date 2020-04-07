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
    <button @click="bindgetusertoken">获取token</button>
    <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo">用户授权{{nickname}}</button>
    <button @click="payNow">微信支付</button>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: ''
      },
      code: '',
      nickname: ''
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
      console.log(e)
      this.nickname = e.mp.detail.userInfo.nickName
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
      });
    },
    payNow(){
      console.log('走我了')
      let _this = this;
      _this.$httpWX.post({
          url:"pay/pre_order",
          data:{
              "id":539
          }
      }).then(res =>{
        console.log('成功了',res)
      });
    },
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
