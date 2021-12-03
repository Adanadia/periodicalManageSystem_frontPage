import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
var qs = require('qs');

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
axios.defaults.baseURL = '/api'

axios.interceptors.request.use(function (config) {
  console.log(config)
  if(typeof(config.data) == "object"){
    config.data = qs.stringify(config.data, {arrayFormat: 'brackets'})
  }
  console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

Vue.config.productionTip = false

let token = localStorage.getItem("token")
if(token != null){
  axios.defaults.headers.common['Authorization'] = token;
  console.log("token loaded")
}
else{
  router.push({path:'/login'})
}

new Vue({
  el:'#app',
  router,
  render: h=>h(App)
})