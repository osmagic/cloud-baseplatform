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
          name:'deviceManager',
          component: () => import('../components/deviceManage/deviceManager')
        },
        {
          path:'/peopleList',
          name:'peopleList',
          component: () => import('../components/peopleManage/peopleList')
        },
        {
          path:'/peopleType',
          name:'peopleType',
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
            path: '/accessMonitor/index',//门禁主页
            name: '门禁主页',
            component: ()=>import('../components/accessMoniter/indexPage.vue')
          },
          {
            path: '/accessMonitor/accessDevice',//门禁设备
            name: '门禁设备',
            component: ()=>import('../components/accessMoniter/accessDevice.vue')
          },
          {
            path: '/accessMonitor/accessAuth',//门禁权限
            name: '门禁权限',
            component: ()=>import('../components/accessMoniter/accessAuth.vue')
          },
          {
            path: '/accessMonitor/accessRecord',//通行记录
            name: '通行记录',
            component: ()=>import('../components/accessMoniter/accessRecord.vue')
          },
          {
            path: '/accessMonitor/alarmRecord',//告警记录
            name: '告警记录',
            component: ()=>import('../components/accessMoniter/alarmRecord.vue')
          },

        ]
      }

  ]
})
