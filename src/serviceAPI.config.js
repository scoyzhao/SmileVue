const BASEURL = "http://120.27.247.30:9000/"
    // const LOCALURL = "http://localhost:3000/111"
const LOCALURL = "http://192.168.199.191:3000/"
const URL = {
    getShopingMallInfo: BASEURL + 'index', //商城首页所有信息
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    // user
    registerUser: BASEURL + 'user/register', //用户注册接口
    login: BASEURL + 'user/login', //用户登录接口
    // good
    getDetailGoodsInfo: BASEURL + 'goods/getDetailGoodsInfo', //获取商品详情
    getCateGoryList: BASEURL + 'goods/getCateGoryList', //得到大类信息
    getCateGorySubList: BASEURL + 'goods/getCategorySubList', //得到小类信息
    getGoodsListByCategorySubID: BASEURL + 'goods/getGoodsListByCategorySubID', //得到小类商品信息
    // commite
    getCommiteInfo: BASEURL + 'commite/getCommiteInfo',
    getCommiteNameById: BASEURL + 'commite/getCommiteNameById',
    // menu
    getMenuList: BASEURL + 'menu/getMenuList', //获取菜单的接口哈
    // work
    getWorkerList: BASEURL + 'worker/getWorkerList',
    // lifeOrder
    getLifeOrderList: BASEURL + 'lifeOrder/getOrderList',
    addLifeOrder: BASEURL + 'lifeOrder/addOrder',
    // mealOrder
    addMealOrder: BASEURL + 'mealOrder/addOrder',
    editMealOrder: BASEURL + 'mealOrder/editOrder',
    submitOrder: BASEURL + 'mealOrder/submitOrder',
    getOrderListByCommiteIdAndTime: BASEURL + 'mealOrder/getOrderListByCommiteIdAndTime',
    getMealOrderList: BASEURL + 'mealOrder/getOrderList',
}


module.exports = URL