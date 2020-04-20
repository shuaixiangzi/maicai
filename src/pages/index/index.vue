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
        <swiper-item class="item1" v-for="(item, index) in banner" :key="index">
          <img :src="item.img.url" mode="widthFix"/>
        </swiper-item>
      </swiper>
    </div>
    <!--分类-->
    <ul class="classification">
      <li
        v-for="(item, index) in category"
        :key="index"
        @click="tocategory(item.id)"
      >
        <div class="classiImg">
          <img :src="item.url" mode="widthFix" />
        </div>
        <p>{{ item.name }}</p>
      </li>
      <!-- <li>
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
        <p>蛋类</p>
      </li>
      <li>
        <div class="classiImg">
          <img src="../../../static/images/shuiguo.png" mode="widthFix" />
        </div>
        <p>水果</p>
      </li>
      <li>
        <div class="classiImg">
          <img src="../../../static/images/haixian.png" mode="widthFix" />
        </div>
        <p>海鲜</p>
      </li>
      <li>
        <div class="classiImg">
          <img src="../../../static/images/lianyou.png" mode="widthFix" />
        </div>
        <p>粮油调味品</p>
      </li> -->
    </ul>

    <!--市场布局图和优惠券-->
    <div class="middle">
      <p  class="title">市场布局图</p>

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
        <li v-for="(item, index) in quan" :key="index">
          <div class="quanImg">
            <img src="../../../static/images/quan.png" mode="widthFix" />
          </div>
          <p>{{ item.money }}元优惠券</p>
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

      <ul class="productList three">
        <li v-for="(item, index) in renqiremai" :key="index"  @click="toDetail(item.id)">
          <div class="proImg">
            <img :src="item.main_img_url.url" mode="widthFix"/>
          </div>
          <p class="name">{{item.name}}</p>
          <p class="weight">约{{item.weight}}KG</p>
          <p class="price">{{item.price}}</p>
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
        <li v-for="(item, index) in dianzhangyouhui" :key="index" @click="toDetail(item.id)">
          <div class="proImg">
            <img :src="item.main_img_url.url" mode="widthFix"/>
          </div>
          <p class="name">{{item.name}}</p>
          <p class="weight">约{{item.weight}}KG</p>
          <p class="price">{{item.price}}</p>
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
        <li v-for="(item, index) in nonghuzhigong" :key="index" @click="toDetail(item.id)">
          <div class="proImg">
            <img :src="item.main_img_url.url" mode="widthFix"/>
          </div>
          <p class="name">{{item.name}}</p>
          <p class="weight">约{{item.weight}}KG</p>
          <p class="price">{{item.price}}</p>
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
      >
        获取微信手机号
      </button>
    </div>

    <button @click="payNow">微信支付</button>
    <!-- <button @click="payNowPay">立即支付</button> -->
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
      sessionKey: "",
      saveToken: "",
      category: [],
      quan: [],
      renqiremai: [],
      dianzhangyouhui: [],
      nonghuzhigong: [],
      banner: [{
        img:{
          url:''
        }
      }],
      market: '73753-55420'
    };
  },

  computed: {
    userInfo() {
      return store.state.userInfo;
    },
  },

  components: {},

  methods: {
    // 跳转分类
    tocategory(id) {
      let url = "../classification/main";
      store.commit("saveClassificationId", id);
      wx.switchTab({
        url: url,
        success: function (e) {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        },
      });
    },

    // 获取优惠券
    getAllQuan() {
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "admincoupon/couponlist",
          body: {
            type: 1,
            page: 1,
            pagesize: 2,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("成功了1111", res);
            _this.quan = res.data.data;
          }
        });
    },

    // 获取banner
    getBanner(){
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "banner",
          body: {},
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("获取banner", res);
            _this.banner = res.data.items;
          }
        });
    },
    // 获取手机号
    getPhoneNumber(e) {
      let _this = this;
      console.log(111, e);
      console.log(e.mp.detail.errMsg);
      console.log(e.mp.detail.iv);
      console.log(e.mp.detail.encryptedData);
      console.log("token", _this.saveToken);

      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "token/phone",
          body: {
            sessionkey: _this.sessionKey,
            encrypteddata: e.mp.detail.encryptedData,
            iv: e.mp.detail.iv,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            store.commit("savePhone", res.data.phonenumber);

            _this.bool.mask = false;
            _this.bool.phone = false;

            wx.showToast({
              title: "登录成功",
              icon: "success",
              duration: 2000,
            });
          }
        });
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
      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "token/user",
          body: {
            code: _this.code,
            nickname: _this.userInfo.nickName,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("成功了1111", res, res.data.sessionkey, res.data.token);
            _this.sessionKey = res.data.sessionkey;
            _this.saveToken = res.data.token;
            console.log(1111, _this.sessionKey, _this.saveToken);
            mpvue.setStorage({
              key: "token",
              data: res.data.token,
            });
          } else {
            wx.showToast({
              title: JSON.stringify(res.msg),
              icon: "none",
              duration: 3000,
            });
          }
        });
    },
    payNow() {
      let _this = this;
      console.log(wx.getStorageSync("token"));
      wx.request({
        url: "http://129.204.70.218:8080/api/v1/pay/pre_order", //仅为示例，并非真实的接口地址
        data: {
          id: 539,
        },
        method: "POST",
        header: {
          "content-type": "application/json", // 默认值
          token: wx.getStorageSync("token"),
        },
        success(res) {
          _this.res = JSON.stringify(res);
          console.log(res.data);
          // _this.payParam = res.data.data;
          console.log(res.data.data.timeStamp);
          console.log(res.data.data.nonceStr);
          console.log(res.data.data.package);
          console.log(res.data.data.paySign);
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success(res2) {
              _this.res = JSON.stringify(res2);
              console.log("成功", res2);
            },
            fail(res2) {
              // alert(JSON.stringify(res2));
              console.log("失败", res2);
            },
          });
        },
      });
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

    toDetail(id) {
      let url = '../product/main?id=' + id;
      mpvue.navigateTo({url})
    },

    // 获取所有类别
    getAllCategory() {
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "category/all",
          body: {},
        })
        .then((res) => {
          console.log("类别", res);
          if (res.status === 100) {
            _this.category = res.data;
            store.commit("saveClassifiList", _this.category);
          }
        });
    },

    // 获取商品
    getProduct(type, page, size) {
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "product/typeproduct",
          body: {
            page: page,
            size: size,
            type: type,
            paramid: _this.market
          },
        })
        .then((res) => {
          console.log("类别", res);
          if (res.status === 100) {
            if (type === 1) {
              _this.renqiremai = res.data.data;
            }
            if (type === 2) {
              _this.dianzhangyouhui = res.data.data;
            }
            if (type === 3) {
              _this.nonghuzhigong = res.data.data;
            }
          }
        });
    },

    init() {
      this.getAllCategory();
      this.getAllQuan();
      this.getProduct(1, 1, 2);
      this.getProduct(2, 1, 4);
      this.getProduct(3, 1, 4);
      this.getBanner();
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
        console.log("resresres", res);
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
.topBox{
  background-color: #0ade7d;
  height: 280rpx;
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
  display: flex;
  margin-top: 10px;
}

.searchBox .left i{
  margin-right: 10rpx;
  font-size: 24px;
}

.searchBox .right{
  background-color: rgba(0,0,0,.1);
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
  /* line-height: 180px; */
  /* border-radius: 20rpx; */
}

.item2{
  
}

.item1 img{
  width: 100%;
}

.swiperBox{
  margin:0 40rpx;
  height: 300rpx;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  margin: 10rpx 0;
  padding: 0 40rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.classification{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 160rpx;
  width: 86%;
  margin-left: 7%;
  text-align: center;
}

.classification .classiImg{
  width: 60rpx;
  height: 60rpx;
  /* background-color: #0ade7d; */
  margin: 0 auto
}

.classification .classiImg img{
  width: 100%;
}

.classification li{
  flex: 1;
  width: 25%;
  min-width: 25%;
  max-width: 25%;
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

.middle .title{
  font-weight: bold;
}

.middle p{
  padding: 0 40rpx;
  margin-bottom: 10px;
}

.classiImg{
  background-size: cover !important;
}

.indexQuanList{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin:40rpx;
}

.indexQuanList li{
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

.indexQuanList li p{
  color: #fff;
}

.indexQuanList li .quanImg{
  width: 50rpx;
  height: 50rpx;
  background-color: #fff;
  border-radius: 100%;
  margin-left: 50rpx;
  margin-right: 20rpx;
}

.indexQuanList li .quanImg img{
  width: 28rpx;
  margin:10rpx;
}

.indexQuanList li p{
  margin: 0;
  padding: 0;
  margin-top: 6rpx;
}

.productCategory{
  padding:20rpx 40rpx;
}

.productCategory .title{
  font-weight: bold;
  font-size: 14px;
}

.productList{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.productList li{
  padding: 10rpx;
  box-sizing: border-box;
  font-size: 14px;
  border: 1px solid #ececec;
  margin-bottom: 40rpx;
}

.three li{
  width: 30%;
  margin-bottom: 0;
}

.two li{
  width: 48%;
}

.two li:nth-child(3),.two li:nth-child(4){
  margin-bottom: 0;
}

.productList .proImg{
  width: 100%;
  /* height: 250rpx; */
  /* background-color: #0ade7d; */
  margin-bottom: 10rpx;
}

.productList.three .proImg{
  height: 150rpx;
}

.productList .proImg img{
  width: 100%;
}

.productList .weight{
  margin: 8rpx 0;
  color: #999;
}

.top{
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.top .more img{
  width: 20rpx;
}

.top .more{
  font-size: 14px;
}

.name{
  font-size: 12px; 
}

.price{
  font-size: 14px;
  font-weight: bold;
}

</style>
