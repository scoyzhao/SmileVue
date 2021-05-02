<template>
  <div>
    <div class="navbar-div">
      <div class="navbar-div">
        <van-nav-bar
          title="购物车"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <div class="pang-row" v-for="(item, index) in cartInfo" :key="index">
        <div class="pang-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="pang-text">
          <div class="pang-goods-name">{{ item.name }}</div>
          <div class="pang-control">
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="pang-goods-price">
          <div>￥{{ item.price | moneyFilter }}</div>
          <div>x{{ item.count }}</div>
          <div class="allPrice">
            ￥{{ (item.price * item.count) | moneyFilter }}
          </div>
        </div>
      </div>
    </div>

    <!--显示总金额-->
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart" plain>
        清空购物车
      </van-button>
    </div>
    <div class="totalMoeny">
      <!-- 商品总价:￥{{ totalMoney | moneyFilter }} -->
      <van-submit-bar
        :price="totalMoney * 100"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
import { Toast } from "vant";
import axios from "../../http";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false,
    };
  },
  created() {
    this.getCartInfo();
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    },
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //得到购物车数据的方法
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length < 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
    nowDate() {
      var nowDate = new Date();
      var date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        day: nowDate.getDate(),
      };
      var systemDate =
        date.year +
        "-" +
        (date.month >= 10 ? date.month : "0" + date.month) +
        "-" +
        (date.day >= 10 ? date.day : "0" + date.day);
      // console.log(systemDate);
      return systemDate;
    },
    addLifeOrder(payload) {
      axios({
        url: url.addLifeOrder,
        method: "post",
        data: payload,
      })
        .then((response) => {
          if (response.data.code === 200) {
            Toast.success("预约成功");
            window.location.href = "/";
            this.clearCart();
          } else {
            Toast.fail("预约失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      if (this.cartInfo.length === 0) {
        return Toast.fail("请先添加商品哦~");
      }
      const time = this.nowDate();
      const type = 3;
      const { userNumber, auditStatus } = JSON.parse(localStorage.getItem("user"));

      if (auditStatus === 0) {
        return Toast.fail("用户尚未审核，请联系社区管理员审核先～");
      }

      let goodDescription = "";
      this.cartInfo.map((el) => {
        goodDescription += `${el.name} * ${el.count}、`;
      });

      const description = `${time} 预约了跑腿小哥购买 ${goodDescription.substring(
        0,
        goodDescription.length - 1
      )}, 共 ${this.totalMoney} 元`;

      this.addLifeOrder({
        userNumber,
        time,
        type,
        description,
      });
    },
  },
};
</script>

<style scoped>
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}

.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}

.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.allPrice {
  color: red;
}
.totalMoeny {
  border-bottom: 1px solid #e4e7ed;
  padding-left: 10px;
  position: absolute;
  bottom: 3rem;
  height: 50px;
}
</style>
