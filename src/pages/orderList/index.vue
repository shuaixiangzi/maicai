<template>
  <div>
    <ul class="tabs">
      <li :class="{'active': (deliverstatus == 0 && paystatus == 0) || (deliverstatus == undefined && paystatus == undefined)}" @click="getOrderList(0,0,1,10)">全部</li>
      <li :class="{'active': paystatus === 1}" @click="getOrderList(1,0,1,10)">待付款</li>
      <li :class="{'active': deliverstatus === 1}" @click="getOrderList(2,1,1,10)">待接单</li>
      <li :class="{'active': deliverstatus === 2 }" @click="getOrderList(2,2,1,10)">待发货</li>
      <li :class="{'active': deliverstatus === 3}" @click="getOrderList(0,3,1,10)">派送中</li>
      <li :class="{'active': deliverstatus === 4}" @click="getOrderList(0,4,1,10)">已完成</li>
    </ul>

    <ul class="orderList">
      <li v-for="(item, index) in orderList" :key="index" class="orderItem">
        <div class="orderStatus">
          <p v-if="item.status === 1">等待付款</p>{{item.status }}{{item.dadaorderstatus}}
          <p v-if="item.status === 2 && (item.dadaorderstatus === 1)">等待接单</p>
          <p v-if="item.status === 2 && (item.dadaorderstatus === 2)">等待发货</p>
          <p v-if="item.status === 2 && item.dadaorderstatus === 3">派送中</p>
          <p v-if="item.status === 2 && item.dadaorderstatus === 4">已完成</p>
        </div>
        <div class="proBox" v-for="(item2, index2) in item.snap_items" :key="index2">
          <div class="imgBox">
            <img :src="item2.imgurl.url"  mode='widthFix'/>
          </div>

          <div class="infoBox">
            <p class="name">{{item2.name}}</p>
            <p class="weight">约{{item2.weight}}kg</p>
            <p class="unit">{{item2.price}}元/份</p>
            <div class="num">× {{item2.count}}</div>
          </div>
        </div>

        <div class="funcBox clearfix" v-if="item.status === 1 || (item.status === 2 && item.dadaorderstatus === 3)">
          <ul class="btnList clearfix" v-if="item.status === 1">
            <li @click="cancelOrder(item.id)">取消订单</li>
            <li class="active" @click="buyNow(item.id)">付款</li>
          </ul>

          <ul class="btnList clearfix" v-if="item.status === 2 && item.dadaorderstatus === 3">
            <li class="active" @click="lookPaisong(item.id)">查看派送状态</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import indexStore from '../index/store'
import commonStore from '../../store'

