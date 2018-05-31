import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Select from '@/components/Select'
import Detail from '@/components/Detail'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/select',
      name: 'Select',
      component: Select,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/detail/:floorId',
      name: 'Detail',
      component: Detail,
      meta: {
        keepAlive: true // 不需要缓存
      }
    }
  ]
})
