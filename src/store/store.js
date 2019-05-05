import Vue from 'vue'
import Vuex from 'vuex'
import mainStore from './mainStore.js'
import accessMonitorStore from './accessMonitorStore.js'
import sccessDevice from './sccessDevice.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    mainStore:mainStore,
    accessMonitorStore:accessMonitorStore,
    sccessDevice:sccessDevice
  }
});
