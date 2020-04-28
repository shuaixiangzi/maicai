<template>
  <div class="orderBox">
    <div class="cardBox">
      <p class="title">共{{orderProduct.length}}件商品</p>

      <div class="proBox" v-for="(item, index) in orderProduct" :key="index">
        <div class="imgBox">
          <img :src="item.main_img_url.url"  mode='widthFix'/>
        </div>

        <div class="infoBox">
          <p class="name">{{item.name}}</p>
          <p class="weight">约{{item.weight}}kg</p>
          <p class="unit">{{item.price}}元/份</p>
          <div class="num">× {{item.count}}</div>
        </div>
      </div>
    </div>

    <div class="cardBox func" @click="selAddr()">
      <p class="title">收货地址</p>
      <p v-if="!address.id">请选择收货地址</p>
      <div class="addressBottom" v-else>
        <p class="namePhoneBox"><span class="name">{{address.name}}</span> <span>{{address.mobile}}</span></p>
        <p>{{address.address}}</p>
      </div>

      <i class="iconfont icon"></i>
    </div>

    <div class="cardBox func" @click="selQuan()">
      <p class="title">优惠券</p>
      <p v-if="!quan.id">请选择优惠券</p>
      <p v-else>{{quan.money}}元优惠券</p>

      <i class="iconfont icon"></i>
    </div>

    <div class="cardBox">
      <p>配送费：</p>

      <div class="pricer">￥ {{freight}}</div>
    </div>

    <div class="buyNow">
      <p class="price">合计：<i>￥{{countPrice}}</i></p>

      <div class="buyBtn">
        <div class="buyn" @click="buyNow()">立即购买</div>
      </div>
    </div>

    <div class="selAddress" v-show="bool.selAddr">
      <p class="title">选择地址</p>

      <ul class="addressBox">

        <li v-for="(item, index) in addressList" :key="index" :class="{'active': item.id === address.id}" @click="selAddrSet(item)">
          <div class="selBox">
            <img src="../../../static/images/sel.png" mode="widthFix" v-if="item.id === address.id" class="sel"/>
            <img src="../../../static/images/nosel.png" mode="widthFix" v-else class="nosel"/>
          </div>
          <div class="top">
            <p class="name">{{item.name}}</p>
            <p class="phone">{{item.mobile}}</p>
          </div>
          <div class="addr">{{item.address}}</div>
        </li>

      </ul>
      <div class="noData">
        <i @click="toAddress()">前往添加</i>
      </div>
    </div>

    <div class="selAddress" v-show="bool.selQuan">
      <p class="title">选择优惠券</p>


      <ul class="quanBox">
        <li  style="background-color: #ddd;text-align: center;">
          <div @click="selQuanSet({})">不选择</div>
        </li>
        <li v-for="(item, index) in quanList" :key="index" @click="selQuanSet(item)">
          <p class="value">{{item.money}}元优惠券</p>
          <p class="valid">满{{item.min_money}}元使用</p>

          <div class="sel">选择</div>
        </li>
      </ul>
    </div>
    <!-- <text id='textId' data-userxxx='100' @tap='subUns()'>111111</text><br/>
    <text id='textId' data-userxxx='100' @tap='subUns2()'>22222</text><br/>
    <text id='textId' data-userxxx='100' @tap='subUns3()'>33333</text> -->
    <!-- <get-myphone></get-myphone> -->
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import indexStore from '../index/store'
import commonStore from '@/store'
import getMyphone from '@/components/getPhone.vue'
import addressStore from '../address/store'

