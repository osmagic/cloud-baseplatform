// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex';
import store from './store/store'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
////////////////////////
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
/////////////封装后的axios
import http from './api/http.js'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(axios)
Vue.use(VueAxios)
Vue.use(iView);

Vue.use(Vuex)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages: {
    'en': Object.assign(require('../static/lang/en'), enLocale),
    'zh': Object.assign(require('../static/lang/zh'), zhLocale),
  }
})
Vue.prototype.$EventBus = new Vue()
Vue.use(ElementUI, {i18n: (key, value) => i18n.t(key, value), zIndex: 3000});
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = http
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,i18n,
  components: { App },
  template: '<App/>'
})
