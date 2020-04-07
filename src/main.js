import Vue from 'vue'
import App from './App'
import WXrequest from './utils/wx-request'
import apiBox from './utils/api'

Vue.prototype.$httpWX = WXrequest
Vue.prototype.$apiBox = apiBox

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
