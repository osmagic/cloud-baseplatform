import Vue from 'vue'
import Vuex from 'vuex'
import mainStore from './mainStore.js'
import accessMonitorStore from './accessMonitorStore.js'
import selectGroup from './selectGroup.js'
import axios from 'axios/index'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    mainStore:mainStore,
    accessMonitorStore:accessMonitorStore,
    selectGroupStore:selectGroup
  }
});
