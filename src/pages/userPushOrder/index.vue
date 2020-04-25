<template>
  <div>
    <div class="fm">
      <img :src="detail.snap_img.url"/>
    </div>
    <ul class="orderDetail">
      <li>
        <div class="left">订单编号:</div>
        <div class="right">{{detail.order_no}}</div>
      </li>
      <li>
        <div class="left">订单状态:</div>
        <div class="right">{{status}}</div>
      </li>
      <li v-for="(item, index) in detail.rowproduct" :key="index">
        <div class="left">商品信息{{index+1}}:</div>
        <div class="right">{{item.name + '（' +item.weight + '每份' + '），共' + item.counts + '份'}}</div>
      </li>

      <li>
        <div class="left">总金额:</div>
        <div class="right">{{totalPrice}}</div>
      </li>
    </ul>
    <get-token @tokenOk="tokenOk"></get-token>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import indexStore from '../index/store'
import commonStore from '../../store'
import getToken from '@/components/getToken.vue'

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
      orderList: [],
      id: 0,
      detail: {},
      inter: 0,
      marker:[],
      qishou: require('../../../static/images/qishou.png'),
      jia: require('../../../static/images/jia.png'),
      polyline: [{
        points: [],
        color:"#0ade7d",
        width: 2,
        dottedLine: true
      }],
      detail:{
        snap_img:{}
      },
      status: '',
      totalPrice: 0
    }
  },
  components: {
    getToken
  },
  computed: {
    count () {
      return store.state.count
    },
    userInfo () {
      return indexStore.state.userInfo
    },
    phone (){
      return commonStore.state.phone
    },
    userType (){
      return commonStore.state.userType
    },
    userTypeName (){
      return commonStore.state.userTypeName
    },
    searchOrder (){
      return commonStore.state.searchOrder
    }
  },
  methods: {
    // 推送的详情
    getTsOrderDetail(){
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "order/singlejumporder",
          body: {
            id: this.id
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 100) {
            console.log("获取", res);
            _this.detail = res.data;
            // rowproduct
            if(_this.detail.status == 1){
              _this.status = '未付款';
            }
            else{
              if(_this.detail.dadaorderstatus === 2){
                 _this.status = '等待发货';
              }
              if(_this.detail.dadaorderstatus === 3){
                _this.status = '派送中';
              }
              if(_this.detail.dadaorderstatus === 4){
                _this.status = '已完成';
              }
            }

            if(_this.userType == 1){ // 市场
              _this.totalPrice = _this.detail.total_price;
            }
            if(_this.userType == 2){ // 商铺
              let total = 0;
              for(let i = 0; i<_this.detail.rowproduct; i++){
                total = total + _this.detail.rowproduct[i][totalPrice]
              }

              _this.totalPrice = _this.detail.total_price;
            }
            if(_this.userType == 3){ // 消费者
              _this.totalPrice = _this.detail.total_price;
            }
          }
        });
    },
  },

  mounted(){

  },
  onLoad(options) {
    this.id = options.orderId
    console.log(this.id)
    /* this.getOrderDetail();
    this.getTsOrderDetail();
    this.cancelOrder(); */
    this.getTsOrderDetail();

  },
  onUnload(){
    console.log('销毁')
    clearInterval(this.inter);
  },

  onReachBottom(){

  }
}
</script>

<style scoped>
@import url('./order.css');
page{
  background-color: rgb(249, 249, 249);
}
map{
  width: 100%;
  height: 500rpx;
  border-bottom: 1px solid #dcdcdc;
}
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

.orderDetail{
  margin: 40rpx;
}

.orderDetail li{
  display: flex;
  border-bottom: 1px solid #ececec;
  line-height: 100rpx;
}

.orderDetail li .left{
  margin-right: 40rpx;
  font-weight: bold;
}

.fm{
  width: 100%;
  border-bottom: 1px solid #dcdcdc;
}

.fm img{
  width: 100%;
}
</style>
