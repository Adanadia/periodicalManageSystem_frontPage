import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
var qs = require('qs');

Vue.use(VueAxios, axios)

axios.interceptors.request.use(function (config) {
  if(typeof(config.data) == "object"){
    config.data = qs.stringify(config.data, {arrayFormat: 'brackets'})
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
