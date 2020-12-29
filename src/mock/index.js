const Mock = require('mockjs')
/* 生成分类数据 */
let categoryLst = Mock.mock({
  'data|15': [
    {
      'id|+1': 1, //生成分类id，自增1
      cat_name: '@ctitle(4)', //生成分类名称
      icon: '@dataImage("100x100")' //生成随机图片，大小/背景色/字体颜色/文字信息
    }
  ]
})
Mock.mock(/Category\/getCategoryLst/, 'get', () => {
  return categoryLst
})
/* 限时优惠 */
let timeLimitedDiscount = Mock.mock({
  'data|5': [
    {
      'id|+1': 1, //生成id，自增1
      en_title: '@word(5,7)', //生成英文标题
      cn_title: '@ctitle(5)', //生成中文标题
      img: '@dataImage("218x118","")' //生成随机图片，大小/背景色/字体颜色/文字信息
    }
  ]
})
Mock.mock(/Home\/getTimeLimitedDiscountLst/, 'get', () => {
  return timeLimitedDiscount
})
/* 热门推荐 */
let hotRecommend = Mock.mock({
  'data|5': [
    {
      'id|+1': 1, //生成id，自增1
      goods_name: '@word(5,7)@ctitle(4,7)', //生成标题
      img: '@dataImage("196x160")', //生成随机图片，大小/背景色/字体颜色/文字信息
      'price|80-99': 80,
      'discount_price|100-150': 100,
      'spec_name|80-150': 80 //规格
    }
  ]
})
Mock.mock(/Home\/getHotRecommendLst/, 'get', () => {
  return hotRecommend
})
/* 医生列表 */
let doctor = Mock.mock({
  'data|10': [
    {
      'id|+1': 1, //生成id，自增1
      name: '@cword(1)', //生成姓
      'score|0-4': 0, //评分和星级 对应的
      img: '@dataImage("140x160")', //生成随机图片，大小/背景色/字体颜色/文字信息
      'answer_count|0-3000': 0, //回答次数
      desc: '@cparagraph(1,2)', //生成1，2句话
      'expert|1': false //是否专家
    }
  ]
})
Mock.mock(/Question\/getDoctorLst/, 'get', () => {
  return doctor
})
/* 购物车列表 */
let cartLst = Mock.mock({
  'data|5': [
    {
      'id|+1': 1, //生成id，自增1
      goods_name: '@word(5,7)@ctitle(4,7)', //生成商品名称
      img: '@dataImage("196x160")', //生成随机图片，大小/背景色/字体颜色/文字信息
      'price|80-150': 80, //加个
      'spec_name|80-150': 80, //规格
      'num|1-10': 1 //数量
    }
  ]
})
Mock.mock(/Cart\/getCartLst/, 'get', () => {
  return cartLst
})

/* 用户信息 */
let userInfo = Mock.mock({
  'data|1': [
    {
      'id|+1': 1, //生成id，自增1
      username: /^1(5|3|7|8)[0-9]{9}$/, //会员名称 生成随机电话号
      img: '@dataImage("200x200")', //生成随机图片，大小/背景色/字体颜色/文字信息
      'level|1-5': 1, //会员等级
      desc: '@cparagraph(1)'
    }
  ]
})
Mock.mock(/User\/getUserInfo/, 'get', () => {
  return userInfo
})

/* 分类商品 */
let catGoods = Mock.mock({
  'data|11': [
    {
      'id|+1': 1, //生成id，自增1
      goods_name: '@word(5,7)@ctitle(4,7)', //生成标题
      img: '@dataImage("196x160")', //生成随机图片，大小/背景色/字体颜色/文字信息
      'price|80-99': 80,
      'discount_price|100-150': 100,
      'spec_name|80-150': 80 //规格
    }
  ]
})
Mock.mock(/Goods\/getGoodsByCatId/, 'get', () => {
  return catGoods
})

/* 商品分类 */
let category = Mock.mock({
  'data|20': [
    {
      'id|+1': 1, //生成id，自增1
      cat_name: '@cword(2)' //生成标题
    }
  ]
})
Mock.mock(/Goods\/getCategoryLst/, 'get', () => {
  return category
})
/* 商品详情 */
let goodsDetail = Mock.mock({
  'data|1': [
    {
      'id|+1': 1, //生成id，自增1
      goods_name: '@word(5,7)@ctitle(4,7)', //生成标题
      'price|80-99': 80,
      'spec_name|80-150': 80, //规格
      desc: '@cparagraph(2)',
      'banners|3': [
        {
          'id|+1': 1, //生成id，自增1
          img: '@dataImage("492x320")' //生成随机图片，大小/背景色/字体颜色/文字信息
        }
      ]
    }
  ]
})
Mock.mock(/Goods\/getGoodsDetailById/, 'get', () => {
  return goodsDetail
})

// let data = Mock.mock({
//   'data|100': [
//     //生成100条数据 数组
//     {
//       'shopId|+1': 1, //生成商品id，自增1
//       shopMsg: '@ctitle(10)', //生成商品信息，长度为10个汉字
//       shopName: '@csentence', //生成商品名 ， 都是中国人的名字
//       shopTel: /^1(5|3|7|8)[0-9]{9}$/, //生成随机电话号
//       shopAddress: '@county(true)', //随机生成地址
//       'shopStar|1-5': '', //随机生成1-5个字符串
//       'salesVolume|30-1000': 30, //随机生成商品价格 在30-1000之间
//       shopLogo: '@Image("100x40","#c33", "#ffffff","小北鼻")', //生成随机图片，大小/背景色/字体颜色/文字信息
//       'food|7': [
//         //每个商品中再随机生成七个food
//         {
//           foodName: '@cname', //food的名字
//           foodPic: '@Image("100x40","#c33", "#ffffff","小可爱")', //生成随机图片，大小/背景色/字体颜色/文字信息
//           'foodPrice|1-100': 20, //生成1-100的随机数
//           'aname|14': [
//             {
//               aname: '@cname',
//               'aprice|30-60': 20
//             }
//           ]
//         }
//       ]
//     }
//   ]
// })
// Mock.mock(/dataController\/getPost/, 'post', () => {
//   //三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
//   return data
// })