export default {
  data(){
    return {
      num: 1,
      bool: {
        selAddr: false,
        selQuan: false
      },
      addressIndex: 1,
      address: {},
      addressList: [],
      quanList: [],
      quan: {},
      countPrice: 0,
      freight: 0,
      order_id: 0
    }
  },
  computed: {
   orderProduct() {
      return commonStore.state.orderProduct;
    }
  },
  components: {
    getMyphone
  },
  watch: {
  },
  methods: {
    toAddress(){
      addressStore.commit('saveAddress', {
        name:'',
        mobile: '',
        address: '',
        default: 0,
        lat:'',
        lng: ''
      })
      commonStore.commit('saveFromOrder', true);
      mpvue.navigateTo({
        url: '../address/add/main',
        success: function(e) {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        }
      })
    },
    buyNow(){
      let _this = this;
      if(!this.address.address){
        wx.showToast({
          title: "请选择地址",
          icon: "none",
          duration: 2000
        });
        return
      }
      if(!this.freight || this.freight<=-1){
        wx.showToast({
          title: "运费获取失败，请联系商家",
          icon: "none",
          duration: 2000
        });
        return
      }
      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "pay/pre_order",
          body: {
            id: _this.order_id,
            paramid: _this.quan.id?_this.quan.id:0
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
              wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success(res2) {
                _this.res = JSON.stringify(res2);
                console.log("成功", res2);
                mpvue.switchTab({url: '../index/main'})
              },
              fail(res2) {
                // alert(JSON.stringify(res2));
                console.log("失败", res2);
              },
            });
          }
        });
    },
    selAddr(){
      this.bool.selAddr = !this.bool.selAddr;
      this.bool.selQuan = false;
    },
    selAddrSet(data){
      this.address = data;
      this.bool.selAddr = false;
      this.getFreight();
    },
    selQuan(){
      this.bool.selQuan = !this.bool.selQuan;
    },

    selQuanSet(data){
      this.quan = data;
      this.bool.selQuan = false;
      this.setCoutPrice();
    },

    setCoutPrice(){

      let price = 0
      console.log('orderProduct', this.orderProduct)
      for(let i = 0; i<this.orderProduct.length; i++){
        price += this.orderProduct[i].price * this.orderProduct[i].count
      }
      if(this.quan.money){
        price = price -this.quan.money

        if(price<0){
          price = 0
        }
      }
      price = price + (this.freight-0)
      this.countPrice = price
    },

    subUns(){
      console.log(1111)
      wx.requestSubscribeMessage({
        tmplIds: ['1cOgMwa9YvMAv2IdhouINuiKWFBhyZATMh0fXtanKvo'],
        success (res) {
          console.log('授权', res)
        }
      })
    },
    subUns2(){
      console.log(222)
      wx.requestSubscribeMessage({
        tmplIds: ['azM-nmqRIOUZSroWAGvjWKgXgiqIKlkXD2Oo-2MVNOs'],
        success (res) {
          console.log('授权', res)
        }
      })
    },
    subUns3(){
      console.log(333)
      wx.requestSubscribeMessage({
        tmplIds: ['qnSX9tyjsszMYTZ8HfRrzq4-1VGLghdN8oJs4eIuGMs'],
        success (res) {
          console.log('授权', res)
        }
      })
    },

    // 下订单
    subOrder(){
      let _this = this;
      let product = []
      for(let i = 0;i< this.orderProduct.length;i++){
        let obj = {
          product_id: this.orderProduct[i].id,
          count: this.orderProduct[i].count
        }
        product.push(obj)
      }
      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "order",
          body: {
            products: product,
            address: this.address.id,
            quan: this.quan.id
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("下单", res);
            if(res.data.order_id == -1){
              let url = '../product/main'
              mpvue.navigateTo({url})
            }
            else{
              _this.order_id = res.data.order_id
              _this.getFreight();
            }

          }
        });
    },
    getAllQuan(){
      let _this = this;
      this.$fly.request({
          method:"get", //post/get 请求方式
          url:"admincoupon/couponlist",
          body:{
            type: 1,
            page: 1,
            pagesize: 2
          }
        }).then(res =>{
          console.log(res)
          if (res.status === 100) {
            console.log("成功了1111", res);
            _this.quanList = res.data.data;

            if(_this.quanList && _this.quanList.length > 0){
              // _this.quan = _this.quanList[0]
            }
          }
      })
    },
    getAllAddress(){
      let _this = this;
      this.$fly.request({
          method:"get", //post/get 请求方式
          url:"address",
          body:{}
        }).then(res =>{
          console.log('地址',res)
          if(res.status === 100){
            let data = res.data
            _this.addressList = data
            for(let i = 0; i < data.length; i++){
              if(data[i].default === 1){
                _this.address = data[i];
                console.log(2222, _this.address)
              }
            }

            if(data.length > 0){
               // 下订单
              _this.subOrder();
            }
          }
      })
    },

    // 获取配送费
    getFreight(){
      let _this = this;
      let weight = 0;
      for(let i = 0; i < this.orderProduct; i++){
        console.log('pro', this.orderProduct[i], this.orderProduct[i].weight * this.orderProduct[i].count)
        weight = weight + this.orderProduct[i].weight * this.orderProduct[i].count
      }

      if(!_this.address.name){
        return
      }
      this.$fly.request({
          method:"post", //post/get 请求方式
          url:"deliver/deliverfee",
          body:{
            receivername:_this.address.name,
            receiveraddress:_this.address.address,
            receiverphone:_this.address.mobile,
            receiverlat:_this.address.lat,
            receiverlng:_this.address.lng,
            orderid:_this.order_id,
            weight: 1
          }
        }).then(res =>{
          console.log('获取运费',res)
          if(res.status === 100){
           _this.freight = res.data;
           _this.setCoutPrice();
          }
      })
    }
  },

  mounted(){
    console.log(111)
  },
  onShow(){
    this.address = {};
    this.getAllAddress();
    this.getAllQuan();
  },

  onLoad() {
    this.quan = {};
    this.setCoutPrice();
  }
}
</script>

