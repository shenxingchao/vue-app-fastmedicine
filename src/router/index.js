import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from '@/axios'
import scrollPosition from '@/lib/scrollPosition'
import { Toast } from 'vant'
Vue.use(VueRouter)

// 定义路由规则
const RouterCopy = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      //首页
      path: '/',
      name: 'Home',
      component: resolve => require(['@/views/Home'], resolve),
      meta: { requireAuth: false, index: 1 }
    },
    {
      //问诊
      path: '/Question',
      name: 'Question',
      component: resolve => require(['@/views/Question'], resolve),
      children: [
        {
          //问诊首页
          path: 'QuestionIndex',
          name: 'QuestionIndex',
          component: resolve =>
            require(['@/views/Question/QuestionIndex'], resolve),
          meta: { requireAuth: false, index: 1 }
        }
      ]
    },
    {
      //购物篮
      path: '/Cart',
      name: 'Cart',
      component: resolve => require(['@/views/Cart'], resolve),
      children: [
        {
          //购物篮首页
          path: 'CartIndex',
          name: 'CartIndex',
          component: resolve => require(['@/views/Cart/CartIndex'], resolve),
          meta: { requireAuth: false, index: 1 }
        }
      ]
    },
    {
      //我的
      path: '/User',
      name: 'User',
      component: resolve => require(['@/views/User'], resolve),
      children: [
        {
          //我的首页
          path: 'UserIndex',
          name: 'UserIndex',
          component: resolve => require(['@/views/User/UserIndex'], resolve),
          meta: { requireAuth: false, index: 1 }
        }
      ]
    },
    {
      //商品
      path: '/Goods',
      name: 'Goods',
      component: resolve => require(['@/views/Goods'], resolve),
      children: [
        {
          //分类商品列表
          path: 'CatLst/:id',
          name: 'CatLst',
          component: resolve => require(['@/views/Goods/CatLst'], resolve),
          meta: { requireAuth: false, index: 2 }
        },
        {
          //商品详情
          path: 'GoodsDetail/:id',
          name: 'GoodsDetail',
          component: resolve => require(['@/views/Goods/GoodsDetail'], resolve),
          meta: { requireAuth: false, index: 5 }
        }
      ]
    },
    {
      // 404重定向
      path: '*',
      redirect: '/'
    }
  ]
})
// 路由前置钩子
RouterCopy.beforeEach(function(to, from, next) {
  //保存滚动条位置
  scrollPosition.save(from.path)
  for (let key in axios.list) {
    axios.list[key].cancel('取消请求')
    delete axios.list[key]
  }
  next()
})

// 路由前置钩子
RouterCopy.beforeEach(function(to, from, next) {
  if (!to.meta.requireAuth) {
    //不需要验证登录的路由
    next()
  } else {
    //需要验证登录 此处省略代码
    /*  if (typeof to.query.token !== 'undefined') {
      //第三方登录返回token 截取并存储
      //设置登录状态
      localStorage.setItem('token', JSON.stringify(to.query.token))
    }
    if (!JSON.parse(localStorage.getItem('token'))) {
      //跳转授权页
      let ua = window.navigator.userAgent.toLowerCase()
      let baseURL = window.location.href.split('#')[0]
      if (!baseURL) return false
      //回调页面
      let redirect_url = baseURL + '#' + to.fullPath
      if (
        ua.match(/MicroMessenger/i) &&
        ua.match(/MicroMessenger/i)[0] === 'micromessenger'
      ) {
        window.location.href =
          'http://www.lyqqgzh.com/index.php/wechat/oauth/wechat_login?redirect_url=' +
          encodeURIComponent(redirect_url)
        return false
      } else {
        Toast.fail({ message: '请在微信客户端打开链接', duration: 0 })
        return false
      }
    } */
    next()
  }
})
// 路由后置钩子
RouterCopy.afterEach(function() {})
//路由返回方法
VueRouter.prototype.goBack = function() {
  this.go(-1)
}

export default RouterCopy
