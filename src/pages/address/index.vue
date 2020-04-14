<template>
  <div class="addressBox">
    <ul>
      <li>
        <p>
          <span class="name">钢弹</span>
          <span class="phone">13295327761</span>

          <span class="fr" @click="edit()">编辑</span>
        </p>

        <p class="address">李沧区 金水路 春和景明一期 2号楼2单元1602户</p>
      </li>

      <li>
        <p>
          <span class="name">翟子</span>
          <span class="phone">13295327761</span>

          <span class="fr" @click="edit()">编辑</span>
        </p>

        <p class="address">李沧区 金水路 春和景明一期 2号楼2单元1602户</p>
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
      num: 1
    }
  },
  computed: {
   
  },
  methods: {
    buyNow(){
      mpvue.navigateTo({url: '../order/main'})
    },

    edit(){
      mpvue.redirectTo({url: './add/main'})
    },

    add(){
      mpvue.redirectTo({url: './add/main'})
    }
  },

  mounted(){
    
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
