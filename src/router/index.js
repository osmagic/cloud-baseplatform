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
        }
      ]
    }
  ]
})
