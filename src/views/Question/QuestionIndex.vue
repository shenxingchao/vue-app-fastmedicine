<template>
  <div class="QuestionIndex">
    <div class="QuestionIndexBox">
      <div class="list">
        <div class="card" v-for="(item, index) in doctor" :key="index">
          <img class="img" :src="item.img" />
          <div class="center">
            <div class="name">
              {{ item.name }}药师
              <span class="expert" v-if="item.expert">专家</span>
            </div>
            <div class="score">
              {{ item.score }}.0
              <i
                class="icon iconfont active"
                v-for="(item, index) in item.score"
                :key="index"
                >&#xe666;</i
              >
              <i
                class="icon iconfont default"
                v-for="(item, index) in 4 - item.score"
                :key="index"
                >&#xe666;</i
              >
              解答：<span class="answer_count">{{ item.answer_count }}</span
              >次
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
          </div>
          <div class="right">
            <div class="btn">咨询</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PUBLIC } from '@/mixins'
import { getDoctorLst } from '@/api/Question/question_index'
export default {
  name: 'QuestionIndex',
  mixins: [PUBLIC],
  components: {},
  metaInfo() {
    return {
      title: '问诊' // set a title
    }
  },
  data() {
    return {
      doctor: [] //医生列表
    }
  },
  mounted() {
    this.getDoctorLst()
    this.$store.commit('updateHeadTitle', '问诊')
  },
  activated() {
    this.scrollPostion.get.call(this)
  },
  methods: {
    getDoctorLst: function() {
      getDoctorLst({})
        .then(res => {
          this.doctor = res.data.data
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.QuestionIndex {
  .QuestionIndexBox {
    .list {
      position: relative;
      padding: 1rem;
      z-index: 1;
      &::before {
        content: '';
        width: 100%;
        height: 4rem;
        background: @theme;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
      }
      .card {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        background: #ffffff;
        padding: 1.5rem 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 1rem 2rem 0.1rem #eeeeee;
        .img {
          width: 6rem;
          height: 7rem;
          object-fit: cover;
          border-radius: 0.2rem;
          box-shadow: 0 0.2rem 0.5rem 0.1rem @h5c;
        }
        .center {
          flex: 1;
          margin-left: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            font-size: 1.2rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            .expert {
              margin-left: 0.5rem;
              background: #baccec;
              padding: 0.1rem 1rem;
              border-radius: 2rem;
              color: #ffffff;
              font-size: 0.8rem;
            }
          }
          .score {
            font-size: 0.8rem;
            margin: 0.2rem 0;
            color: @h5c;
            .active {
              color: @org;
            }
            .answer_count {
              color: @theme;
            }
          }
          .desc {
            padding-top: 0.2rem;
            border-top: @border;
            color: @h3c;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 5rem;
          margin-left: 0.5rem;
          .btn {
            width: 5rem;
            background: @theme;
            text-align: center;
            padding: 0.4rem 0;
            border-radius: 2rem;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
