import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('../components/index.vue'),
      redirect: '/indexPage',
      children: [
        {
          path: '/indexPage',
          name: '首页',
          component: () => import('../components/indexPage/indexPage.vue')
        },
        {
          path: '/operationLogs',
          name:'operationLogs',
          component: () => import('../components/dataManagement/operationLogs.vue')
        },
        {
          path: '/characterManage',
          name: 'characterManage',
          component: () => import('../components/authManage/characterManage')
        },
        {
          path: '/permissionAssign',
          name:'permissionAssign',
          component: () => import('../components/authManage/permissionAssign')
        },
        {
          path:'/myMessage',
          name:'myMessage',
          component: () => import('../components/messageCenter/myMessage')
        },
        {
          path:'/appList',
          name:'appList',
          component: () => import('../components/appCenter/appList')
        },
        {
          path:'/comShow',
          name:'comShow',
          component: () => import('../components/authManage/comShow')
        }
      ]
    }
  ]
})
