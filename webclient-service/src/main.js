import Vue from 'vue'
import App from './App.vue'
import router from './router'
import auth from './auth'
import { initAxios } from './api'

Vue.config.productionTip = false

// Register our authentication service at the global Vue isntance
Vue.use(auth)

new Vue({
  router,
  created () {
    initAxios()
  },
  render: h => h(App)
}).$mount('#app')
