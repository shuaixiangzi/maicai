<template>
  <div class="orderBox">
    <div class="top clearfix">
      <checkbox-group bindchange="checkboxChange" class="fl">
        <label class="checkbox" v-for="(index, item) in items" :key="index">
          <checkbox :value="item.name" :checked="item.checked"/>{{item.value}}
        </label>
      </checkbox-group>
      <p class="fl" style="margin-right:20rpx">全选</p>
      
      <p class="fr">删除</p>
    </div>
    <div class="cardBox">
      <div class="proBox">
        <checkbox-group bindchange="checkboxChange" class="sel">
          <label class="checkbox" v-for="(index, item) in items" :key="index">
            <checkbox :value="item.name" :checked="item.checked"/>{{item.value}}
          </label>
        </checkbox-group>

        <div class="right">
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
    </div>

    <div class="buyNow">
      <p class="price">合计：<i>￥45</i></p>

      <div class="buyBtn">
        <div class="buyn" @click="buyNow()">立即下单</div>
      </div>
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
      items: [
        { name: 'usa', value: '全选' },
      ],
    }
  },
  computed: {
   
  },
  methods: {
    buyNow(){
      mpvue.navigateTo({url: '../order/main'})
    },
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    }
  },

  mounted(){
    
  }
}
</script>

<style scoped>
@import url('./order.css');
.orderBox{
  /* padding: 40rpx; */
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

.top{
  padding: 10rpx 40rpx;
}

._checkbox-group{
  display: inline-block;
}

.right{
  display: flex;
  flex: 2;
  background-color: rgb(247,247,247);
  padding: 20rpx;
  margin-left: 20rpx;
}

.proBox{

}

.sel{
  margin-top: 70rpx;
}
</style>
