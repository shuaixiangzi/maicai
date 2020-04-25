<template>
  <div>
    <div class="title" v-if="detail.shopinfo.title">
      <i class="iconfont icongouwulan"></i>
      <span class="titles">{{detail.shopinfo.title}}</span>
    </div>

    <!--banner-->
    <swiper :indicator-dots="indicatorDots" class="swiperBox"
      :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item class="item1" v-for="(item, index) in detail.theme" :key="index">
          <img :src="item.img_url.url" mode="widthFix"/>
        </swiper-item>
    </swiper>
    <!-- <div class="swiperBox">
      <img :src="detail.main_img_url.url" mode="widthFix"/>
    </div> -->

    <div class="infoTop">
      <div class="price"><span>￥{{detail.price}}</span> <i>/份</i></div>
      <div class="weight">约{{detail.weight}}KG/份</div>
      <div class="num">销量：{{detail.salecount}}件</div>
      <!-- <i class="iconfont iconfenxiang"></i> -->
    </div>

    <p class="proTitle">{{detail.summary}}</p>

    <div class="specifications">
      <div class="name">选择规格</div>
      <div class="count">
        <div @click="decrement">-</div>
        <div><input class="weui-input" placeholder="数量" v-model="num"/></div>
        <div @click="increment">+</div>
      </div>

      <div class="unit">份</div>
      <div style="position: relative;top: 12px;float: right;left: 20px;">库存{{detail.stock}}</div>
    </div>

    <div class="detail">
      <p class="detailTitle">详情</p>

      <img  v-for="(item, index) in detail.imgs" :key="index" :src="item.img_url.url" mode="widthFix"/>
    </div>

    <div class="alert" v-show="bool.showSuccess">加入购物车成功</div>
    <div class="buyNow">
      <!-- <navigator url="/page/index/main" hover-class="navigator-hover">
        <img src="/static/tabs/home.png" mode="widthFix"/>
        <p>回到首页</p>
      </navigator> -->
      <div class="backHome _navigator" @click="backHome()">
        <img src="/static/tabs/home.png" mode="widthFix"/>
        <p>回到首页</p>
      </div>
      <div  class="_navigator" @click="toCar()">
        <img src="/static/tabs/car.png" mode="widthFix"/>
        <p>前往购物车</p>
      </div>

      <div class="buyBtn">
        <div class="buyn">
          <div class="add" @click="addCar()">加入购物车</div>
          <div class="buy" @click="buyNow()">立即购买</div>
        </div>
      </div>
    </div>
    <get-token @tokenOk="tokenOk"></get-token>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import commonStore from '@/store'
import getToken from '@/components/getToken.vue'

export default {
  data(){
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500,
      num: 1,
      bool:{
        showSuccess: false
      },
      id: 0,
      detail: {
        img_id: 10,
        imgs: [{img_url:{url:''}}],
        main_img_url: "",
        marketid: "",
        name: "",
        price: 0,
        properties: [],
        salecount: 0,
        stock: 0,
        summary: null,
        weight: "0",
        shopinfo: {
          title: ''
        }
      },
      shopDetail: {}
    }
  },
  computed: {

  },
  components: {
    getToken
  },

  watch: {
    num (val){
      if(val >= this.detail.stock){
        this.value = this.detail.stock
      }
      else{
        this.value = this.val
      }

    }
  },
  methods: {
    subUns() {
      console.log(1111);
      let _this = this;
      wx.requestSubscribeMessage({
        tmplIds: ["1cOgMwa9YvMAv2IdhouINuiKWFBhyZATMh0fXtanKvo"],
        success(res) {
          console.log("授权", res);
          let productList = [
            _this.detail
          ]
          commonStore.commit('orderProduct', productList)
          mpvue.navigateTo({url: '../order/main'})
        },
        fail(err){
          wx.showToast({
            title: "您将不会接收消息",
            icon: "success",
            duration: 2000
          });
          let productList = [
            _this.detail
          ]
          commonStore.commit('orderProduct', productList)
          mpvue.navigateTo({
            url: '../order/main',
            success: function(e) {
              let page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      });
    },
    decrement(){
      if(this.num>1){
        this.num --
      }
    },

    increment(){
      if(this.num < this.detail.stock){
        this.num ++
      }
    },
    buyNow(){
      if(this.num == 0){
        wx.showToast({
          title: "请选择数量",
          icon: "none",
          duration: 2000
        });
        return
      }
      if(this.num>this.detail.stock){
        wx.showToast({
          title: "超出库存",
          icon: "none",
          duration: 2000
        });
        return
      }
      this.detail.count = this.num
      this.subUns();
    },
    addCar(){
      if(this.num == 0){
        wx.showToast({
          title: "请选择数量",
          icon: "none",
          duration: 2000
        });
        return
      }
      if(this.num>this.detail.stock){
        wx.showToast({
          title: "超出库存",
          icon: "none",
          duration: 2000
        });
        return
      }
      this.detail.count = this.num
      this.detail.sel = false
      commonStore.commit('pushCarProduct', this.detail);
      this.bool.showSuccess = true;
      setTimeout(()=>{
        this.bool.showSuccess = false;
      }, 2000)
    },
    backHome(){
      let url = "../index/main";
      wx.switchTab({url});
    },
    toCar(){
      let url = "../car/main";
      wx.switchTab({url});
    },
    // 获取商品详情
    getPorductDetail(id) {
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "product/singleproduct",
          body: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("成功了1111", res);
            _this.detail = res.data;

            // _this.getShopDetail(_this.detail.shop_id);
          }
        });
    },

    // 商铺详情
    getShopDetail(id) {
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "adminshop/singleShop",
          body: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("成功了1111", res);
            _this.shopDetail = res.data;
          }
        });
    },
  },

  mounted(){

  },
  onLoad(options){
    console.log('options', options)
    this.id = options.id;
    this.getPorductDetail(this.id);
  }
}
</script>

