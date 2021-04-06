<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="菜品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{ goodsInfo.NAME }}</div>
    <div class="goods-price">
      单价 ：￥{{ goodsInfo.PRESENT_PRICE | moneyFilter }}元
    </div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="菜品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <!-- <van-tab title="评论">
                    评论制作中
                </van-tab> -->
      </van-tabs>
    </div>

    <div class="goods-bottom">
      <!-- <div>
                <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div> -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车"  url="/Cart" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning"  @click="addGoodsToCart" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}, //商品详细信息
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    console.log(this.goodsId);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodsId: this.goodsId },
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
          } else {
            Toast("服务器错误，数据获取失败");
          }
          console.log(this.goodsInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    addGoodsToCart() {
      //取出本地购物车中的商品
      //localStorage.removeItem('cartInfo')
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let isHaveGoods = cartInfo.find((cart) => cart.goodsId == this.goodsId);
      console.log(isHaveGoods);
      console.log(this.goodsInfo);
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1,
        };
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }

      this.$router.push({ name: "Cart" });
    },
  },
};
</script>

<style scoped>
.navbar-div {
  background-color: crimson;
}
.goods-name {
  background-color: #fff;
  padding-left: 10px;
}
.goods-price {
  background-color: #fff;
  padding-left: 10px;
}
.detail {
  font-size: 0px;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}

.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>