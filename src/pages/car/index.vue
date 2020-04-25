<template>
  <div class="orderBox">
    <div class="top clearfix">
      <div class="selBox" @click="selNow()">
        <img src="../../../static/images/sel.png" mode="widthFix" v-if="selAll"/>
        <img src="../../../static/images/nosel.png" mode="widthFix" v-else/>
      </div>
      <p class="fl" style="margin-right:20rpx">全选</p>

      <p class="fr" @click="delCar()">删除</p>
    </div>
    <div class="cardBox">
      <div class="proBox" v-for="(carItem, carIndex) in thisCar" :key="carIndex">
        <div class="selBox" @click="selThisNow(carIndex)" style="margin-top:60rpx">
          <img src="../../../static/images/sel.png" mode="widthFix" v-if="carItem.sel == true"/>
          <img src="../../../static/images/nosel.png" mode="widthFix" v-else/>
        </div>
        <div class="right">
          <div class="imgBox">
            <img :src="carItem.main_img_url.url"  mode='widthFix'/>
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
      <p class="price">合计：<i>￥{{total}}</i></p>

      <div class="buyBtn">
        <div class="buyn" @click="buyNow()">立即下单</div>
      </div>
    </div>
    <get-token @tokenOk="tokenOk"></get-token>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import indexStore from '../index/store'
import commonStore from '@/store'
import getToken from '@/components/getToken.vue'

export default {
  data(){
    return {
      num: 1,
      items: [
        { name: 'usa', value: 1 },
      ],
      selAll: false,
      thisCar: [],
      total: 0
    }
  },
  computed: {
    car() {
      return commonStore.state.car;
    }
  },
  components: {
    getToken
  },
  methods: {
    delCar(){
      for(let i = 0; i < this.thisCar.length; i++){
        if(this.thisCar[i].sel == true){
          this.thisCar.splice(i , 1);
        }
      }
    },
    addtoCar() {
      let buy = []
      for(let i = 0; i< this.thisCar.length; i++){

        if(this.thisCar[i].sel === true){
          buy.push(this.thisCar[i]);
        }
      }
      let productList = buy
      commonStore.commit('orderProduct', productList)
      mpvue.navigateTo({url: '../order/main'})
      
    },
    buyNow(){
      let _this = this;
      let buy = []
      wx.requestSubscribeMessage({
        tmplIds: ["1cOgMwa9YvMAv2IdhouINuiKWFBhyZATMh0fXtanKvo"],
        success(res) {
          console.log("授权", res);
          _this.addtoCar();
        },
        fail(err){
          wx.showToast({
            title: "如果拒绝订阅消息提醒，您将不会收到下单消息",
            icon: "success",
            duration: 2000
          });
          _this.addtoCar();
        }
      });
      
    },
    bindchange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e)
    },
    selNow(){
      this.selAll = !this.selAll;
      console.log('所有商品', this.thisCar)
      for(let i =0; i<this.thisCar.length;i++){
        this.thisCar[i].sel = this.selAll;
      }
      this.setPrice();
    },
    selThisNow(index){
      console.log('选择', this.thisCar[index])
      /* let obj = Object.assign()
      for() */
      this.thisCar[index].sel = !this.thisCar[index].sel;
      this.$set(this.thisCar[index], 'set', !this.thisCar[index].sel);
      this.setPrice();

    },
    setPrice(){
      this.total = 0;
      for(let i = 0;i<this.thisCar.length;i++){
      if(this.thisCar[i].sel === true){
        this.total += this.thisCar[i].price * this.thisCar[i].count
      }
    }
    }
  },

  mounted(){
    console.log(this.thisCar);
  },
  onLoad(){
    this.thisCar = this.car
    this.setPrice();
  }
}
</script>

<style scoped>
@import url('./order.css');
.orderBox{
  /* padding: 40rpx; */
}

page{
  background-color: #fff;
}

.cardBox{
  padding: 10rpx 30rpx;
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
  margin-top: 20rpx;
}

.selBox{
  margin-top: 65rpx;
  width: 40rpx;
  height: 40rpx;
  overflow: hidden;
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
  margin-top: 0rpx;
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
