/*
 * @Author: 翟海祥
 * @Date: 2020-04-07 09:02:47
 * @LastEditTime: 2020-04-16 20:29:29
 * @LastEditors: 翟海祥
 * @Description:
 * @FilePath: \maicai\src\main.js
 */
import Vue from 'vue'
import App from './App'
import WXrequest from './utils/wx-request'
import apiBox from './utils/api'
import fly from './utils/fly'
Vue.prototype.$fly = fly

Vue.prototype.$httpWX = WXrequest
Vue.prototype.$apiBox = apiBox

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
