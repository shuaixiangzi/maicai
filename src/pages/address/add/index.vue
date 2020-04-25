<template>
  <div class="addAdressBox">
    <ul class="setAddress">
      <li>
        <input class="weui-input" placeholder="收货人" v-model="thisAddress.name"/>
      </li>
      <li>
        <input class="weui-input" placeholder="手机号" v-model="thisAddress.mobile"/>
      </li>
      <li class="checkAddr">
        <div @click="chooseLocation()" class="selAddress">地图选址<div class="imgBox"><img src="../../../../static/images/address.png" mode="widthFix"/></div>{{info}}</div>
      </li>
      <li>
        <input class="weui-input" placeholder="详细地址：如道路、小区、楼栋、单元、户等" v-model="thisAddress.address"/>
      </li>
      <li class="defualt">
        <div>是否为默认地址：</div>
        <picker
          mode="selector"
          @change="bindPickerChange"
          :value="thisAddress.default"
          :range="objectarray"
          :range-key="'name'"
          class="moren">
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
import commonStore from '@/store'

export default {
  data(){
    return {
      thisAddress:{
        name:'',
        mobile: '',
        address: '',
        default: 0,
        lat:'',
        lng: ''
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
      info: ''
    }
  },
  computed: {
    address (){
      return addressStore.state.address
    },
    fromOrder (){
      return commonStore.state.fromOrder
    }
  },
  methods: {
    bindPickerChange(val){
      this.thisAddress.default = val.mp.detail.value;

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

      if(!(/^1[3456789]\d{9}$/.test(_this.thisAddress.mobile))){ 
          wx.showToast({
            title: '手机号码有误，请重填',
            icon: 'success',
            duration: 2000
          })
          return false; 
      } 

      if(_this.thisAddress.lat==''){
        wx.showToast({
          title: '请先地图选址',
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.$fly.request({
          method:"post", //post/get 请求方式
          url:url,
          body:{
            id: _this.thisAddress.id,
            address: _this.info + _this.thisAddress.address,
            name: _this.thisAddress.name,
            mobile: _this.thisAddress.mobile,
            default:  _this.thisAddress.default,
            lat: _this.thisAddress.lat,
            lng: _this.thisAddress.lng
          }
        }).then(res =>{
          if(res.status === 100){
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            if(_this.fromOrder){
              mpvue.navigateTo({url: '../../order/main'})
            }
            else{
              mpvue.navigateTo({url: '../main'})
            }
          }
      })

    },
    chooseLocation: function (e) {
      let _this = this;
      wx.chooseLocation({
        success: function(res) {
          console.log('resresres', res);
          _this.thisAddress.lat = res.latitude
          _this.thisAddress.lng = res.longitude
          _this.info = res.address
        },
      })
    },

    // 坐标纠偏

  },

  mounted(){
    console.log(this.address);
    this.thisAddress = this.address;
  },

  onHide(){
    
  },

  onLoad(){
    let _this = this;
    wx.getSetting({
      success(res) {
        console.log("resresres", res);
        if(!res.authSetting["userLocation"]){
          wx.getLocation({
            type: 'wgs84',
            success (res) {
              _this.latitude = res.latitude
              _this.longitude = res.longitude
              _this.info = ''
            }
          })
        }
      },
      fail(err){
        console.log("resresres", err);
      }
    });
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

.selAddress{
  font-size: 14px;
}

.defualt{
  display: flex;
}

.moren{
  width: 400rpx;
}

.weui-input{
  font-size: 12px;
}

.imgBox{
  width: 100rpx;
  margin-top: -10rpx;
}

.imgBox img{
  width: 100%;
}

.checkAddr,.selAddress{
  display:flex;
}
</style>
