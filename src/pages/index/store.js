/*
 * @Author: 翟海祥
 * @Date: 2020-04-07 09:02:47
 * @LastEditTime: 2020-04-08 11:50:33
 * @LastEditors: 翟海祥
 * @Description:
 * @FilePath: \maicai\src\pages\index\store.js
 */
// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    userInfo: {},
    market: ''
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },
    saveUserInfo: (state, data) => {
      const obj = state
      obj.userInfo = data
    },
    saveMarket: (state, data) =>{
      const obj = state
      obj.market = data
    }
  }
})

export default store
