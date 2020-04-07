<template>
  <div class="counter-warp">
    <div class="myInfo">
      <div class="header"><img :src="userInfo.avatarUrl"/></div>
      <div class="infoBox">
        <p>{{userInfo.nickName}}</p>
        <p class="phoneBox">13295327761</p>
      </div>
    </div>

    <div class="myOrders">
      <div class="clearfix top">
        <div class="fl">我的订单</div>
        <div class="fr more">全部<img src="../../../static/images/right.png" mode="widthFix"/></div>
      </div>
      <div class="bottom">
        <div>
          <a>
            <svg t="1586172525900" class="icon" viewBox="0 0 1266 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2105" width="200" height="200"><path d="M701.88595906 992h-508.24903125C104.51477375 992 32 913.02908938 32 815.98099812V208.03273813C32 110.97091062 104.51477375 32.01373625 193.63692781 32.01373625h785.23101657c89.12215406 0 161.63692781 78.97091062 161.63692781 176.01900188v237.0638325a24.03880594 24.03880594 0 0 1-48.07761094 0V208.03273813c0-70.55046-50.94853125-127.94139094-113.55931687-127.94139094H193.63692781C131.02614219 80.09134719 80.07761094 137.48227812 80.07761094 208.03273813v607.94826c0 70.55046 50.94853125 127.94139094 113.55931687 127.94139093h508.24903125a24.03880594 24.03880594 0 0 1 0 48.07761094z" p-id="2106"></path><path d="M1116.46606625 329.31194656H71.49232343a24.03880594 24.03880594 0 0 1 2e-8-48.07761093h1044.9737428a24.03880594 24.03880594 0 0 1 0 48.07761093zM966.80733219 982.85151781c-139.09539657 0-252.25635657-113.16096-252.2563575-252.2563575s113.16096-252.25635657 252.2563575-252.25635656 252.25635657 113.16096 252.25635656 252.25635656-113.16096 252.25635657-252.25635656 252.2563575z m0-456.44883937c-112.63897406 0-204.17874563 91.5947175-204.17874563 204.17874562S854.22330313 934.76016969 966.80733219 934.76016969s204.17874563-91.58098031 204.17874562-204.17874563-91.5947175-204.17874563-204.17874562-204.17874562z" p-id="2107"></path><path d="M241.98926844 678.190565a24.03880594 24.03880594 0 0 1-24.03880594-24.03880594V315.75405969a24.03880594 24.03880594 0 0 1 48.07761094 0v280.36115531l58.94315156-58.98436125a24.03880594 24.03880594 0 1 1 33.99773906 33.99774l-99.98769468 99.98769375a24.03880594 24.03880594 0 0 1-16.99200094 7.0742775z" p-id="2108"></path><path d="M441.96465689 678.190565a24.03880594 24.03880594 0 0 1-17.0057372-7.04680406l-99.98769469-99.98769469a24.04979437 24.04979437 0 1 1 33.99773906-34.0252125l58.94315156 58.94315156V315.75405969a24.03880594 24.03880594 0 0 1 48.07761094 0v338.39769937a24.03880594 24.03880594 0 0 1-24.03880594 24.03880594zM1102.72960625 766.36490375h-147.66694781a24.03880594 24.03880594 0 0 1-24.03880594-24.03880594V601.37627844a24.03880594 24.03880594 0 1 1 48.07761095 0v116.92475062h123.6281428a24.03880594 24.03880594 0 0 1 0 48.07761094z" p-id="2109"></path></svg>
            <p>待发货</p>
          </a>
        </div>
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
  margin-top: 30px;
  margin-left: 40rpx;
  font-size: 16px;
}

.phoneBox{
  margin-top: 5px;
}

page{
  background-color: rgba(249,249,249);
}

.myOrders{
  margin: 40rpx;
  box-sizing: border-box;
  background-color: #fff;
}

.more img{
  width: 20rpx;
}

.myOrders .top{
  padding: 20rpx;
  border-bottom: #dcdcdc;
}

.myOrders .bottom{
  display: flex;
  flex-direction: row;
  justify-content:center;
}
</style>
