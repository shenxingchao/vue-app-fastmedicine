<template>
  <div class="GoodsDetail">
    <Header :show="true" :title="title" :back="true">
      <template v-slot:right>
        <i
          class="icon iconfont"
          @click="$router.push('/Question/QuestionIndex')"
          >&#xe78f;</i
        >
        <i class="icon iconfont" @click="$router.push('/Cart/CartIndex')"
          >&#xe607;</i
        >
      </template>
    </Header>
    <div class="GoodsDetailBox">
      <div class="goods_info_box" ref="item_box">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in banners" :key="index">
            <img class="img" :src="item.img" ref="item_img" />
          </van-swipe-item>
        </van-swipe>
        <div class="goods_name">
          {{ goods_info.goods_name }}
        </div>
        <div class="spec_name">{{ goods_info.spec_name }}粒 /瓶</div>
        <div class="desc">
          {{ goods_info.desc }}
        </div>
        <div class="price">￥{{ goods_info.price }}</div>
        <div class="btn_group">
          <div class="btn" @click="addToCart()">加入购物篮</div>
          <div class="btn active">立即购买</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PUBLIC } from '@/mixins'
import { Swipe, SwipeItem, Toast } from 'vant'
import Header from '@/components/Header.vue'
import { getGoodsDetailById } from '@/api/Goods/goods'
export default {
  name: 'GoodsDetail',
  mixins: [PUBLIC],
  components: {
    Header: Header,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  metaInfo() {
    return {
      title: this.title // set a title
    }
  },
  data() {
    return {
      title: this.$route.query.goods_name,
      goods_info: [], //商品
      banners: [] //海报
    }
  },
  mounted() {
    this.getGoodsDetailById()
    this.scrollPostion.goTop.call(this)
  },
  activated() {},
  methods: {
    /**
     * 获取商品详情
     */
    getGoodsDetailById: function() {
      getGoodsDetailById({})
        .then(res => {
          this.goods_info = res.data.data
          this.banners = res.data.data.banners
        })
        .catch(() => {})
    },
    //加入购物车
    addToCart: function() {
      Toast('加入购物车成功！')
    }
  }
}
</script>
<style lang="less" scoped>
.GoodsDetail {
  min-height: calc(100vh - 3rem);
  background: @theme !important;
  .GoodsDetailBox {
    padding: 1rem;
    .goods_info_box {
      padding: 1rem;
      background: #ffffff;
      border-radius: 1rem;
      .my-swipe {
        border-radius: 0.2rem;
        .img {
          border-radius: 0.2rem;
        }
      }

      .goods_name {
        margin-top: 1rem;
        font-size: 1.4rem;
        font-weight: bold;
        color: @h1c;
        display: flex;
        justify-content: center;
      }
      .spec_name {
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
        font-size: 1.2rem;
        color: @h3c;
      }
      .desc {
        margin-top: 0.5rem;
        padding: 0 1rem;
        display: flex;
        justify-content: flex-start;
        font-size: 1rem;
        color: @h4c;
      }
      .price {
        margin-top: 1rem;
        font-size: 1.6rem;
        font-weight: bold;
        color: @price;
        display: flex;
        justify-content: center;
      }
      .btn_group {
        margin-top: 1rem;
        padding: 1.5rem 2rem;
        border-top: 1px dashed @h5c;
        display: flex;
        justify-content: space-between;
        .btn {
          background: #ffffff;
          border: 1px solid @theme;
          border-radius: 2rem;
          padding: 1em 1.6rem;
          width: 5rem;
          display: flex;
          justify-content: center;
        }
        .active {
          background: @theme;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
