<template>
  <div id="app">
    <Loading :show="showLoading"></Loading>
    <Header :show="showHeader" :title="headTitle" :back="showBack"></Header>
    <transition :name="transitionName">
      <keep-alive include="Home,Question">
        <router-view
          class="view"
          :class="[
            showTabbar ? 'paddingBottom' : '',
            showHeader ? 'paddingTop' : ''
          ]"
          :key="$route.fullPath"
        ></router-view>
      </keep-alive>
    </transition>
    <Tabbar :show="showTabbar" :activeIndex="activeIndex"></Tabbar>
  </div>
</template>
<script>
import Loading from './components/Loading.vue'
import Tabbar from './components/Tabbar.vue'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Loading: Loading,
    Tabbar: Tabbar,
    Header: Header
  },
  data() {
    return {
      transitionName: 'slide-left',
      activeIndex: 0
    }
  },
  mounted() {},
  computed: {
    showLoading() {
      return this.$store.state.showLoading
    },
    showTabbar() {
      return this.$store.state.showTabbar
    },
    showHeader() {
      return this.$store.state.showHeader
    },
    headTitle() {
      return this.$store.state.headTitle
    },
    showBack() {
      return this.$store.state.showBack
    }
  },
  watch: {
    $route(to, from) {
      //定义需要转场顺序的动画
      let nameList = [
        ['CatLst', 'CartIndex'], //分类到购物车
        ['CatLst', 'QuestionIndex'], //分类到问诊
        ['GoodsDetail', 'CartIndex'], //商品详情到问诊
        ['GoodsDetail', 'QuestionIndex'] //商品详情到购物车
      ]
      let flag = false //是否以及添加动画
      //遍历转场顺序数组 如果在里面 那么转场确定 主要针对 meta.index顺序大的到小的情况
      //还有一种2个页面死循环的情况 详情到购物车 购物车再到详情这种情况 需要直接判断这2个的先后顺序来做动画
      nameList.forEach((element, index) => {
        if (
          element.indexOf(to.name) !== -1 &&
          element.indexOf(from.name) !== -1
        ) {
          flag = true
          if (to.meta.index > from.meta.index) {
            this.transitionName = 'slide-right'
          } else if (to.meta.index == from.meta.index) {
            this.transitionName = 'fade'
          } else {
            this.transitionName = 'slide-left'
          }
        }
      })

      //普通转场动画
      if (!flag) {
        if (typeof from.meta.index == 'undefined') {
          this.transitionName = 'fade'
        } else {
          if (to.meta.index > from.meta.index) {
            this.transitionName = 'slide-left'
          } else if (to.meta.index == from.meta.index) {
            this.transitionName = 'fade'
          } else {
            this.transitionName = 'slide-right'
          }
        }
      }

      //直接刷新页面  底部激活
      switch (to.name) {
        case 'Home':
          this.activeIndex = 1
          break
        case 'QuestionIndex':
          this.activeIndex = 2
          break
        case 'CartIndex':
          this.activeIndex = 3
          break
        case 'UserIndex':
          this.activeIndex = 4
          break
      }
      //定于需要底部的组件Name
      let hideTabbarName = ['Home', 'QuestionIndex', 'CartIndex', 'UserIndex']
      if (hideTabbarName.indexOf(to.name) !== -1) {
        this.$store.commit('updateShowTabbar', true)
      } else {
        this.$store.commit('updateShowTabbar', false)
      }
      //定义不需要头部的组件Name （注意：可在页面内再次调用Header组件自定义插槽）
      let hideHeaderUrl = ['Home', 'CartIndex', 'UserIndex', 'CatLst']
      if (hideHeaderUrl.indexOf(to.name) !== -1) {
        this.$store.commit('updateShowHeader', false)
      } else {
        this.$store.commit('updateShowHeader', true)
        //定义不需要返回按钮的URL
        let hideBackUrl = ['QuestionIndex']
        if (hideBackUrl.indexOf(to.name) !== -1) {
          this.$store.commit('updateShowBack', false)
        } else {
          this.$store.commit('updateShowBack', true)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  .view {
    width: 100%;
    height: auto;
    position: absolute;
    -webkit-overflow-scrolling: touch;
    background: @bg;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .paddingBottom {
    margin-bottom: 4rem;
  }
  .paddingTop {
    margin-top: 3rem;
  }
}
</style>
