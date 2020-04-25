<template>
  <div class="addressBox">
    <ul>
      <li v-for="(item, index) in addressList" :key="index">
        <p>
          <span class="name">{{item.name}}</span>
          <span class="phone">{{item.mobile}}</span>

          <span class="fr" @click="edit(item)">编辑</span>
          <span class="del" @click="del(item.id)">×</span>
        </p>

        <p class="address">{{item.address}}</p>

      </li>
    </ul>

    <di class="add" @click="add()">新增地址</di>
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
      addressList: [],
      objectarray: [
        {
          name: '是'
        },
        {
          name: '否'
        }
      ]
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
      commonStore.commit('saveFromOrder', false);
      mpvue.redirectTo({url: './add/main'})
    },

    add(){
      store.commit('saveAddress', {
        name:'',
        mobile: '',
        address: '',
        default: 0,
        lat:'',
        lng: ''
      })
      commonStore.commit('saveFromOrder', false);
      mpvue.redirectTo({url: './add/main'})
    },

    del(id){
      let _this = this;
      this.$fly.request({
          method:"post", //post/get 请求方式
          url:"deleteaddress",
          body:{
            id: id
          }
        }).then(res =>{
          console.log('地址',res)
          _this.getAllAddress();
          if(res.status === 100){
            wx.showToast({
              title: "删除成功",
              icon: "success",
              duration: 2000
            });
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
  padding: 10rpx 0;
  /* margin-top: 20rpx; */
}

ul li{
  border-bottom: 1px solid #f6f6f6;
  padding: 20rpx 40rpx;
  background-color: #fff;
  position: relative;
}

ul p .fr{
  color: #0ade7d;
}

ul p{
  line-height: 60rpx;
  font-size: 14px;
}

ul p .name{
  font-size: 16px;
  font-weight: bold;
  margin-right: 20rpx;
}

ul .address{
  color: #999;
}

.add{
  margin-top: 50rpx;
  color: #0ade7d;
  text-align: center;
  width: 100%;
  display: block;
  margin-top: 30px;
}

.del{
  position: absolute;
  right: 35rpx;
  bottom: 0;
  background-color: #0ade7d;
  color: #fff;
  border-radius: 40rpx 0 0 0;
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  line-height: 53rpx;
  font-size: 17px;

}
</style>
