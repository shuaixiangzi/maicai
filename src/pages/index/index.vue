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
            <view class="marketName">{{ objectarray[index]?objectarray[index].name:'' }}</view>
          </picker>
        </div>
        <div class="right">
          <input
            :value="searchTxt"
            placeholder="搜索菜品"
            confirm-type="search"
            placeholder-style="color:#FFF"
            @confirm="bindconfirm"
          >
        </div>
      </div>
      <!--banner-->
      <swiper
        :indicator-dots="indicatorDots"
        class="swiperBox"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
      >
        <swiper-item class="item1" v-for="(item, index) in banner" :key="index">
          <img :src="item.img_id.url" mode="widthFix">
        </swiper-item>
      </swiper>
    </div>
    <!--分类-->
    <ul class="classification">
      <li
        v-for="(item, index) in category"
        :key="index"
        @click="tocategory(item.id)"
        :class="{'three': category.length <= 6,'four': category.length>6}"
      >
        <div class="classiImg">
          <img :src="item.topic_img_id.url" mode="widthFix">
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
      </li>-->
    </ul>
    <!--市场布局图和优惠券-->
    <div class="middle">
      <p class="title">市场布局图</p>
      <swiper
        :indicator-dots="indicatorDots"
        class="swiperBox swiperBox2"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
        v-if="banner2.length > 0">
        <!-- <swiper-item class="item1" v-for="(item, index) in banner2" :key="index">
          <img :src="item.img_id.url" mode="widthFix">
        </swiper-item> -->
        <swiper-item class="item1">
          <img :src="banner2[index].img_id.url" mode="widthFix">
        </swiper-item>
      </swiper>
      <ul class="indexQuanList">
        <li v-for="(item, index) in quan" :key="index" @click="addQuan(item.id)" :class="{'one': quan.length <= 1,'two': quan.length >= 1}">
          <div class="quanImg">
            <img src="../../../static/images/quan.png" mode="widthFix">
          </div>
          <p>{{ item.money }}元优惠券</p>
        </li>
      </ul>
    </div>
    <!--商品推荐-->
    <div class="productCategory">
      <div class="top">
        <p class="title">人气热卖</p>
        <div class="more" @click="toProList(1)">全部
          <img src="../../../static/images/right.png" mode="widthFix">
        </div>
      </div>
      <ul class="productList three">
        <li v-for="(item, index) in renqiremai" :key="index" @click="toDetail(item.id)">
          <div class="proImg">
            <img :src="item.main_img_url.url" mode="widthFix">
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
        <div class="more" @click="toProList(2)">全部
          <img src="../../../static/images/right.png" mode="widthFix">
        </div>
      </div>
      <ul class="productList two">
        <li v-for="(item, index) in dianzhangyouhui" :key="index" @click="toDetail(item.id)">
          <div class="proImg">
            <img :src="item.main_img_url.url" mode="widthFix">
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
        <div class="more" @click="toProList(3)">全部
          <img src="../../../static/images/right.png" mode="widthFix">
        </div>
      </div>
      <ul class="productList two">
        <li v-for="(item, index) in nonghuzhigong" :key="index" @click="toDetail(item.id)">
          <div class="proImg">
            <img :src="item.main_img_url.url" mode="widthFix">
          </div>
          <p class="name">{{item.name}}</p>
          <p class="weight">约{{item.weight}}KG</p>
          <p class="price">{{item.price}}</p>
        </li>
      </ul>
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
    </div>-->
    <!-- <div class="login" v-show="bool.phone">
      <p class="title">手机号授权</p>
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="loginBtn">获取微信手机号</button>
    </div> -->


    <!-- <button @click="payNow">微信支付</button>
    <text id="textId" data-userxxx="100" @tap="subUns()">111111</text>
    <br>
    <text id="textId" data-userxxx="100" @tap="subUns2()">22222</text>
    <br>
    <text id="textId" data-userxxx="100" @tap="subUns3()">33333</text> -->
    <get-token @tokenOk="tokenOk"></get-token>
  </div>
</template>

<script>
import store from "./store";
import commonStore from "../../store";
import { mapState } from "vuex";
import { fail } from "assert";
import getToken from '@/components/getToken.vue'

