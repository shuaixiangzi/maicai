<template>
  <div class="orderBox">
    <ul class="quanBox" v-if="quan.length > 0">
      <li v-for="(item, index) in quan" :key="index">
        <p class="value">{{item.coupon.money}}元优惠券</p>
        <p class="valid">满{{item.coupon.min_money}}元使用</p>

        <!-- <div class="sel">选择</div> -->
      </li>
    </ul>
    <div v-else style="text-align: center;">
      暂无数据
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
      addressIndex: 1,
      quan: []
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
    },
    getAllQuan(){
      let _this = this;
      this.$fly.request({
          method:"get", //post/get 请求方式
          url:"coupon/couponlist",
          body:{
            type: 1,
            page: 1,
            pagesize: 100
          }
        }).then(res =>{
          console.log(res)
          if (res.status === 100) {
            console.log("我的优惠券", res);
            _this.quan = res.data;
          }
      })
    }
  },

  mounted(){
    this.getAllQuan()
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
