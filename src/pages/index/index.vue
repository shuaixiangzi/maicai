<template>
  <div>
    <div class="topBox">
      <div class="searchBox">
        <div class="left">
          <i class="iconfont icondizhi"></i>
          <picker
            mode="selector"
            @change="bindPickerChange"
            :value="index"
            :range="objectarray"
            :range-key="'name'"
          >
            <view>{{ objectarray[index].name }}</view>
          </picker>
        </div>
        <div class="right">
          <input
            :value="searchTxt"
            placeholder="搜索菜品"
            confirm-type="search"
            placeholder-style="color:#FFF"
          />
        </div>
      </div>

      <!--banner-->
      <swiper
        :indicator-dots="indicatorDots"
        class="swiperBox"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item class="item1">
          1
        </swiper-item>
        <swiper-item class="item1">
          2
        </swiper-item>
      </swiper>
    </div>
    <!--分类-->
    <ul class="classification">
      <li>
        <div class="classiImg">
          <img src="../../../static/images/shucai.png" mode="widthFix" />
        </div>
        <p>蔬菜</p>
      </li>
      <li>
        <div class="classiImg">
          <img src="../../../static/images/rou.png" mode="widthFix" />
        </div>
        <p>肉类</p>
      </li>
      <li>
        <div class="classiImg">
          <img src="../../../static/images/danlei.png" mode="widthFix" />
        </div>
        <!-- <div class="classiImg" style="background:url('../../../static/images/danlei.png')"></div> -->
        <p>蛋类</p>
      </li>
      <li>
        <!-- <div class="classiImg" style="background:url('../../../static/images/shuiguo.png')"></div> -->
        <div class="classiImg">
          <img src="../../../static/images/shuiguo.png" mode="widthFix" />
        </div>
        <p>水果</p>
      </li>
      <li>
        <div class="classiImg">
          <img src="../../../static/images/haixian.png" mode="widthFix" />
        </div>
        <!-- <div class="classiImg" style="background:url('../../../static/images/haixian.png')"></div> -->
        <p>海鲜</p>
      </li>
      <li>
        <div class="classiImg">
          <img src="../../../static/images/lianyou.png" mode="widthFix" />
        </div>
        <!-- <div class="classiImg" style="background:url('../../../static/images/lianyou.png')"></div> -->
        <p>粮油调味品</p>
      </li>
    </ul>

    <!--市场布局图和优惠券-->
    <div class="middle">
      <p>市场布局图</p>

      <swiper
        :indicator-dots="indicatorDots"
        class="swiperBox"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item class="item1">
          布局图1
        </swiper-item>
        <swiper-item class="item1">
          布局图2
        </swiper-item>
      </swiper>

      <ul class="indexQuanList">
        <li>
          <div class="quanImg">
            <img src="../../../static/images/quan.png" mode="widthFix" />
          </div>
          <p>10元优惠券</p>
        </li>
        <li>
          <div class="quanImg">
            <img src="../../../static/images/quan.png" mode="widthFix" />
          </div>
          <p>20元优惠券</p>
        </li>
      </ul>
    </div>

    <!--商品推荐-->
    <div class="productCategory">
      <div class="top">
        <p class="title">人气热卖</p>
        <div class="more">
          全部<img src="../../../static/images/right.png" mode="widthFix" />
        </div>
      </div>

      <ul class="productList three" @click="toDetail()">
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
      </ul>
    </div>

    <div class="productCategory">
      <div class="top">
        <p class="title">店长优惠</p>
        <div class="more">
          全部<img src="../../../static/images/right.png" mode="widthFix" />
        </div>
      </div>

      <ul class="productList two">
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
      </ul>
    </div>

    <div class="productCategory">
      <div class="top">
        <p class="title">农户直供</p>
        <div class="more">
          全部<img src="../../../static/images/right.png" mode="widthFix" />
        </div>
      </div>

      <ul class="productList two">
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
        <li>
          <div class="proImg">
            <!-- <img src=""/> -->
          </div>
          <p class="name">黄金小南瓜</p>
          <p class="weight">约1KG</p>
          <p class="price">0.5元/颗</p>
        </li>
      </ul>
    </div>
    <div class="mask" v-show="bool.mask"></div>
    <!--确认权限弹窗-->
    <div class="login" v-show="bool.login">
      <p class="title">请先登录团菜小程序</p>
      <button
        open-type="getUserInfo"
        @getuserinfo="bindgetuserinfo"
        class="loginBtn"
      >
        登录
      </button>
    </div>

    <!-- <div class="login" v-show="bool.phone">
      <p class="title">请先登录团菜小程序</p>
      <button
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
        class="loginBtn"
      >
        获取微信手机号
      </button>
    </div> -->

     <div class="login" v-show="bool.phone">
      <p class="title">手机号授权</p>
      <button
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
        class="loginBtn"
      >获取微信手机号</button>
    </div>

    <!-- <button open-type="getPhoneNumber" @bindgetphonenumber="getPhoneNumber">同意</button> -->
  </div>
</template>

<script>
import store from "./store";
import { mapState } from "vuex";
import { fail } from "assert";

