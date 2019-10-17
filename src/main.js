import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
import  VueResource  from 'vue-resource'

Vue.use(Mint);
Vue.config.productionTip = false
Vue.use(VueResource);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
