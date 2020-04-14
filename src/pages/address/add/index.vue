<template>
  <div class="addAdressBox">
    <ul class="setAddress">
      <li>
        <input class="weui-input" auto-focus placeholder="收货人"/>
      </li>
      <li>
        <input class="weui-input" auto-focus placeholder="手机号"/>
      </li>
      <li>
        <input class="weui-input" auto-focus placeholder="详细地址：如道路、小区、楼栋、单元、户等"/>
      </li>
    </ul>

    <div class="save" @click="save()">保存</div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import indexStore from '../../index/store'

export default {
  data(){
    return {
      num: 1
    }
  },
  computed: {
   
  },
  methods: {
    save(){
      mpvue.navigateTo({url: '../main'})
    }
  },

  mounted(){
    
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
