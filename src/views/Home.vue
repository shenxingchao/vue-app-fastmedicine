<template>
  <div class="Home">
    <div class="HomeBox">
      <van-popup v-model="showPcd" position="bottom" :style="{ height: '40%' }">
        <van-area
          :area-list="areaList"
          :columns-placeholder="['请选择', '请选择', '请选择']"
          title="请选择省市区"
          @cancel="cancelPcd"
          @confirm="confirmPcd"
        />
      </van-popup>
      <Header :show="true">
        <template v-slot:left>
          <div class="address_box" @click="showPopPcd()">
            <i class="icon iconfont">&#xe68b;</i>{{ address }}
          </div>
        </template>
      </Header>
      <div class="head">
        <div class="search">
          <i class="icon iconfont">&#xe618;</i>
          <input class="text_input" type="text" placeholder="请输入口罩名称" />
        </div>
        <div class="cat">
          <div
            class="cat_item"
            v-for="(item, index) in categoryLst"
            :key="index"
            @click="
              $router.push({
                path: '/Goods/CatLst/' + item.id,
                query: { cat_name: item.cat_name }
              })
            "
          >
            <img class="icon" :src="item.icon" />
            {{ item.cat_name }}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card_top">
          <div class="title">限时优惠</div>
          <div class="more">更多</div>
        </div>
        <div class="card_bottom">
          <div
            class="timeLimitedDiscount_item"
            v-for="(item, index) in timeLimitedDiscount"
            :key="index"
          >
            <img class="img" :src="item.img" />
            <div class="en_title">{{ item.en_title }}</div>
            <div class="cn_title">{{ item.cn_title }}</div>
            <i class="icon iconfont">&#xeb93;</i>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card_top">
          <div class="title">热门推荐</div>
          <div class="more">更多</div>
        </div>
        <div class="card_bottom">
          <div
            class="hotRecommend_item"
            v-for="(item, index) in hotRecommend"
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
              <i class="icon iconfont" @click.stop="addToCart(index)"
                >&#xe673;</i
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PUBLIC } from '@/mixins'
import { Area, Popup } from 'vant'
import AreaList from '@/lib/area.js'
import {
  getCategoryLst,
  getTimeLimitedDiscountLst,
  getHotRecommendLst
} from '@/api/home'
import Header from '@/components/Header.vue'
export default {
  name: 'Home',
  mixins: [PUBLIC],
  components: {
    Header: Header,
    [Popup.name]: Popup,
    [Area.name]: Area
  },
  metaInfo() {
    return {
      title: '医药App' // set a title
    }
  },
  data() {
    return {
      areaList: AreaList, //省市区选中列表
      address: '请选择', //定位
      region: ['请选择', '请选择', '请选择'],
      showPcd: false, //是否显示省市区弹窗
      categoryLst: [], //分类列表
      timeLimitedDiscount: [], //限时优惠
      hotRecommend: [] //热门推荐
    }
  },
  mounted() {
    this.getCategoryLst()
    this.getTimeLimitedDiscountLst()
    this.getHotRecommendLst()
  },
  activated() {
    this.scrollPostion.get.call(this)
  },
  methods: {
    //显示省市区
    showPopPcd: function() {
      this.showPcd = true
    },
    //隐藏省市区
    cancelPcd: function() {
      this.showPcd = false
    },
    //确认选则省市区
    confirmPcd: function(value) {
      this.address = '请选择'
      value.forEach((value, index) => {
        if (typeof value != 'undefined' && value.name != '') {
          this.region[index] = value.name
        } else {
          this.region[index] = '请选择'
        }
      })
      this.address = this.region[2]
      this.showPcd = false
    },
    //获取分类
    getCategoryLst: function() {
      getCategoryLst({})
        .then(res => {
          this.categoryLst = res.data.data
        })
        .catch(() => {})
    },
    //获取限时优惠
    getTimeLimitedDiscountLst: function() {
      getTimeLimitedDiscountLst({})
        .then(res => {
          this.timeLimitedDiscount = res.data.data
        })
        .catch(() => {})
    },
    //获取热门推荐
    getHotRecommendLst: function() {
      getHotRecommendLst({})
        .then(res => {
          this.hotRecommend = res.data.data
        })
        .catch(() => {})
    },
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
      img.className = 'addcart_animation'
      this.$refs.item_box[index].append(img)

      setTimeout(() => {
        img.remove()
        this.$store.commit('updateCartCount', this.$store.state.cartCount + 1)
      }, 2000)
      img.style.animation = 'addcart_animation 2s'
    }
  }
}
</script>
<style lang="less">
@keyframes addcart_animation {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    top: 40%;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    top: calc(100% - 4rem);
    left: 50%;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
</style>
<style lang="less" scoped>
.Home {
  .HomeBox {
    margin-top: 3rem;
    .address_box {
      width: 50%;
      padding: 0.5rem 0;
      .icon {
        font-size: 1.2rem;
        padding-right: 0.5rem;
      }
    }
    .head {
      padding: 0 1rem 1rem 1rem;
      height: 13rem;
      background: @theme;
      margin-bottom: 9rem;
      .address {
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .notice {
          font-size: 1.2rem;
        }
      }
      .search {
        padding: 0.5rem 0.5rem 0.5rem 2rem;
        background: #ffffff;
        border-radius: 0.5rem;
        position: relative;
        display: flex;
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
        }
        .text_input {
          flex: 1;
          padding: 0.2rem 0.5rem;
          border: none;
          font-size: 1rem;
        }
      }
      .cat {
        background: #ffffff;
        margin-top: 1rem;
        padding: 0.5rem;
        padding-top: 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        box-shadow: 0 0.3rem 1rem 0.01rem #dee7fc;
        .cat_item {
          width: calc(100% / 5);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          .icon {
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 50%;
            margin: 0 auto 0.5rem;
          }
        }
      }
    }
    .card {
      margin-bottom: 1rem;
      .card_top {
        padding: 0.5rem 1rem;
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
      .card_bottom {
        width: 100%;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
        display: flex;
        flex-wrap: nowrap;
        .timeLimitedDiscount_item {
          margin-left: 0.8rem;
          position: relative;
          color: #ffffff;
          &:nth-last-of-type(1) {
            padding-right: 1rem;
          }
          &:first-child {
            margin-left: 1rem;
          }
          .img {
            width: 14rem;
            height: auto;
            border-radius: 0.5rem;
          }
          .en_title {
            position: absolute;
            top: 1.6rem;
            left: 2.8rem;
            font-weight: bold;
            font-size: 1.4rem;
          }
          .cn_title {
            position: absolute;
            top: 3rem;
            left: 2.8rem;
            font-size: 1.2rem;
          }
          .icon {
            position: absolute;
            top: 4.6rem;
            left: 2.8rem;
            font-size: 1.8rem;
          }
        }
        .hotRecommend_item {
          margin-left: 0.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &:first-child {
            margin-left: 1rem;
          }
          &:nth-last-of-type(1) {
            padding-right: 1rem;
          }
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
      }
    }
  }
}
</style>
