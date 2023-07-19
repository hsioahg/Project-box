import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {VueMasonryPlugin} from 'vue-masonry';
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueMasonryPlugin)
Vue.prototype.$md5 = md5

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
