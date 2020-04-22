// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    orderProduct: [],
    car: [],
    searchName: '',
    market: '73753-55420',
    searchPaystatus: 0,
    searchDeliverstatus: 0,
    searchOrder: ''
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
    orderProduct: (state, data) => {
      const obj = state
      obj.orderProduct = data
    },
    pushCarProduct: (state, data) => {
      const obj = state
      let has = false
      for (let i = 0; i < obj.car.length; i++){
        if ( data.id === obj.car[i].id ) {
          obj.car[i].count += 1
          has = true
        }
      }
      if(has === false){
        obj.car.push(data)
      } 
    },
    searchName: (state, data) => {
      const obj = state
      obj.searchName = data
    },
    market: (state, data) => {
      const obj = state
      obj.market = data
    },
    searchPaystatus: (state, data) => {
      const obj = state
      obj.searchPaystatus = data
    },
    searchDeliverstatus: (state, data) => {
      const obj = state
      obj.searchDeliverstatus = data
    },
    searchOrder: (state, data) => {
      const obj = state
      obj.searchOrder = data
    }
  }
})

export default store
