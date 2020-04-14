<template>
  <div class="orderBox">
    <div class="cardBox">
      <p class="title">共1件商品</p>

      <div class="proBox">
        <div class="imgBox">
          <img src="../../../static/images/baicai.png"  mode='widthFix'/>
        </div>

        <div class="infoBox">
          <p class="name">当日新鲜先切猪肉</p>
          <p class="weight">约1kg</p>
          <p class="unit">45元/份</p>
          <div class="num">×1</div>
        </div>
      </div>
    </div>

    <div class="cardBox" @click="selAddr()">
      <p class="title">收获地址</p>
      <p>请选择收货地址</p>

      <i class="iconfont icon"></i>
    </div>

    <div class="cardBox" @click="selQuan()">
      <p class="title">优惠券</p>
      <p>请选择优惠券</p>

      <i class="iconfont icon"></i>
    </div>

    <div class="cardBox">
      <p>配送费：</p>

      <div class="pricer">￥ 4</div>
    </div>

    <div class="buyNow">
      <p class="price">合计：<i>￥45</i></p>

      <div class="buyBtn">
        <div class="buyn" @click="buyNow()">立即购买</div>
      </div>
    </div>

    <div class="selAddress" v-show="bool.selAddr">
      <p class="title">选择地址</p>

      <ul class="addressBox">
        <li :class="{'active': addressIndex === 1}">
          <div class="top">
            <p class="name">钢弹</p>
            <p class="phone">13582237777</p>
          </div>
          <div class="addr">李沧区 金水路 春和景明一期 2号楼2单元1602户</div>
        </li>
        <li>
          <div class="top">
            <p class="name">钢弹</p>
            <p class="phone">13582237777</p>
          </div>
          <div class="addr">李沧区 金水路 春和景明一期 2号楼2单元1602户</div>
        </li>
        <li>
          <div class="top">
            <p class="name">钢弹</p>
            <p class="phone">13582237777</p>
          </div>
          <div class="addr">李沧区 金水路 春和景明一期 2号楼2单元1602户</div>
        </li>
      </ul>
    </div>

    <div class="selAddress" v-show="bool.selQuan">
      <p class="title">选择优惠券</p>

      <ul class="quanBox">
        <li>
          <p class="value">10元优惠券</p>
          <p class="valid">满100元使用</p>

          <div class="sel">选择</div>
        </li>
        <li>
          <p class="value">5元优惠券</p>
          <p class="valid">满50元使用</p>

          <div class="sel">选择</div>
        </li>
      </ul>
    </div>

   
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import indexStore from '../index/store'

export default {
  data(){
    return {
      num: 1,
      bool: {
        selAddr: false,
        selQuan: false
      },
      addressIndex: 1
    }
  },
  computed: {
   
  },
  methods: {
    buyNow(){
      mpvue.navigateTo({url: '../order/main'})
    },
    selAddr(){
      this.bool.selAddr = !this.bool.selAddr;
    },
    selQuan(){
      this.bool.selQuan = !this.bool.selQuan;
    }
  },

  mounted(){
    
  }
}
</script>

<style scoped>
@import url('./order.css');
.orderBox{
  padding: 40rpx;
}

.cardBox{
  padding: 30rpx;
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
}

.proBox .imgBox{
  width: 200rpx;
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
  font-size: 14px;
}

.proBox .infoBox .num{
  position: absolute;
  right: 0;
  bottom: 20rpx;
  color: #999;
  font-size: 14px;
}

.proBox .infoBox .name,.proBox .infoBox .unit{
  color: #666;
  font-size: 14px;
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
  background-color: #4adc9f;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
  line-height: 60rpx;
  height: 60rpx;
  margin-top: 5rpx;
}

.buyNow .price{
  display: flex;
  line-height: 60rpx;
}

.buyNow .price i{
  color: red;
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
  font-size: 16px;
  margin-right: 20rpx;
}

.addressBox li{
  line-height: 60rpx;
  padding: 20rpx;
  border-bottom: 1px solid #ddccdd;
}

.addressBox li.active{
  color: #4adc9f;
}

.addressBox li .addr{
  color: #999;
}

.addressBox .top .phone{
  margin-top: 10rpx;
}

.addressBox li:last-child{
  border-bottom: 0;
}

.addressBox li.active .addr{
  color: #4adc9f;
}

.quanBox li{
  padding: 40rpx;
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
  margin-bottom: 20rpx;
  font-size: 16px;
  color: rgb(134,107,0);
}

.quanBox .valid{
  color: #fff;
}

.quanBox .sel{
  position: absolute;
  right: 50rpx;
  top: 65rpx;
  font-weight: bold;
  color: rgb(134,107,0);
}
</style>
