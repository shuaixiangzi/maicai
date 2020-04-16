<template>
  <div class="addressBox">
    <ul>
      <li v-for="(item, index) in addressList" :key="index">
        <p>
          <span class="name">{{item.name}}</span>
          <span class="phone">{{item.mobile}}</span>

          <span class="fr" @click="edit(item)">编辑</span>
        </p>

        <p class="address">{{item.address}}</p>
      </li>
    </ul>

    <p class="add" @click="add()">新增地址</p>
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
      addressList: []
    }
  },
  computed: {
   
  },
  methods: {
    buyNow(){
      mpvue.navigateTo({url: '../order/main'})
    },

    edit(data){
      console.log('saveAddress', data);
      store.commit('saveAddress', data)
      mpvue.redirectTo({url: './add/main'})
    },

    add(){
      store.commit('saveAddress', {
        name: '',
        address: '',
        mobile: ''
      })
      mpvue.redirectTo({url: './add/main'})
    },
    
    getAllAddress(){
      let _this = this;
      this.$fly.request({
          method:"get", //post/get 请求方式
          url:"address",
          body:{}
        }).then(res =>{
          console.log('地址',res)
          _this.addressList = res.data;
      })
    }
  },

  mounted(){
    this.getAllAddress();
  }
}
</script>

<style scoped>
@import url('./order.css');
.addressBox{
  padding: 40rpx 60rpx;
  margin-top: 20rpx;
}

ul li{
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 20rpx;
}

ul p .fr{
  color: #4adc9f;
}

ul p{
  line-height: 60rpx;
  font-size: 14px;
}

ul p .name{
  font-size: 16px;
  font-weight: bold;
}

ul .address{
  color: #999;
}

.add{
  margin-top: 50rpx;
  color: #4adc9f;
  text-align: center;
}
</style>