export default {
  data(){
    return {
      num: 1,
      bool: {
        selAddr: false,
        selQuan: false
      },
      addressIndex: 1,
      page: 1,
      size: 10,
      paystatus: 0,
      deliverstatus: 0,
      orderList: []
    }
  },
  computed: {
    searchPaystatus (){
      return commonStore.state.searchPaystatus
    },
    searchDeliverstatus (){
      return commonStore.state.searchDeliverstatus
    }
  },
  methods: {
    getWei(){
      this.getOrderList(0,2,1,10)
      this.getOrderList(0,1,1,10)
    },
    // 获取订单
    getOrderList(paystatus,deliverstatus,page,pageSize){
      let _this = this;
      _this.paystatus = paystatus?paystatus:0;
      _this.deliverstatus = deliverstatus?deliverstatus:0;
      _this.page = page?page:1;
      _this.size = pageSize?pageSize:10;
      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "order/byuser",
          body: {
            type: 1,
            page: _this.page,
            pageSize: _this.size,
            param: {
              "paystatus": _this.paystatus,
              "deliverstatus": _this.deliverstatus
            }
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("获取", res.data.data);
            let data = res.data.data;
            _this.orderList = res.data.data;
            /* if(_this.orderList.length > 0){
              for(let i = 0; i < data.length; i++){
                _this.orderList.push(data[i]);
              }
            }
            else{
              if(_this.page>1){
                _this.page = _this.page - 1
              }
            } */
          }
        });
    },
    buyNow(id){
      let _this = this;
      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "pay/pre_order",
          body: {
            id: id,
            type: 0,
            paramid: 0
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
                mpvue.switchTab({url: '../orderList/main'})
              },
              fail(res2) {
                // alert(JSON.stringify(res2));
                console.log("失败", res2);
              },
            });
          }
        });
    },

    // 查看详情
    lookPaisong(id){
      commonStore.commit('searchOrder', id);

      let url = "../orderDetail/main";
      mpvue.navigateTo({url});
    },

    moreOrder(paystatus,deliverstatus,page,pageSize){
      let _this = this;
      _this.paystatus = paystatus?paystatus:0;
      _this.deliverstatus = deliverstatus?deliverstatus:0;
      _this.page = page?page:1;
      _this.size = pageSize?pageSize:10;
      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "order/byuser",
          body: {
            type: 1,
            page: _this.page,
            pageSize: _this.size,
            param: {
              "paystatus": _this.paystatus,
              "deliverstatus": _this.deliverstatus
            }
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            let data = res.data.data
            console.log("获取", res.data.data);
            // _this.orderList = data;
            if(_this.orderList.length > 0){
              for(let i = 0; i < data.length; i++){
                _this.orderList.push(data[i]);
              }
            }
            else{
              if(_this.page>1){
                _this.page = _this.page - 1
              }
            }
          }
        });
    },

    // 获取订单详情
    getOrderDetail(){
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "order/singleorder",
          body: {
            id: 590
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("获取", res);
          }
        });
    },

    // 推送的详情
    getTsOrderDetail(){
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "order/singlejumporder",
          body: {
            id: 590
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("获取", res);
          }
        });
    },

    // 取消订单
    cancelOrder(id){
      let _this = this;
      this.$fly
        .request({
          method: "post", //post/get 请求方式
          url: "order/deleteorder",
          body: {
            id: id
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("获取", res);
            _this.getOrderList(_this.paystatus,_this.deliverstatus,_this.page,_this.size);
          }
        });
    }
  },

  mounted(){

  },
  onLoad() {
    console.log(this.searchPaystatus,this.searchDeliverstatus)
    this.paystatus = this.searchPaystatus
    this.deliverstatus = this.searchDeliverstatus
    this.getOrderList(this.paystatus,this.deliverstatus,this.page,this.size);
    /* this.getOrderDetail();
    this.getTsOrderDetail();
    this.cancelOrder(); */
  },
  onReachBottom(){
    console.log('触底')
    console.log('触底');
    this.page = this.page + 1;
    this.moreOrder(this.paystatus,this.deliverstatus,this.page,this.size);
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

.tabs{
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 3rpx 3rpx 10rpx 3rpx rgba(0,0,0,.1);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}

.tabs li{
  padding: 40rpx 0;
  width: 20%;
  box-sizing: border-box;
  text-align: center;
  font-weight: bold;
}

.tabs .active{
  color: #0ade7d;
}

.orderItem{
  background-color: #fff;
  margin: 40rpx;
  border-radius: 10rpx;
}

.btnList{
  display: flex;
  float: right;
}

.btnList li{
  padding: 5rpx 20rpx;
  border: 1px solid #ddccdd;
  color: #666;
  border-radius: 60rpx;
  margin-left: 30rpx;
  cursor: pointer;
}

.btnList li.active{
  background-color: rgb(34, 213, 136);
  color: #fff;
  border: 1px solid  rgb(34, 213, 136);
}

.orderStatus{
  text-align: right;
  padding: 10rpx 20rpx;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20rpx;
  color: rgba(255, 121, 81, 1);
}

.proBox{
  padding: 20rpx;
}

.funcBox{
  padding: 20rpx;
  border-top: 1px solid #f0f0f0;
}

.orderList{
  margin-top: 150rpx;
}
</style>
