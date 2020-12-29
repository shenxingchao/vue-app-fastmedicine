<template>
  <div class="CartIndex">
    <Header :show="true" title="购物篮" :back="false">
      <template v-slot:right>
        <div class="icon" @click="showDeleteBtn()">编辑</div>
      </template>
    </Header>
    <div class="address_box">
      <div class="address">
        <i class="icon iconfont addrees_icon">&#xe68b;</i>
        <div class="center">
          <div class="receive_name">
            测试人
            <span class="receive_phone">18989898989</span>
          </div>
          <div class="receive_address">北京市北京市东城区100号</div>
        </div>
        <i class="icon iconfont">&#xe628;</i>
      </div>
    </div>
    <div class="CartIndexBox">
      <div class="cart_list" v-if="cartLst.length > 0">
        <div class="cart_top">
          <div class="store_name">
            <i
              class="icon iconfont icon_check"
              :class="all_check ? 'all_check_active' : ''"
              @click="clickAllCheck()"
              >&#xe639;</i
            >
            药快自营药店商城
          </div>
          <div class="tips">20分钟送达</div>
        </div>
        <div class="goods_list">
          <div
            class="row"
            v-for="(item, index) in cartLst"
            :key="index"
            @click="clickItem(index)"
          >
            <i
              class="icon iconfont delete_btn"
              v-if="show_delete_btn"
              @click.stop="deleteItem(index)"
              >&#xe622;</i
            >
            <div class="icon_box">
              <i
                class="icon iconfont icon_check"
                :class="item.select ? 'icon_check_active' : ''"
                >&#xe639;</i
              >
            </div>
            <img class="img" :src="item.img" />
            <div class="center">
              <div class="goods_name">{{ item.goods_name }}</div>
              <div class="spec_name">{{ item.spec_name }}片/罐</div>
              <div class="price">￥{{ item.price }}</div>
            </div>
            <div class="num_box">
              <div class="num">
                <i class="icon iconfont" @click.stop="changeNum('dec', index)"
                  >&#xe64c;</i
                >
                <span> {{ item.num }}</span>
                <i class="icon iconfont" @click.stop="changeNum('add', index)"
                  >&#xe66b;</i
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="total">
        <div class="total_top">
          <div>共 {{ total_num }} 件商品</div>
          <div>合计：￥{{ goods_amount }}</div>
        </div>
        <div class="total_bottom">
          <div class="label">付款方式</div>
          <div class="pay_name">
            {{ pay_name }}<i class="icon iconfont">&#xe628;</i>
          </div>
        </div>
      </div>
      <div class="confirm_btn">应付￥{{ goods_amount }},立即下单</div>
    </div>
  </div>
