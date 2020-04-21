<template>
  <div>
    <div class="searchBox">
      <div class="search">
         <i class="iconfont iconsearch"></i>
        <input :value="searchTxt" placeholder="搜索菜品" confirm-type='search' placeholder-style="color:#FFF" class="searchInput"/>
      </div>
    </div>

    <ul class="classBar" >
      <li :class="{'active': index === 0}" @click="selClass(0)">全部</li>
      <li :class="{'active': index === 1}" @click="selClass(1)">人气热卖</li>
      <li :class="{'active': index === 2}" @click="selClass(2)">店长优惠</li>
      <li :class="{'active': index === 3}" @click="selClass(3)">农户直供</li>
    </ul>

    <div class="proList">
      <ul class="leftBar">
        <li v-for="(item, index) in classifiList" :key="index" :class="{'active': leftIndex == item.id}" @click="selLeftClass(item.id)">{{item.name}}</li>
      </ul>

      <ul class="proBox">
        <li v-for="(item, index) in productList" :key="index"  @click="toDetail(item.id)">
          <div class="imgBox">
            <img :src="item.main_img_url.url"/>
          </div>
          <div class="info">
            <p class="title">{{item.name}}</p>
            <p class="weight">约{{item.weight}}kg</p>
            <p class="price">{{item.price}}</p>

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
import indexStore from '../index/store'

export default {
  data () {
    return {
      index: 0,
      leftIndex: 1,
      productList: [],
      market: '73753-55420'
    }
  },

  components: {
    card
  },

  computed: {
    classificationId() {
      return indexStore.state.classificationId;
    },
    classifiList() {
      return indexStore.state.classifiList;
    },
    category() {
      return indexStore.state.category;
    }
  },

  methods: {
    selClass(i){
      this.index = i;
      this.getProduct(this.leftIndex, this.index, 1, 10);
    },
    selLeftClass(i){
      this.leftIndex = i;
      this.getProduct(this.leftIndex, this.index, 1, 10);
    },
    toDetail(id){
      let url = '../product/main?id=' + id;
      mpvue.navigateTo({url})
    },
    // 获取商品
    getProduct(id, type, page, size) {
      let _this = this;
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "product/categoryproduct",
          body: {
            page: page,
            size: size,
            type: type?type:0,
            id: id?id:0,
            paramid: _this.market
          },
        })
        .then((res) => {

          if (res.status === 100) {

            _this.productList = res.data.data;
            console.log("产品", _this.productList);
          }
        });
    },
  },

  created () {
    let _this = this;
    // let app = getApp()
    console.log(111)

  },
  mounted (){

  },
  onLoad() {
    console.log(this.classificationId)
    if(this.classificationId){
      this.leftIndex = this.classificationId;
    }
    else{
      this.leftIndex = this.classifiList[0].id;
    }

    // this.index = this.classificationId;
    this.getProduct(this.leftIndex, this.index, 1, 10);
  },
  onReady () {
    // console.log(3333)
  },
  onShow() {
    // console.log(444)
  }
}
</script>

<style scoped>
.searchBox{
  background-color: #0ade7d;
  padding: 20rpx 40rpx;
}

.search{
  display: flex;
  background-color: rgba(0,0,0,.1);
  padding: 10rpx 20rpx;
  border-radius: 40rpx;
}

.search i{
  color: #fff;
  line-height: 100%;
  margin-top: 7rpx;
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
  color: #0ade7d;
  border-bottom: 4px solid #0ade7d;
}

.leftBar .active{
  color: #0ade7d;
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
  max-height: 135rpx;
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

.proBox .info .weight{
  color: #999;
  margin: 10rpx 0;
}

.proBox .info .selGui{
  background-color: #0ade7d;
  padding: 10rpx 20rpx;
  position: absolute;
  border-radius: 40rpx;
  right: 10rpx;
  bottom: 20rpx;
  font-size: 14px;
  color: #fff;
}

.title{
  margin-top: 15rpx;
  font-weight: bold;
}
</style>