export default {
  data() {
    return {
      index: 0,
      objectarray: [],
      searchTxt: "",
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500,
      code: "",
      nickname: "",
      bool: {
        login: false,
        mask: false,
        phone: false,
        gujia: true
      },
      saveToken: "",
      category: [],
      quan: [],
      renqiremai: [],
      dianzhangyouhui: [],
      nonghuzhigong: [],
      banner: [],
      banner2: [],
      circular: true,
      disabled: true,
      isInit: true,
      latitude: '',
      longitude: '',
      myQuan: []
    };
  },

  computed: {
    userInfo() {
      return store.state.userInfo;
    },
    market() {
      return commonStore.state.market;
    },
    sessionKey() {
      return commonStore.state.sessionKey;
    }
  },

  components: {
    getToken
  },

  methods: {
    // 获取到了token
    tokenOk(){
      this.getAllQuan();
    },
    toProList(type){
      let url = "../classification/main";
      store.commit("saveTag", type);
      wx.switchTab({
        url: url,
        success: function(e) {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        }
      });
    },
    subUns() {
      console.log(1111);
      wx.requestSubscribeMessage({
        tmplIds: ["1cOgMwa9YvMAv2IdhouINuiKWFBhyZATMh0fXtanKvo"],
        success(res) {
          console.log("授权", res);
        }
      });
    },
    subUns2() {
      console.log(222);
      wx.requestSubscribeMessage({
        tmplIds: ["azM-nmqRIOUZSroWAGvjWKgXgiqIKlkXD2Oo-2MVNOs"],
        success(res) {
          console.log("授权", res);
        }
      });
    },
    subUns3() {
      console.log(333);
      wx.requestSubscribeMessage({
        tmplIds: ["qnSX9tyjsszMYTZ8HfRrzq4-1VGLghdN8oJs4eIuGMs"],
        success(res) {
          console.log("授权", res);
        }
      });
    },
    // 输入
    bindconfirm(e) {
      console.log(e);
      let _this = this;
      let url = "../classification/main";
      let name = e.mp.detail.value;
      commonStore.commit("searchName", name);
      wx.switchTab({
        url: url,
        success: function(e) {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        }
      });

      /* this.$fly
        .request({
          method: "POST", //post/get 请求方式
          url: "product/searchproduct",
          body: {
            name: name,
            page: 1,
            pagesize: 10,
            type: 0,
            paramid: _this.objectarray[_this.index].dada
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("成功了1111", res);

          }
        }); */
    },
    // 跳转分类
    tocategory(id) {
      let url = "../classification/main";
      store.commit("saveClassificationId", id);
      wx.switchTab({
        url: url,
        success: function(e) {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        }
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
            pagesize: 100
          }
        })
        .then(res => {
          console.log(res);
          if (res.status === 100) {
            console.log("成功了1111", res, _this.myQuan);

            _this.quan = res.data.data;
            console.log("全部优惠券", _this.quan);
            // 获取我的优惠券
            _this.$fly.request({
                method:"get", //post/get 请求方式
                url:"coupon/couponlist",
                body:{
                  type: 1,
                  page: 1,
                  pagesize: 2
                }
              }).then(res =>{
                console.log(res)
                if (res.status === 100) {
                  let now = Date.parse(new Date());
                  _this.myQuan = res.data[0].coupon;

                  console.log("我的优惠券", _this.myQuan);
                  for(let i = 0; i < _this.myQuan.length; i++){
                    for(let j = 0; j < _this.quan.length; j++){
                      if(now>=Date.parse(_this.quan[j].enddate)){
                        _this.quan.splice(j, 1);
                      }
                    }
                  }

                  console.log('剩余优惠券', _this.quan)
                }
            })

          }
        });


    },

    // 添加优惠券
    addQuan(id){
      let _this = this;
      this.$fly.request({
          method:"post", //post/get 请求方式
          url:"coupon/addcoupon",
          body:{
            id:id
          }
        }).then(res =>{
          console.log(res)
          if (res.status === 100) {
            console.log("成功了1111", res);
            wx.showToast({
              title: "领取成功",
              icon: "success",
              duration: 2000
            });
            _this.getAllQuan();
          }
      })
    },

    // 获取banner
    getBanner(type) {
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "banner",
          body: {
            type: type
          }
        })
        .then(res => {
          console.log(res);
          if (res.status === 100) {
            console.log("获取banner", res);
            if (type === 1) {
              _this.banner = res.data.data;
            } else {
              _this.banner2 = res.data.data;
            }
          }
        });
    },

    // 获取市场
    getMarket() {
      let _this = this;
      return this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "adminmarkets/marketlist",
          body: {}
        })
        .then(res => {
          console.log(res);
          if (res.status === 100) {
            console.log("获取市场", res);
            _this.objectarray = res.data;
            if(_this.objectarray.length == 1 ){
              commonStore.commit('market', _this.objectarray[0].dada)
            }
            else{
              let obj = {
                min: 0
              };
              if(_this.latitude){
                for(let i = 0; i<_this.objectarray.length;i++){
                  let val = _this.getDistance(_this.latitude, _this.longitude, _this.objectarray[i].lat, _this.objectarray[i].lng);
                  if(obj.dis === undefined){
                    obj.min = i;
                    obj.dis = val;
                  }
                  else{
                    if(obj.dis > val){
                      obj.min = i;
                      obj.dis = val;
                    }
                  }
                }
                commonStore.commit('market', _this.objectarray[obj.min].dada)
              }
              else{
                commonStore.commit('market', _this.objectarray[0].dada)
              }

            }
            // _this.getDistance(_this.latitude, _this.longitude, );
            _this.init()
          }
        });
    },

    getAddress() {
      console.log("走我了");
      let _this = this;
    },
    // 菜市场切换
    bindPickerChange(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.index = e.mp.detail.value;
      if(this.objectarray[this.index] !== this.market){
        commonStore.commit("clearCar", true);
        commonStore.commit("market", this.objectarray[e.mp.detail.value].dada);
        this.init();
      }

    },

    toDetail(id) {
      let url = "../product/main?id=" + id;
      mpvue.navigateTo({ url });
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
        .then(res => {
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
          }
        })
        .then(res => {
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

    // 计算距离
    getDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0;
      var radLat2 = lat2 * Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137; // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;
    },

    init() {
      // this.getMarket();
      this.getAllCategory();
      this.getBanner(1);
      this.getBanner(2);
      this.getProduct(1, 1, 3);
      this.getProduct(2, 1, 4);
      this.getProduct(3, 1, 4);
    }
  },

  created() {
    let _this = this;
    // let app = getApp()
  },

  mounted() {

  },
  onPageScroll: function(e) {
    /* if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      });
    } */
  },

  onLoad(){
    let _this = this;
    this.getMarket()
    wx.setBackgroundColor({
      backgroundColor: '#0ade7d', // 窗口的背景色为白色
    })
    wx.getSetting({
      success(res) {
        console.log("resresres", res);
        if(!res.authSetting["userLocation"]){
          wx.getLocation({
            type: 'wgs84',
            success (res) {
              _this.latitude = res.latitude
              _this.longitude = res.longitude
              _this.info = ''
            }
          })
        }
      },
      fail(err){
        console.log("resresres", err);
      }
    });
    try {
      // 同步接口立即返回值

      var value2 = wx.getStorageSync("key2");
    } catch (e) {
      console.log("读取key2发生错误");
    }
  }
};
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
  box-sizing: border-box;
  padding: 15rpx 0;
  display: flex;
  background-color: rgb(74, 223, 159);
  color: #fff;
  font-size: 16px;
  border-radius: 10rpx;
  margin-bottom: 15rpx;
}

.indexQuanList li.two{
  flex: 1;
  width: 48%;
  min-width: 48%;
  max-width: 48%;
}

.indexQuanList li.one{
  width: 100%;
  min-width: 100%;
  max-width: 100%;
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
  margin-bottom: 25rpx;
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

.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.indexQuanList .one{

}

.item1{
  border-radius: 20rpx;
  overflow: hidden;
}

.marketName{
  font-size: 16px;
}
</style>
