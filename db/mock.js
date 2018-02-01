var Mock = require("mockjs")
var fs = require("fs")

var data = Mock.mock({
  "bannar|4": [
    {
      "id|+1": 1,
      "bannar_img": "@image(320x120,@color)"
    },
  ],
  //分类信息
  "categories|15": [
    {
      "id|+1": 1,
      //分类的图片
      "name": "@cword(3,5)",
      //分类标题的颜色
      "color": "@color",
      "img": "@image(320x76,@color)",
      //小分类
      "cids|4": [
        {
          //子分类的名称
          "name": "@cword(3,5)",
        }
      ],
      // 保存分类对应的商品数据
      'products': []
    }
  ],
  //商品数据
  "products|400-600": [
    {
      //商品的id
      'id|+1': 1,
      //商品对应的分类id
      'categoryId|1-15': 10,
      //该商品对应的子分类的id
      'cidsId|0-3': 10,
      //商品的名称
      'name': '@cname(2,5)',
      //商品的图片
      //列表页使用的缩略图
      'min': '@image(80x80,@color,@cword)',
      //详情页使用的大图
      'big': '@image(300x300,@color,@cword)',
      //商品的价格
      'price|1-99.1': 10,
      //商品的规格
      'unit|10-1000': 10,
      //商品的保质期
      'expiration_date|1-3.1': 10,
      // 商品的品牌
      'brand': '@cword(2, 6)',
      //商品的产原地
      'place_of_origin': '@cword(2,4)',
      //每个商品的数量
      'num': 0,
      //商品详情
      'details': '@cparagraph()'
    }
  ],
  //用户信息
  "users": [],
  //用户购物车数据
  "carts": [],
  //城市列表
  citys: [
    {
      city: '深圳市',
      site: '腾讯',
      cityX: 113.94108,
      cityY: 22.548633
    },
    {
      city: '广州市',
      site: '广州塔',
      cityX: 113.331084,
      cityY: 23.112223
    },
    {
      city: '武汉市',
      site: '黄鹤楼',
      cityX: 114.309124,
      cityY: 30.55198
    },
  ],
  /* 
  用户的地址信息
  {
    id: 地址在地址表中的id
    用户id，这个地址是哪个用户的
    联系人，
    性别，
    手机号码，
    城市,
    地区，
    详细地址,->百度地图
    坐标数据
  }
*/
  'sites': [],

})

fs.writeFile("db.json", JSON.stringify(data, null, 2), function () {
  console.log("文件写入成功")
})