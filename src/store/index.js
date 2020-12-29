import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading: true, //ajax请求 Loading加载状态
    showTabbar: false, //是否显示底部tab栏一般不需要显示
    showHeader: true, //是否显示顶部
    showBack: true, //是否显示返回按钮
    headTitle: '', //头部标题
    cartCount: 0 //购物车数量
  },
  mutations: {
    //更新Loading显示状态
    updateShowLoading: (state, showLoading) => {
      state.showLoading = showLoading
    },
    //更新tabbar显示状态
    updateShowTabbar: (state, showTabbar) => {
      state.showTabbar = showTabbar
    },
    //更新header显示状态
    updateShowHeader: (state, showHeader) => {
      state.showHeader = showHeader
    },
    //更新head返回按钮显示状态
    updateShowBack: (state, showBack) => {
      state.showBack = showBack
    },
    //更新head title文字
    updateHeadTitle: (state, headTitle) => {
      state.headTitle = headTitle
    },
    //更新购物车数量
    updateCartCount: (state, cartCount) => {
      state.cartCount = cartCount
    }
  },
  actions: {},
  modules: {}
})
