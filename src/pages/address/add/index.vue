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
        <div @click="chooseLocation()">选择</div>
      </li>
      <li>
        <input class="weui-input" auto-focus placeholder="详细地址：如道路、小区、楼栋、单元、户等" v-model="thisAddress.address"/>
      </li>
      <li class="defualt">
        <div>是否为默认地址：</div>
        <picker
          mode="selector"
          @change="bindPickerChange"
          :value="thisAddress.default"
          :range="objectarray"
          :range-key="'name'">
          <view>{{ objectarray[thisAddress.default]?objectarray[thisAddress.default].name:'' }}</view>
        </picker>
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
        address: '',
        default: 0
      },
      index: 0,
      objectarray: [
        {
          id: 0,
          name: "否",
        },
        {
          id: 1,
          name: "是",
        },
      ],
    }
  },
  computed: {
    address (){
      return addressStore.state.address
    }
  },
  methods: {
    bindPickerChange(val){
      this.thisAddress.default = val.mp.detail.value;
      console.log(1111, val)
    },
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
            mobile: _this.thisAddress.mobile,
            default:  _this.thisAddress.default
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
      
    },
    chooseLocation: function (e) {
      wx.chooseLocation({
        success: function(res) {
          console.log('resresres', res);
        },
      })
    },

    // 坐标纠偏

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
  padding: 10rpx 0;
}

.setAddress li{
  border-bottom: 1px solid #f6f6f6;
  padding: 20rpx 40rpx;
}

.setAddress li input{
  font-size: 14px;
}

.save{
  background-color: #0ade7d;
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
