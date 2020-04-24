import commonStore from '@/store';
<!--
 * @Author: 翟海祥
 * @Date: 2020-04-24 13:19:07
 * @LastEditTime: 2020-04-24 19:25:44
 * @LastEditors: 翟海祥
 * @Description:
 * @FilePath: \maicai\src\components\getPhone.vue
 -->
<template>
  <div>
    <div class="mask" v-show="bool.mask"></div>
    <!-- <div class="login" v-show="bool.phone">
      <p class="title">手机号授权</p>
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="loginBtn">获取微信手机号</button>
    </div> -->
    <div class="login" v-show="bool.phone">
      <p class="title">团菜小程序将获取您的手机号</p>
      <button
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
        class="getphoneBtn"
      >
        获取手机号
      </button>
    </div>
  </div>
</template>
<script>
import commonStore from '../store.js'
export default {
  data(){
    return {
      bool: {
        phone: false,
        mask: false
      }
    }
  },
  computed: {
    sessionKey() {
      return commonStore.state.sessionKey;
    }
  },
  methods: {
    // 获取手机号
    getPhoneNumber(e) {
      let _this = this;
      console.log('sessionKey', _this.sessionKey)
      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "token/phone",
          body: {
            sessionkey: _this.sessionKey,
            encrypteddata: e.mp.detail.encryptedData,
            iv: e.mp.detail.iv
          }
        })
        .then(res => {
          console.log(res);
          if (res.status === 100) {
            commonStore.commit("savePhone", res.data.phonenumber);

            _this.bool.mask = false;
            _this.bool.phone = false;

            wx.showToast({
              title: "授权成功，感谢您的信任",
              icon: "success",
              duration: 2000
            });

            wx.setStorageSync("myPhone", res.data.phonenumber);
          }
        });
    },
  },
  onLoad(){
    let _this = this;
    wx.getStorage({
      key: "myPhone",
      success: function(res) {
        // 异步接口在success回调才能拿到返回值

        console.log('电话', res)
        if(res.data != undefined){
          commonStore.commit("savePhone", res.data);
          _this.bool.mask = false;
          _this.bool.phone = false;
        }
        else{
          _this.bool.mask = true;
          _this.bool.phone = true;
        }
      },

      fail: function(err) {
        console.log("读取2222发生错误", err);
        _this.bool.mask = true;
        _this.bool.phone = true;
      }
    });
  }
}
</script>
<style scoped>
.topBox {
  background-color: #0ade7d;
  height: 280rpx;
}

.searchBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20rpx 40rpx;
}

.searchBox > div {
  flex: 1;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
}

.searchBox .left {
  color: #fff;
  line-height: 100%;
  display: flex;
  margin-top: 10px;
}

.searchBox .left i {
  margin-right: 10rpx;
  font-size: 24px;
}

.searchBox .right {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 40rpx;
  box-sizing: border-box;
  font-size: 16px;
  padding: 5px 20px;
}

.searchBox .right input {
  color: #fff;
}

.item1 {
  background-color: rgb(229, 229, 229);
  text-align: center;
  /* line-height: 180px; */
  /* border-radius: 20rpx; */
}

.item2 {
}

.item1 img {
  width: 100%;
}

.swiperBox {
  margin: 0 40rpx;
  height: 300rpx;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  margin: 10rpx 0;
  margin: 0 40rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.swiperBox.swiperBox2 {
  height: 400rpx;
}

.classification {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 160rpx;
  width: 86%;
  margin-left: 7%;
  text-align: center;
}

.classification .classiImg {
  width: 60rpx;
  height: 60rpx;
  /* background-color: #0ade7d; */
  margin: 0 auto;
}

.classification .classiImg img {
  width: 100%;
}

.classification li {
  flex: 1;

  box-sizing: border-box;
  padding: 20rpx 0;
}

.classification li.three {
  width: 33.33%;
  min-width: 33.33%;
  max-width: 33.33%;
}

.classification li.four {
  width: 25%;
  min-width: 25%;
  max-width: 25%;
}

.classification li p {
  font-size: 14px;
  color: #666;
}

.middle {
  margin-top: 20px;
}

.middle .title {
  font-weight: bold;
}

.middle p {
  padding: 0 40rpx;
  margin-bottom: 10px;
}

.classiImg {
  background-size: cover !important;
}

.indexQuanList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 40rpx;
}

.indexQuanList li {
  flex: 1;
  width: 48%;
  min-width: 48%;
  max-width: 48%;
  box-sizing: border-box;
  padding: 15rpx 0;
  display: flex;
  background-color: rgba(74, 223, 159);
  color: #fff;
  font-size: 16px;
  border-radius: 10rpx;
}

.indexQuanList li p {
  color: #fff;
  line-height: 50rpx;
}

.indexQuanList li .quanImg {
  width: 60rpx;
  height: 60rpx;
  border-radius: 100%;
  margin-left: 30rpx;
  margin-right: 20rpx;
}

.indexQuanList li .quanImg img {
  width: 100%;
}

.indexQuanList li p {
  margin: 0;
  padding: 0;
  margin-top: 6rpx;
}

.productCategory {
  padding: 20rpx 40rpx;
}

.productCategory .title {
  font-weight: bold;
  font-size: 14px;
}

.productList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.productList li {
  padding: 10rpx;
  box-sizing: border-box;
  font-size: 14px;
  border: 1px solid #ececec;
  margin-bottom: 40rpx;
}

.three li {
  width: 30%;
  margin-bottom: 0;
}

.two li {
  width: 48%;
}

.two li:nth-child(3),
.two li:nth-child(4) {
  margin-bottom: 0;
}

.productList .proImg {
  width: 100%;
  /* height: 250rpx; */
  /* background-color: #0ade7d; */
  margin-bottom: 10rpx;
}

.productList.three .proImg {
  height: 150rpx;
}

.productList .proImg img {
  width: 100%;
}

.productList .weight {
  margin: 8rpx 0;
  color: #999;
}

.top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.top .more img {
  width: 20rpx;
}

.top .more {
  font-size: 14px;
}

.name {
  font-size: 12px;
}

.price {
  font-size: 14px;
  font-weight: bold;
}

.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.login{
  position: fixed;
  max-width: 80%;
  left: 50%;
  top: 50%;
  background-color:#fff;
  z-index: 110;
  transform: translate(-50%,-50%);
  padding: 40rpx;
}

.login .title{
  padding: 20rpx 40rpx;
  border-bottom: 1px solid #dcdcdc;
  text-align: center;
}

.login .getphoneBtn{
  background-color: #0ade7d;
  color: #fff;
  font-size: 12px;
  padding: 0;
  margin-top: 20rpx;
}
</style>