export default {
  data() {
    return {
      index: 0,
      objectarray: [
        {
          id: 0,
          name: "百通民生市场",
        },
        {
          id: 1,
          name: "东李蔬菜市场",
        },
      ],
      searchTxt: "",
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500,
      code: "",
      nickname: "",
      bool: {
        login: false,
        mask: true,
        phone: true,
      },
      sessionKey: '',
      saveToken: ''
    };
  },

  computed: {
    userInfo() {
      return store.state.userInfo;
    },
  },

  components: {},

  methods: {
    // 获取手机号
    getPhoneNumber(e) {
      let _this = this;
      console.log(111, e);
      console.log(e.mp.detail.errMsg);
      console.log(e.mp.detail.iv);
      console.log(e.mp.detail.encryptedData);
      console.log('token',  _this.saveToken)

      this.$fly.request({
          method:"post", //post/get 请求方式
          url:"token/phone",
          body:{
            sessionkey: _this.sessionKey,
            encrypteddata: e.mp.detail.encryptedData,
            iv: e.mp.detail.iv
          }
        }).then(res =>{
          console.log(res)
          if (res.status === 100) {
            _this.res = JSON.stringify(res);

            _this.bool.mask = false;
            _this.bool.phone = false;

            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          }
          else{
            wx.showToast({
              title: JSON.stringify(res.msg),
              icon: 'none',
              duration: 3000
            })
          }
      })
    },
    // 绑定用户信息
    bindgetuserinfo(e) {
      let _this = this;
      console.log(e.mp.detail.userInfo);
      store.commit("saveUserInfo", e.mp.detail.userInfo);

      this.bool.mask = true;
      this.bool.phone = true;
    },

    bindgetusertoken() {
      console.log("走我了111", this.userInfo);
      let _this = this;
      this.$fly.request({
          method:"post", //post/get 请求方式
          url:"token/user",
          body:{
            code: _this.code,
            nickname: _this.userInfo.nickName,
          }
        }).then(res =>{
          console.log(res)
          if (res.status === 100) {
            console.log("成功了1111", res,res.data.sessionkey, res.data.token);
            _this.sessionKey = res.data.sessionkey
            _this.saveToken = res.data.token
            console.log(1111, _this.sessionKey, _this.saveToken)
            mpvue.setStorage({
              key: "token",
              data: res.data.token,
            });
          }
          else{
            wx.showToast({
              title: JSON.stringify(res.msg),
              icon: 'none',
              duration: 3000
            })
          }
      })
    },
    payNow() {

    },

    getAddress() {
      console.log("走我了");
      let _this = this;
    },

    payNowPay() {
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
    wxToLogin() {
      let _this = this;
      /* Dialog.alert({
        title: '标题',
        message: '弹窗内容',
      }).then(() => {
        // on close
      }); */
      wx.login({
        success(res) {
          if (res.code) {
            // 这里可以把code传给后台，后台用此获取openid及session_key
            console.log(res.code);
            _this.code = res.code;
          }
        },
      });
    },

    // 菜市场切换
    bindPickerChange(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.index = e.mp.detail.value;
      store.commit("saveMarket", e.mp.detail.value);
    },

    toDetail() {
      mpvue.navigateTo({ url: "../product/main" });
    },

    init() {
      /* wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success () {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                wx.userInfo()
              }
            })
          }
        }
      }) */
    },
  },

  created() {
    let _this = this;
    // let app = getApp()
  },
  mounted() {
    let _this = this;
    this.init();

    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting["scope.userInfo"]) {
          _this.bool.login = true;
          _this.bool.mask = true;
        } else {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              store.commit("saveUserInfo", res.userInfo);

              wx.login({
                success(res) {
                  if (res.code) {
                    // 这里可以把code传给后台，后台用此获取openid及session_key
                    console.log(res.code);
                    _this.code = res.code;
                    _this.bindgetusertoken(); // 获取token
                  }
                },
              });
            },
            fail: function (res) {
              console.log(res);
            },
          });
        }
      },
    });

    // _this.wxToLogin();
  },
};
</script>

<style scoped>
.topBox {
  background-color: #4adc9f;
  height: 160px;
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
  background-color: rgb(68, 198, 141);
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
  line-height: 180px;
}

.swiperBox {
  /* padding: 40rpx; */
  height: 180px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  margin: 10rpx 0;
  padding: 0 40rpx;
  box-sizing: border-box;
}

.classification {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 100px;
  width: 86%;
  margin-left: 7%;
  text-align: center;
}

.classification .classiImg {
  width: 80rpx;
  height: 40px;
  /* background-color: #4adc9f; */
  margin: 0 auto;
}

.classification .classiImg img {
  width: 100%;
}

.classification li {
  flex: 1;
  width: 33%;
  min-width: 33%;
  max-width: 33%;
  box-sizing: border-box;
  padding: 20rpx 0;
}

.classification li p {
  font-size: 14px;
  color: #666;
}

.middle {
  margin-top: 20px;
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
  padding: 20rpx 0;
  display: flex;
  background-color: rgba(74, 223, 159);
  color: #fff;
  font-size: 16px;
  border-radius: 10rpx;
}

.indexQuanList li p {
  color: #fff;
}

.indexQuanList li .quanImg {
  width: 60rpx;
  height: 60rpx;
  background-color: #fff;
  border-radius: 100%;
  margin-left: 20rpx;
  margin-right: 20rpx;
}

.indexQuanList li .quanImg img {
  width: 35rpx;
  margin: 10rpx 15rpx;
}

.indexQuanList li p {
  margin: 0;
  padding: 0;
  margin-top: 8rpx;
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
}

.two li {
  width: 48%;
}

.productList .proImg {
  width: 100%;
  height: 200rpx;
  background-color: #4adc9f;
  margin-bottom: 10rpx;
}

.productList .weight {
  margin: 10rpx 0;
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

.login {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 105;
  padding: 20rpx 40rpx;
  background-color: #fff;
}

.loginBtn {
  background-color: #4adc9f;
  color: #fff;
  line-height: inherit;
  font-size: 14px;
  padding: 20rpx 40rpx;
}

.login .title {
  padding: 40rpx 0;
  border-bottom: 1px solid #ececec;
  margin-bottom: 40rpx;
  text-align: center;
}
</style>