</template>
<script>
import { PUBLIC } from '@/mixins'
import Header from '@/components/Header.vue'
import { getCartLst } from '@/api/Cart/cart_index'
export default {
  name: 'CartIndex',
  mixins: [PUBLIC],
  components: {
    Header: Header
  },
  metaInfo() {
    return {
      title: '购物篮' // set a title
    }
  },
  data() {
    return {
      cartLst: [], //购物车列表
      pay_name: '支付宝付款', //付款方式
      total_num: 0, //共多少件
      goods_amount: 0, //总价
      all_check: false, //是否全部选中
      show_delete_btn: false //默认不显示删除按钮
    }
  },
  mounted() {
    this.scrollPostion.goTop.call(this)
    this.getCartLst()
  },
  activated() {},
  methods: {
    /**
     * 获取购物车列表
     */
    getCartLst: function() {
      getCartLst({})
        .then(res => {
          res.data.data.forEach((element, index) => {
            //默认不选中
            res.data.data[index].select = false
          })
          this.cartLst = res.data.data
          this.calculatePrcie()
        })
        .catch(() => {})
    },
    /**
     * 改变数量
     */
    changeNum: function(type, index) {
      if (type == 'dec') {
        if (this.cartLst[index].num == 1) return false
        //减少数量
        this.$set(this.cartLst[index], 'num', this.cartLst[index].num - 1)
      } else {
        //增加数量
        this.$set(this.cartLst[index], 'num', this.cartLst[index].num + 1)
      }
      this.calculatePrcie()
    },
    /**
     * 计算总价
     */
    calculatePrcie: function() {
      this.total_num = 0
      this.goods_amount = 0
      this.cartLst.forEach(element => {
        if (element.select) {
          this.total_num += element.num
          this.goods_amount += element.price * element.num
        }
      })
    },
    /**
     * 选择要购买的商品
     */
    clickItem: function(index) {
      this.$set(this.cartLst[index], 'select', !this.cartLst[index].select)
      //判断是否有没选中的
      this.all_check = true
      try {
        this.cartLst.forEach((element, index) => {
          if (!element.select) {
            this.all_check = false
            throw new Error('跳出循环')
          }
        })
      } catch (e) {
        // throw e.message
      }
      this.calculatePrcie()
    },
    /**
     * 全选
     */
    clickAllCheck: function() {
      //判断是否全部选中 如果是那么就反选 如果不是那么就全选
      this.cartLst.forEach((element, index) => {
        if (this.all_check) {
          this.$set(this.cartLst[index], 'select', false)
        } else {
          this.$set(this.cartLst[index], 'select', true)
        }
      })
      this.all_check = !this.all_check
      this.calculatePrcie()
    },
    /**
     * 显示删除按钮
     */
    showDeleteBtn: function() {
      this.show_delete_btn = !this.show_delete_btn
    },
    /**
     * 删除购物车中的一项
     */
    deleteItem: function(index) {
      this.cartLst.splice(index, 1)

      //判断是否有没选中的
      this.all_check = true
      try {
        this.cartLst.forEach((element, index) => {
          if (!element.select) {
            this.all_check = false
            throw new Error('跳出循环')
          }
        })
      } catch (e) {
        // throw e.message
      }
      if (this.cartLst.length == 0) {
        this.all_check = false
      }
      this.calculatePrcie()
    }
  }
}
</script>
<style lang="less" scoped>
.CartIndex {
  margin-top: 3rem;
  .address_box {
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
    .address {
      padding: 1rem;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 1rem;
      box-shadow: 0 1rem 2rem 0.1rem #eeeeee;
      &:active {
        background: #fafafa;
      }
      .icon {
        font-size: 1.2rem;
        color: @h5c;
        width: 2rem;
      }
      .addrees_icon {
        color: @theme;
      }
      .center {
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .receive_name {
          color: @h1c;
          .receive_phone {
            color: @h3c;
          }
        }
        .receive_address {
          color: @h3c;
        }
      }
    }
  }
  .CartIndexBox {
    padding: 0 1rem 1rem 1rem;
    .cart_list {
      padding: 1rem;
      background: #ffffff;
      border-radius: 1rem;
      box-shadow: 0 0 2rem 0.1rem #eeeeee;
      .cart_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        .store_name {
          .icon_check {
            color: @h5c;
            padding: 0.5rem;
          }
          .all_check_active {
            color: @theme;
          }
        }
        .tips {
          color: @price;
        }
      }
      .goods_list {
        .row {
          border-top: @border;
          padding: 0.5rem 0;
          display: flex;
          justify-content: space-between;
          position: relative;
          &:active {
            background: #fafafa;
          }
          .delete_btn {
            position: absolute;
            top: 0.2rem;
            right: 0.2rem;
            padding: 0.5rem;
            font-size: 1.2rem;
            color: @price;
          }
          .icon_box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .icon_check {
              color: @h5c;
              padding: 0.5rem;
            }
            .icon_check_active {
              color: @theme;
            }
          }
          .img {
            width: 6rem;
            height: 5.2rem;
            object-fit: cover;
          }
          .center {
            margin-left: 0.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .goods_name {
              color: @h1c;
            }
            .spec_name {
              color: @h3c;
              font-size: 0.7rem;
            }
            .price {
              color: @h1c;
            }
          }
          .num_box {
            .num {
              display: flex;
              align-items: center;
              color: @h1c;
              .icon {
                padding: 0.5rem;
                color: @h4c;
                font-size: 1.2rem;
              }
              span {
                width: 1rem;
                display: inline-block;
                text-align: center;
              }
            }
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
        }
      }
    }
    .total {
      padding: 1rem;
      background: #ffffff;
      border-radius: 1rem;
      box-shadow: 0 1rem 2rem 0.1rem #eeeeee;
      margin-top: 1rem;
      .total_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
      }
      .total_bottom {
        border-top: @border;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        .label {
          color: @h1c;
        }
        .pay_name {
          color: @theme;
          .icon {
            padding: 0.5rem;
            color: @h5c;
          }
        }
      }
    }
    .confirm_btn {
      margin-top: 1rem;
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;
      color: #ffffff;
      background: @theme;
      border-radius: 2rem;
    }
  }
}
</style>
