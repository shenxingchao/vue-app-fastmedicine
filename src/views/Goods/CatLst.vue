<template>
  <div class="CatLst">
    <Header :show="true" title="44" :back="true">
      <template v-slot:title>
        <div class="search">
          <i class="icon iconfont">&#xe618;</i>
          <input
            class="text_input"
            type="text"
            placeholder="请输入口罩名称,药品名称"
          />
        </div>
      </template>
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
    <div class="category_box">
      <div class="item">
        <div
          class="cat_name"
          :class="activeIndex == -1 ? 'active' : ''"
          @click="clickItem(-1)"
        >
          全部
        </div>
      </div>
      <div class="item" v-for="(item, index) in category" :key="index">
        <div
          class="cat_name"
          :class="activeIndex == index ? 'active' : ''"
          @click="clickItem(index)"
        >
          {{ item.cat_name }}
        </div>
      </div>
    </div>
    <div class="CatLstBox">
      <div class="goods_box">
        <div
          class="item"
          v-for="(item, index) in goods"
          :key="index"
          @click="
            $router.push({
              path: '/Goods/GoodsDetail/' + item.id,
              query: {
                goods_name: item.goods_name + '片' + item.spec_name + '片/罐'
              }
            })
          "
        >
          <div class="item_top" ref="item_box">
            <img class="img test" :src="item.img" ref="item_img" />
            <div class="goods_name">
              {{ item.goods_name }}片 {{ item.spec_name }}片/罐
            </div>
          </div>
          <div class="price_box">
            <div class="discount_price">￥{{ item.discount_price }}</div>
            <div class="price">￥{{ item.price }}</div>
            <i class="icon iconfont" @click.stop="addToCart(index)">&#xe673;</i>
          </div>
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { PUBLIC } from '@/mixins'
import {} from 'vant'
import Header from '@/components/Header.vue'
import { getGoodsByCatId, getCategoryLst } from '@/api/Goods/goods'
export default {
  name: 'CatLst',
  mixins: [PUBLIC],
  components: {
    Header: Header
  },
  metaInfo() {
    return {
      title: this.title // set a title
    }
  },
  data() {
    return {
      title: this.$route.query.cat_name,
      category: [], //分类
      goods: [], //商品
      activeIndex: -1 //选中的分类
    }
  },
  mounted() {
    this.getCategoryLst()
    this.getGoodsByCatId()
    this.scrollPostion.goTop.call(this)
  },
  activated() {},
  methods: {
    /**
     * 获取商品分类
     */
    getCategoryLst: function() {
      getCategoryLst({})
        .then(res => {
          this.category = res.data.data
        })
        .catch(() => {})
    },
    /**
     * 获取分类商品
     */
    getGoodsByCatId: function(showLoading = true) {
      getGoodsByCatId({}, showLoading)
        .then(res => {
          this.goods = res.data.data
        })
        .catch(() => {})
    },
    //点击分类
    clickItem: function(index) {
      this.activeIndex = index
      this.getGoodsByCatId(false)
    },
    //加入购物车
    addToCart: function(index) {
      let img = document.createElement('img')
      img.src = this.$refs.item_img[index].src
      img.style.position = 'fixed'
      img.style.left = this.$refs.item_img[index].x + 'px'
      img.style.top = this.$refs.item_img[index].y + 'px'
      img.style.zIndex = '9999999'
      img.style.width = '7rem'
      img.style.height = 'auto'
      img.style.display = 'block'
      img.style.borderRadius = ' 0.5rem'
      img.className = 'addcart_animation_2'
      this.$refs.item_box[index].append(img)

      setTimeout(() => {
        img.remove()
        this.$store.commit('updateCartCount', this.$store.state.cartCount + 1)
      }, 2000)
      img.style.animation = 'addcart_animation_2 1s'
    }
  }
}
</script>
<style lang="less">
@keyframes addcart_animation_2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    top: -2rem;
    left: calc(100% - 5rem);
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
</style>
<style lang="less" scoped>
.search {
  width: 14rem;
  padding: 0.2rem 0.5rem 0.2rem 2rem;
  background: #ffffff;
  border-radius: 0.5rem;
  position: relative;
  color: @h1c;
  .icon {
    font-size: 1rem;
    height: 1rem;
    line-height: 1rem;
    color: @h4c;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 1rem;
    padding: 0;
  }
  .text_input {
    width: 13rem;
    padding: 0.2rem 0.5rem;
    border: none;
    font-size: 1rem;
  }
}
.category_box {
  position: fixed;
  background: @bg;
  top: 3rem;
  width: 100%;
  height: 3rem;
  overflow-x: scroll;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  -webkit-overflow-scrolling: touch;
  z-index: 999;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .item {
    position: relative;
    margin-left: 1rem;
    .cat_name {
      width: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.2rem 0;
      border-radius: 2rem;
      background: #ffffff;
      transition: all 0.3s linear;
      box-shadow: 0 0 0.5rem 0.01rem @h5c;
    }
    .active {
      background: @theme;
      color: #ffffff;
      border: none;
    }
  }
}
.CatLst {
  margin-top: 3rem;
  padding-top: 3rem;
  .CatLstBox {
    padding: 1rem;
    .goods_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      background: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      .item {
        width: calc((100% - 1.5rem) / 3);
        margin: 0.5rem 0;
        .item_top {
          flex-direction: column;
          justify-content: flex-start;
          .img {
            width: 7rem;
            height: auto;
            border-radius: 0.5rem;
          }
          .goods_name {
            margin: 0.5rem 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        .price_box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .discount_price {
            color: @price;
            font-weight: bold;
          }
          .price {
            color: @h4c;
            text-decoration: line-through;
            font-size: 0.8rem;
          }
          .icon {
            color: @theme;
            font-size: 1.4rem;
            padding: 0.2rem;
          }
        }
      }
      .empty {
        width: calc((100% - 1.5rem) / 3);
      }
    }
  }
}
</style>
