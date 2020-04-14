<template>
  <div>
    <div class="searchBox">
      <div class="search">
         <i class="iconfont iconsearch"></i>
        <input :value="searchTxt" placeholder="搜索菜品" confirm-type='search' placeholder-style="color:#FFF" class="searchInput"/>
      </div>
    </div>

    <ul class="classBar" >
      <li :class="{'active': index === 1}" @click="selClass(1)">全部</li>
      <li :class="{'active': index === 2}" @click="selClass(2)">人气热卖</li>
      <li :class="{'active': index === 3}" @click="selClass(3)">店长优惠</li>
      <li :class="{'active': index === 4}" @click="selClass(4)">农户直供</li>
    </ul>

    <div class="proList">
      <ul class="leftBar">
        <li :class="{'active': leftIndex === 1}" @click="selLeftClass(1)">蔬菜</li>
        <li :class="{'active': leftIndex === 2}" @click="selLeftClass(2)">肉类</li>
        <li :class="{'active': leftIndex === 3}" @click="selLeftClass(3)">蛋类</li>
        <li :class="{'active': leftIndex === 4}" @click="selLeftClass(4)">水果</li>
        <li :class="{'active': leftIndex === 5}" @click="selLeftClass(5)">海鲜</li>
        <li :class="{'active': leftIndex === 6}" @click="selLeftClass(6)">粮油</li>
      </ul>

      <ul class="proBox" @click="toDetail()">
        <li>
          <div class="imgBox">
            <img src="../../../static/images/baicai.png"  mode='widthFix'/>
          </div>
          <div class="info">
            <p class="title">现摘新鲜大南瓜</p>
            <p class="weight">约1kg</p>
            <p class="price">0.5元/颗</p>

            <div class="selGui">选规格</div>
          </div>

        </li>
        <li>
          <div class="imgBox">
            <img src="../../../static/images/baicai.png"  mode='widthFix'/>
          </div>
          <div class="info">
            <p class="title">现摘新鲜大南瓜</p>
            <p class="weight">约1kg</p>
            <p class="price">0.5元/颗</p>

            <div class="selGui">选规格</div>
          </div>

        </li>
        <li>
          <div class="imgBox">
            <img src="../../../static/images/baicai.png"  mode='widthFix'/>
          </div>
          <div class="info">
            <p class="title">现摘新鲜大南瓜</p>
            <p class="weight">约1kg</p>
            <p class="price">0.5元/颗</p>

            <div class="selGui">选规格</div>
          </div>

        </li>
        <li>
          <div class="imgBox">
            <img src="../../../static/images/baicai.png"  mode='widthFix'/>
          </div>
          <div class="info">
            <p class="title">现摘新鲜大南瓜</p>
            <p class="weight">约1kg</p>
            <p class="price">0.5元/颗</p>

            <div class="selGui">选规格</div>
          </div>

        </li>
        <li>
          <div class="imgBox">
            <img src="../../../static/images/baicai.png"  mode='widthFix'/>
          </div>
          <div class="info">
            <p class="title">现摘新鲜大南瓜</p>
            <p class="weight">约1kg</p>
            <p class="price">0.5元/颗</p>

            <div class="selGui">选规格</div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import store from './store'

export default {
  data () {
    return {
      index: 1,
      leftIndex: 1
    }
  },

  components: {
    card
  },

  methods: {
    selClass(i){
      this.index = i;
    },
    selLeftClass(i){
      this.leftIndex = i;
    },
    toDetail(){
      mpvue.navigateTo({url: '../product/main'})
    }
  },

  created () {
    let _this = this;
    // let app = getApp()
  },
  mounted (){
  }
}
</script>

<style scoped>
.searchBox{
  background-color: #4adc9f;
  padding: 20rpx 40rpx;
}

.search{
  display: flex;
  background-color: rgb(66,198,141);
  padding: 10rpx 20rpx;
  border-radius: 40rpx;
}

.search i{
  color: #fff;
  line-height: 100%;
  margin-top: 5rpx;
}

.search .searchInput{
  flex: 2;
  margin-left: 10rpx;
}

.classBar{
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 20rpx 10%;
}

.classBar li{
  padding-bottom: 10rpx;
  font-weight: bold;
}

.classBar .active{
  color: #4adc9f;
  border-bottom: 4px solid #4adc9f;
}

.leftBar .active{
  color: #4adc9f;
}

.proList{
  display: flex;
}

.proList .leftBar{
  padding: 20rpx 40rpx;
}

.proList .leftBar li{
  line-height: 40px;
  padding: 20rpx;
}

.proList .proBox .imgBox{
  width: 180rpx;
  margin-right: 20rpx;
}

.proList .proBox .imgBox img{
  width: 100%;
}

.proList .proBox{
  padding: 20rpx;
  flex: 2;
}

.proList .proBox li{
  display: flex;
  position: relative;
  margin-bottom: 20rpx;
}

.proBox .info{
  color: #666;
  font-size: 14px;
}

.proBox .info .title, .price{
  color: #666;
}

.proBox .info .weight{
  color: #f5f5f5;
}

.proBox .info .selGui{
  background-color: #4adc9f;
  padding: 10rpx 20rpx;
  position: absolute;
  border-radius: 40rpx;
  right: 10rpx;
  bottom: 20rpx;
  font-size: 14px;
  color: #fff;
}
</style>
