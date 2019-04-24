import Vue from 'vue'
import Vuex from 'vuex'
import module1 from './module1.js'
import module2 from './module2.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    module1:module1,
    module2:module2
  }
});
