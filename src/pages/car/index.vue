<template>
  <div class="orderBox">
    <div class="top clearfix">
      <checkbox-group bindchange="checkboxChange" class="fl">
        <label class="checkbox" v-for="(index, item) in items" :key="index">
          <checkbox value="1" :checked="item.checked"/>{{item.value}}
        </label>
      </checkbox-group>
      <p class="fl" style="margin-right:20rpx">全选</p>
      
      <p class="fr">删除</p>
    </div>
    <div class="cardBox">
      <div class="proBox" v-for="(carItem, carIndex) in car" :key="carIndex">
        <checkbox-group @change="bindchange" class="sel">
          <label class="checkbox">
            <checkbox :value="carItem.sel"/>
          </label>
        </checkbox-group>

        <div class="right">
          <div class="imgBox">
            <img :src="carItem.main_img_url"  mode='widthFix'/>
          </div>

          <div class="infoBox">
            <p class="name">{{carItem.name}}</p>
            <p class="weight">约{{carItem.weight}}kg</p>
            <p class="unit">{{carItem.price}}元/份</p>

            <div class="num">×{{carItem.count}}</div>
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
import commonStore from '@/store'

export default {
  data(){
    return {
      num: 1,
      items: [
        { name: 'usa', value: 1 },
      ],
    }
  },
  computed: {
    car() {
      return commonStore.state.car;
    }
  },
  methods: {
    buyNow(){
      let buy = []

      for(let i = 0; i< car.length; i++){
        if(car[i].sel === 1){
          buy.push(car);
        }
      }
      let productList = buy
      commonStore.commit('orderProduct', productList)
      mpvue.navigateTo({url: '../order/main'})
    },
    bindchange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e)
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

page{
  background-color: #f6f6f6;
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

.proBox .selBox{
  margin-top: 65rpx;
}

.proBox .imgBox{
  width: 165rpx;
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
  margin: 10rpx 0;
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
  margin-top: 6rpx;
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

.top{
  padding: 20rpx 40rpx 15rpx 40rpx;
  line-height: 44rpx;
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

.selBox{
  width: 40rpx;
  float: left;
  margin-right: 20rpx;
  margin-top: 2rpx;
}
.selBox img{
  width: 100%;
}

</style>