<style scoped>
@import url('./order.css');
.orderBox{
  padding: 30rpx 0;
}

.cardBox{
  padding:30rpx 40rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  position: relative;

}

.cardBox .title{
  font-weight: bold;
  margin-bottom: 20rpx;
}

.proBox{
  display: flex;
  margin-bottom: 20rpx;
}

.proBox .imgBox{
  width: 200rpx;
  height: 150rpx;
  overflow: hidden;
  margin-right: 20rpx;
}

.proBox .imgBox img{
  width: 100%;
}

.proBox .infoBox{
  flex: 2;
  position: relative;
}

.proBox .infoBox .weight{
  color: #999;
  margin: 15rpx 0;
  font-size: 12px;
}

.proBox .infoBox .num{
  position: absolute;
  right: 0;
  bottom: 20rpx;
  color: #999;
  font-size: 12px;
}

.proBox .infoBox .name{
  color: #666;
  font-size: 12px;
  margin-top: 5rpx;
}

.proBox .infoBox .unit{
  color: rgba(255, 146, 59, 1);
  font-size: 12px;
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
  flex: 1;
  padding: 0 40rpx;
}

.buyn{
  border-radius: 40px;
  background-image: linear-gradient(to right, #ff7703 , #ff4b00);
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
  line-height: 70rpx;
  height: 70rpx;
  margin-top: 5rpx;
  overflow: hidden;
}

.buyNow .price{
  display: flex;
  line-height: 60rpx;
}

.buyNow .price i{
  /* color: red; */
}

.cardBox .pricer{
  position: absolute;
  right: 20rpx;
  bottom: 25rpx;
  color: #666;
}

.selAddress{
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 10px 10px 10px 10px rgba(0,0,0,.30);
  padding: 40rpx;
  z-index: 100;
  background-color: #fff;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.selAddress .title{
  font-weight: bold;
  text-align: center;
  font-size: 16px;
}

.addressBox .top{
  display: flex;
}

.addressBox .top .name{
  font-weight: bold;
  font-size: 14px;
  margin-right: 20rpx;
}

.addressBox li{
  line-height: 60rpx;
  padding: 20rpx;
  border-bottom: 1px solid #ddccdd;
}

.addressBox li div{
  line-height: 50rpx;
}

.addressBox li.active{
}

.addressBox li .addr{
  color: #999;
}

.addressBox .top .phone{
  margin-top: 0;
}

.addressBox li:last-child{
  border-bottom: 0;
}

.addressBox li.active .addr{
  /* color: #0ade7d; */
}

.addressBox{
  overflow: scroll;
  height: 400rpx;
}

.quanBox li{
  padding: 20rpx 40rpx;
  margin-bottom: 20rpx;
  position: relative;
}

.quanBox li:nth-of-type(2n-1){
  background-color: rgb(255,220,81);
}

.quanBox li:nth-of-type(2n){
  background-color: rgb(255,121,81);
}

.selAddress .title{
  margin-bottom: 40rpx;
}

.quanBox .value{
  font-weight: bold;
  margin-bottom: 10rpx;
  font-size: 14px;
  color: rgba(0,0,0,.4);
}

.quanBox .valid{
  color: #fff;
}

.quanBox .sel{
  position: absolute;
  right: 50rpx;
  top: 45rpx;
  font-weight: bold;
  color: rgba(0,0,0,.4);
}

.addressBox li{
  position: relative;
  padding-left: 60rpx;
}

.selBox{
  width: 40rpx;
  position: absolute;
  left: 0rpx;
  top: 50rpx;
}

.selBox img{
  width: 100%;
}

.noData{
  text-align: center;
  line-height: 40rpx;
  background-color: #0ade7d;
  color: #fff;
  padding: 20rpx 0;
  border-radius: 10rpx;
}

.notSel{
  position: absolute;
  top: 45rpx;
  right: 37rpx;
}

.namePhoneBox .name{
  margin-right: 10rpx;
  font-weight: bold;
  font-size: 14px;
}
</style>
