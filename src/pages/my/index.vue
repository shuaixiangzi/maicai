<template>
  <div class="counter-warp">
    <div class="myInfo">
      <div class="header"><img :src="userInfo.avatarUrl"/></div>
      <div class="infoBox">
        <p>{{userInfo.nickName ? userInfo.nickName: '翟子'}}</p>
        <p class="phoneBox">{{phone}}</p>
      </div>
    </div>

    <div class="func">
      <div class="clearfix top">
        <div class="fl">我的订单</div>
        <div class="fr more" @click="toMyorder()">全部<img src="../../../static/images/right.png" mode="widthFix"/></div>
      </div>
      <div class="bottom">
        <div class="funcBox" @click="search(1, 0)">
          <a>
            <i class="iconfont icondaifukuan"></i>
            <p>待付款</p>
          </a>
        </div>
        <div class="funcBox" @click="search(0, 2)">
          <a>
            <i class="iconfont icondaifahuo"></i>
            <p>待发货</p>
          </a>
        </div>
        <div class="funcBox" @click="search(0, 3)">
          <a>
            <i class="iconfont icongedongzuo-"></i>
            <p>派送中</p>
          </a>
        </div>
        <div class="funcBox" @click="search(0, 4)">
          <a>
            <i class="iconfont iconshiliangzhinengduixiang"></i>
            <p>已完成</p>
          </a>
        </div>
      </div>
    </div>

    <div class="func">
      <div class="clearfix top">
        <div class="fl">地址管理</div>
        <div class="fr more"  @click="toAddress()">全部<img src="../../../static/images/right.png" mode="widthFix"/></div>
      </div>
      <div class="addressBottom">
        <p class="namePhoneBox"><span class="name">{{address.name}}</span> <span>{{address.mobile}}</span></p>
        <p>{{address.address}}</p>
      </div>
    </div>
    <div class="func">
      <div class="clearfix top">
        <div class="fl">我的优惠券</div>
        <div class="fr more" @click="toQuan()">全部<img src="../../../static/images/right.png" mode="widthFix"/></div>
      </div>
      <div class="quanBottom">
        <ul class="quanList">
          <li v-for="(item, i) in quan" :key="i">
            <p class="quanName">{{item.money}} 元优惠券</p>
            <p class="detail">满{{item.min_money}}元可用</p>
          </li>
        </ul>
      </div>
    </div>
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
      quan:[],
      address: {

      }
    }
  },
  computed: {
    count () {
      return store.state.count
    },
    userInfo () {
      return indexStore.state.userInfo
    },
    phone (){
      return indexStore.state.phone
    }
  },
  methods: {
    toAddress(){
      mpvue.navigateTo({url: '../address/main'})
    },
    toQuan(){
      mpvue.navigateTo({url: '../quan/main'})
    },
    toMyorder(){
      mpvue.navigateTo({url: '../orderList/main'})
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
            _this.quan = res.data.data;
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
            let data = res.data;
            for(let i = 0; i < data.length; i++){
              if(data[i].default === 1){
                _this.address = data[i];
                console.log(2222, _this.address)
              }
            }
          }
      })
    },
    search(paystatus, deliverstatus){
      commonStore.commit('searchPaystatus', paystatus);
      commonStore.commit('searchDeliverstatus', deliverstatus);

      let url = "../orderList/main";
      mpvue.navigateTo({url});
    }
  },

  mounted(){
    console.log('用户信息', this.userInfo);
    this.getAllQuan();
    this.getAllAddress();
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  background-color: rgba(249,249,249);
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

.myInfo{
  background-color: #0ade7d;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 0 90rpx;
  overflow: hidden;
  color: #fff;
}

.header{
  width: 122rpx;
  height: 122rpx;
  border-radius: 122rpx;
  overflow: hidden;
  margin-top: 20px;
  float: left;
  background-color: #f5f5f5;
}

.header img{
  width: 100%;
  height: 100%;
}

.infoBox{
  float: left;
  text-align: left;
  margin-top: 25px;
  margin-left: 40rpx;
  font-size: 16px;
}

.phoneBox{
  margin-top: 5px;
}

page{
  background-color: #f6f6f6;
}

.func{
  margin: 40rpx;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 16px;
  border-radius: 5px;
  overflow: hidden;
}

.more{
  color: rgb(74, 233, 159);
}

.more img{
  width: 20rpx;
}

.func .top{
  padding: 20rpx;
  border-bottom: #f5f5f5;
}

.func .bottom{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
}

.bottom i{
  font-size: 30px;
  color: #666;
}

.bottom .funcBox{
  padding: 20rpx 40rpx;
}

.funcBox p{
  color: #999;
}

.bottom a p{
  font-size: 14px;
}

.addressBottom{
  padding:0 20rpx 20rpx 20rpx;
  text-align: left;
  color: #999;
  font-size: 14px;
}

.namePhoneBox{
  margin-bottom: 10rpx;
}

.namePhoneBox .name{
  font-weight: bold;
  margin-right: 20rpx;
  color: #666;
  font-size: 14px;
}

.namePhoneBox .phone{
  margin-top: 3rpx;
}

.quanBottom{
  padding: 20rpx;
}

.quanList{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.quanList li{
  flex: 1;
  width: 48%;
  min-width: 48%;
  max-width: 48%;
  box-sizing: border-box;
  padding: 20rpx 0;
}

.quanList li:nth-of-type(2n-1){
  background-color: rgb(255, 220, 81);
}

.quanList li:nth-of-type(2n){
  background-color: rgb(255, 121, 81);
}

.quanList li p:first-child{
  margin-bottom: 5rpx;
  color: rgb(176,41,0);
}

.quanList .detail{
  color: #fff;
}

.infoBox .name{
  font-size: 14px;
}
</style>
