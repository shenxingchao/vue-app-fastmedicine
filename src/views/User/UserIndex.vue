<template>
  <div class="UserIndex">
    <Header :show="true" title="我的" :back="false">
      <template v-slot:left>
        <i class="icon iconfont">&#xe670;</i>
      </template>
    </Header>
    <div class="user_info_box">
      <div class="user_info">
        <img class="img" :src="userInfo.img" />
        <div class="center">
          <div class="level">V{{ userInfo.level }}会员</div>
          <div class="username">{{ userInfo.username }}</div>
          <div class="desc">{{ userInfo.desc }}</div>
        </div>
        <div class="right">
          <i class="icon iconfont">&#xe628;</i>
        </div>
      </div>
    </div>
    <div class="UserIndexBox">
      <div class="card order">
        <div class="card_top">
          <div class="title">我的订单</div>
          <div class="more">查看全部</div>
        </div>
        <div class="row">
          <div class="item">
            <i class="icon iconfont">&#xe60f;</i>
            待付款
          </div>
          <div class="item">
            <i class="icon iconfont">&#xe669;</i>
            待发货
          </div>
          <div class="item">
            <i class="icon iconfont">&#xe619;</i>
            待收货
          </div>
          <div class="item">
            <i class="icon iconfont">&#xe66d;</i>
            待评价
          </div>
        </div>
      </div>
      <div class="card tool">
        <div class="card_top">
          <div class="title">我的工具</div>
        </div>
        <div class="tool_card">
          <div class="item">
            <div class="left">
              <i class="icon iconfont">&#xe668;</i>
              优惠券
            </div>
            <i class="icon iconfont">&#xe628;</i>
          </div>
          <div class="item">
            <div class="left">
              <i class="icon iconfont">&#xe667;</i>
              我的病例
            </div>
            <i class="icon iconfont">&#xe628;</i>
          </div>
          <div class="item">
            <div class="left">
              <i class="icon iconfont">&#xe747;</i>
              我的收藏
            </div>
            <i class="icon iconfont">&#xe628;</i>
          </div>
          <div class="item">
            <div class="left">
              <i class="icon iconfont">&#xe68b;</i>
              地址管理
            </div>
            <i class="icon iconfont">&#xe628;</i>
          </div>
          <div class="item">
            <div class="left">
              <i class="icon iconfont">&#xe63c;</i>
              客服
            </div>
            <i class="icon iconfont">&#xe628;</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PUBLIC } from '@/mixins'
import Header from '@/components/Header.vue'
import { getUserInfo } from '@/api/User/user_index'
export default {
  name: 'UserIndex',
  mixins: [PUBLIC],
  components: {
    Header: Header
  },
  metaInfo() {
    return {
      title: '我的' // set a title
    }
  },
  data() {
    return {
      userInfo: [] //用户信息
    }
  },
  mounted() {
    this.scrollPostion.goTop.call(this)
    this.getUserInfo()
  },
  activated() {},
  methods: {
    /**
     * 获取用户信息
     */
    getUserInfo: function() {
      getUserInfo({})
        .then(res => {
          this.userInfo = res.data.data
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.UserIndex {
  margin-top: 3rem;
  .user_info_box {
    padding: 1rem;
    position: relative;
    z-index: 1;
    &::before {
      z-index: -1;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: @theme;
    }
    .user_info {
      padding: 1rem;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      border-radius: 1rem;
      box-shadow: 0 1rem 2rem 0.1rem #eeeeee;
      .img {
        width: 6rem;
        height: 6rem;
        object-fit: cover;
        border-radius: 0.5rem;
      }
      .center {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 0.5rem;
        min-width: 0;
        .level {
          width: 5rem;
          background: @theme;
          text-align: center;
          padding: 0.2rem 0;
          border-radius: 2rem;
          color: #ffffff;
        }
        .username {
          color: @h1c;
          font-size: 1.4rem;
          font-weight: bold;
        }
        .desc {
          color: @h3c;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .icon {
          font-size: 1.2rem;
          color: @h5c;
          width: 2rem;
        }
      }
    }
  }
  .UserIndexBox {
    padding: 0 1rem 1rem 1rem;
    .card {
      margin-bottom: 1rem;
      .card_top {
        padding: 0.5rem 1rem;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        &::before {
          content: '';
          height: 50%;
          width: 0.4rem;
          background: @theme;
          position: absolute;
          left: 1rem;
          border-radius: 0.5rem;
        }
        .title {
          font-size: 1.2rem;
          font-weight: bold;
          margin-left: 1rem;
        }
        .more {
          color: @h4c;
        }
      }
    }
    .order {
      .row {
        padding: 1rem;
        background: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 1rem;
        box-shadow: 0 1rem 2rem 0.1rem #eeeeee;
        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: 1px dashed @h5c;
          &:nth-last-of-type(1) {
            border-right: none;
          }
          .icon {
            margin-bottom: 0.5rem;
            color: @theme;
            font-size: 2rem;
          }
          &:active {
            background: #fafafa;
          }
        }
      }
    }
    .tool {
      .tool_card {
        padding: 1rem;
        background: #ffffff;
        border-radius: 1rem;
        box-shadow: 0 1rem 2rem 0.1rem #eeeeee;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          font-size: 1.2rem;
          border-bottom: @border;
          &:nth-last-of-type(1) {
            border-bottom: none;
          }
          .icon {
            font-size: 1.4rem;
            padding: 0.5rem;
            color: @h5c;
          }
          .left {
            .icon {
              color: @theme;
            }
          }
          &:active {
            background: #fafafa;
          }
        }
      }
    }
  }
}
</style>