<style scoped>
.title{
  margin: 20rpx 40rpx;
  background-color: rgb(255,251,239);
  color: rgb(255, 200, 37);
  display: flex;
  padding: 20rpx 30rpx;
  border-radius: 20rpx;
}

.title i{
  font-size: 20px;
  margin-right: 10rpx;
}

.swiperBox{
  /* padding: 40rpx; */
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  margin: 10rpx 40rpx 0 40rpx;
  /* width: 100%; */
}

.item1{
  background-color: rgb(229,229,229);
  /* text-align: center; */
  width: 100%;
}

.item1 img{
  width: 100%;
}

.infoTop{
  display: flex;
  padding: 20rpx 40rpx 0 20rpx;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
}

.infoTop .price{
  display: flex;
}

.infoTop .price span{
  font-size: 20px;
  color: rgba(255, 146, 59, 1);
  display: flex;
  position: relative;
  top: -5px;
}

.infoTop .price i{
  font-size: 14px;
  color: rgba(255, 146, 59, 1);
  margin-top: 2rpx;
}

.proTitle{
  font-weight: bold;
  width: 100%;
  padding: 10rpx 40rpx;
  box-sizing: border-box;
  line-height: 25px;
  border-bottom: 1px solid #f5f5f5;
}

.specifications{
  padding: 20rpx 40rpx;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
}

.specifications .name,.specifications .unit{
  line-height: 40px;
  margin-right: 20rpx;
}

.count{
  display: flex;
  margin-right: 20rpx;
  margin-top: 8rpx;
}

.count div{
  border: 1px solid #f5f5f5;
  padding: 0 20rpx;
  margin-left: -1px;
  line-height: 60rpx;
  height: 60rpx;
}

.count div:first-child{
  margin: 0;
}

.detail{
  width: 100%;
  padding: 20rpx 40rpx;
  box-sizing: border-box;
  margin-bottom: 150rpx;
}

.detailTitle{
  font-weight: bold;
  margin-bottom: 40rpx;
}

.buyNow{
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: rgb(244,244,244);
  padding: 20rpx;
  box-sizing: border-box;
  box-shadow: 10px 10px 10px 10px rgba(0,0,0,.30);
}

.buyNow ._navigator img{
  width: 35rpx;
}

.buyNow ._navigator{
  font-size: 12px;
  text-align: center;
  padding: 0 20rpx;
}

.buyNow .buyBtn{
  flex: 2;
}

.buyn{
  border-radius: 40px;
  background-color: #0ade7d;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
  line-height: 70rpx;
  height: 70rpx;
  margin-top: 5rpx;
  display: flex;
  overflow: hidden;
}

.detail img{
  width: 100%;
  display: flex;
}

.alert{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.5);
  padding: 20rpx 40rpx;
  color: #fff;
  border-radius: 10rpx;
}

.buyn .add,.buyn .buy{
  width: 50%;
  text-align: center;
  box-sizing: border-box;
}

.buyn .add{
  background-image: linear-gradient(to right, #fcca0b , #fe9903);
}

.buyn .buy{
  background-image: linear-gradient(to right, #ff7703 , #ff4b00);
}

.weight,.num{
  line-height: 50rpx;
}

.infoTop .iconfenxiang{
  margin-top: 10rpx;
}

.title .titles{
  line-height: 45rpx;
}

.weui-input{
  width: 100rpx;
  margin-top: 8rpx;
  text-align: center;
}
</style>
