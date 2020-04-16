<template>
  <div class="addAdressBox">
    <ul class="setAddress">
      <li>
        <input class="weui-input" auto-focus placeholder="收货人" v-model="thisAddress.name"/>
      </li>
      <li>
        <input class="weui-input" auto-focus placeholder="手机号" v-model="thisAddress.mobile"/>
      </li>
      <li>
        <input class="weui-input" auto-focus placeholder="详细地址：如道路、小区、楼栋、单元、户等" v-model="thisAddress.address"/>
      </li>
    </ul>

    <div class="save" @click="save()">保存</div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import indexStore from '../../index/store'
import addressStore from '../store'

export default {
  data(){
    return {
      thisAddress:{
        name:'',
        mobile: '',
        address: ''
      }
    }
  },
  computed: {
    address (){
      return addressStore.state.address
    }
  },
  methods: {
    save(){
      let _this = this;
      let url = '';

      if(_this.thisAddress.id){
        url = 'updateaddress'
      }
      else{
        url = 'createaddress'
      }
      this.$fly.request({
          method:"post", //post/get 请求方式
          url:url,
          body:{
            id: _this.thisAddress.id,
            address: _this.thisAddress.address,
            name: _this.thisAddress.name,
            mobile: _this.thisAddress.mobile
          }
        }).then(res =>{
          if(res.status === 100){
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            mpvue.navigateTo({url: '../main'})
          }
      })
      
    }
  },

  mounted(){
    console.log(this.address);
    this.thisAddress = this.address;
  }
}
</script>

<style scoped>
@import url('./order.css');
.addAdressBox{
  padding: 40rpx 60rpx;
}

.setAddress li{
  border-bottom: 1px solid #f5f5f5;
  padding: 20rpx 0;
}

.setAddress li input{
  font-size: 14px;
}

.save{
  background-color: #4adc9f;
  border-radius: 100rpx;
  padding: 20rpx;
  box-sizing: border-box;
  text-align: center;
  margin-top: 40rpx;
  font-size: 14px;
  width: 60%;
  margin-left: 20%;
  color: #fff;
}
</style>
