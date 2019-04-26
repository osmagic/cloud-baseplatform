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
          path:'/deviceList',
          name:'deviceManage',
          component: () => import('../components/deviceManage/deviceList')
        },
        {
          path:'/deviceManager',
          name:'appList',
          component: () => import('../components/deviceManage/deviceManager')
        },
        {
          path:'/peopleList',
          name:'appList',
          component: () => import('../components/peopleManage/peopleList')
        },
        {
          path:'/peopleType',
          name:'appList',
          component: () => import('../components/peopleManage/peopleType')
        },{
          path:'/comShow',
          name:'comShow',
          component: () => import('../components/authManage/comShow')
        },
        {
          path:'/deptManagement',
          name:'deptManagement',
          component: () => import('../components/authManage/deptManagement')
        },
        {
          path:'/accessManager',
          name:'accessManager',

        }

      ]
    },
      {
        path: '/accessLogin',//门禁登陆
        name: 'accessLogin',
        component: ()=>import('../components/accessMoniter/login.vue')
      },
      {
        path: '/accessMonitor',//门禁登陆
        name:'accessMonitor',
        component:()=>import('../components/accessMoniter/index.vue'),
        children:[
          {
            path: '/accessMonitor/index',//门禁登陆
            name: '门禁主页',
            component: ()=>import('../components/accessMoniter/indexPage.vue')
          },
        ]
      }

  ]
})
