<template>
  <div class="header" v-if="show">
    <slot name="left">
      <span class="noBack" v-if="!back"></span>
      <i class="icon iconfont back" v-if="back" @click="$router.goBack()"
        >&#xe644;</i
      >
    </slot>
    <slot name="title">
      <div class="title">{{ title }}</div>
    </slot>
    <slot name="right">
      <i class="icon iconfont notice">&#xe646;</i>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {}
  },
  props: {
    show: {
      //是否显示控件 默认不显示
      type: Boolean,
      default: false
    },
    back: {
      //是否显示返回按钮 默认显示
      type: Boolean,
      default: true
    },
    title: {
      //是否显示控件 默认不显示
      type: String,
      default: ''
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  background: @theme;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  overflow: hidden;
  .title {
    font-size: 1.4rem;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .icon {
    padding: 1rem;
    font-size: 1.2rem;
  }
  .noBack {
    padding: 1rem;
  }
}
</style>
