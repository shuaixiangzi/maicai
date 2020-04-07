<template>
  <div class="counter-warp">
    <div class="myInfo">
      <div class="header"><img :src="userInfo.avatarUrl"/></div>
      <div class="infoBox">
        <p>{{userInfo.nickName}}</p>
        <p class="phoneBox">13295327761</p>
      </div>
    </div>

    <div class="func">
      <div class="clearfix top">
        <div class="fl">我的订单</div>
        <div class="fr more">全部<img src="../../../static/images/right.png" mode="widthFix"/></div>
      </div>
      <div class="bottom">
        <div class="funcBox">
          <a>
            <i class="iconfont icondaifukuan"></i>
            <p>待付款</p>
          </a>
        </div>
        <div class="funcBox">
          <a>
            <i class="iconfont icondaifahuo"></i>
            <p>待发货</p>
          </a>
        </div>
        <div class="funcBox">
          <a>
            <i class="iconfont icongedongzuo-"></i>
            <p>派送中</p>
          </a>
        </div>
        <div class="funcBox">
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
        <div class="fr more">全部<img src="../../../static/images/right.png" mode="widthFix"/></div>
      </div>
      <div class="addressBottom">
        <p class="namePhoneBox"><span class="name">钢弹</span> <span>13569337869</span></p>
        <p>李沧区 金水路 春和景明一期 2号楼2单元 1602户</p>
      </div>
    </div>
    <div class="func">
      <div class="clearfix top">
        <div class="fl">我的优惠券</div>
        <div class="fr more">全部<img src="../../../static/images/right.png" mode="widthFix"/></div>
      </div>
      <div class="quanBottom">
        <ul>
          <li>
            <p class="quanName">10元优惠券</p>
            <p class="detail">满100元使用</p>
          </li>
          <li>
            <p class="quanName">5元优惠券</p>
            <p class="detail">满50元使用</p>
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

export default {
  computed: {
    count () {
      return store.state.count
    },
    userInfo () {
      return indexStore.state.userInfo
    }
  },
  methods: {
  },

  mounted(){
    console.log('用户信息', this.userInfo);
  }
}
</script>

<style>
@import url('./font.css');

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
  background-color: #4adf9f;
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
  background-color: rgba(249,249,249);
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
  border-bottom: #dcdcdc;
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
  padding: 20rpx 20rpx;
}

.bottom a p{
  font-size: 14px;
}

.addressBottom{
  padding:0 20rpx 20rpx 20rpx;
  text-align: left;
  color: #666;
  font-size: 14px;
}

.namePhoneBox{
  margin-bottom: 10rpx;
}

.quanBottom{
  padding: 20rpx;
}
</style>
