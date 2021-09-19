<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="社区订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-notice-bar left-icon="volume-o" text="欢迎光临 ，今日菜单已上新。" />
    </div>
    <div class="recommend-title">
      <div class="">
        <van-row>
          <van-col span="6">当前社区：</van-col>
          <van-col span="10">{{ user.commiteName }}</van-col>
        </van-row>
      </div>
      <div class="input_name">
        <van-field
          v-model="managername"
          left-icon="manager-o"
          placeholder="   社区提交人："
          clearable
          @click-icon="username = ''"
          :error-message="managernameErrorMsg"
        />
        <div>
          <van-field
            v-model="phone"
            type="tel"
            left-icon="phone-circle-o"
            clearable
            placeholder="   责任人联系电话："
            :error-message="phoneErrorMsg"
          />
        </div>
      </div>

      <div class="cart-list">
        <div class="pang-row" v-if="onlyLunchOrderList.length !== 0">
          <div class="pang-text">
            <van-row>
              <van-col span="12">
                <div class="pang-goods-name">{{ number2TypeName[5] }}</div>
              </van-col>
              <van-col span="4">
                <div class="pang-goods-price">
                  ￥{{ onlyLunchOrderList[0].price | moneyFilter }}
                </div>
              </van-col>
              <van-col span="2" offset="1">
                <div class="pang-goods-price">
                  x{{ onlyLunchOrderList.length }}
                </div>
              </van-col>
              <van-col span="5">
                <div class="pang-goods-price">
                  ￥{{
                    (onlyLunchOrderList[0].price * onlyLunchOrderList.length)
                      | moneyFilter
                  }}
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="pang-row" v-if="onlyDinnerOrderList.length !== 0">
          <div class="pang-text">
            <van-row>
              <van-col span="12">
                <div class="pang-goods-name">{{ number2TypeName[6] }}</div>
              </van-col>
              <van-col span="4">
                <div class="pang-goods-price">
                  ￥{{ onlyDinnerOrderList[0].price | moneyFilter }}
                </div>
              </van-col>
              <van-col span="2" offset="1">
                <div class="pang-goods-price">
                  x{{ onlyDinnerOrderList.length }}
                </div>
              </van-col>
              <van-col span="5">
                <div class="pang-goods-price">
                  ￥{{
                    (onlyDinnerOrderList[0].price * onlyDinnerOrderList.length)
                      | moneyFilter
                  }}
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="pang-row" v-if="allOrderList.length !== 0">
          <div class="pang-text">
            <van-row>
              <van-col span="12">
                <div class="pang-goods-name">{{ number2TypeName[7] }}</div>
              </van-col>
              <van-col span="4">
                <div class="pang-goods-price">
                  ￥{{ allOrderList[0].price | moneyFilter }}
                </div>
              </van-col>
              <van-col span="2" offset="1">
                <div class="pang-goods-price">x{{ allOrderList.length }}</div>
              </van-col>
              <van-col span="5">
                <div class="pang-goods-price">
                  ￥{{
                    (allOrderList[0].price * allOrderList.length) | moneyFilter
                  }}
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="time">
          <van-row>
            <van-col span="18">
              <div class="pang-goods-name">订单生效日期</div>
            </van-col>
            <van-col span="4">
              <div class="pang-goods-price">
                {{ nowDate() }}
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="recommend-title">
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="100"
        placeholder="请输入。。。"
        show-word-limit
      />
    </div>
    <div class="totalMoeny">
      <van-submit-bar
        :price="totalMoney * 100"
        button-text="提交订单"
        @submit="onSubmit"
      />

      <!-- "totalMoeny" -->
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
import axios from "../../http";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";

export default {
  mounted() {
    this.getUserInfo();
  },
  data() {
    return {
      phone: "",
      managername: "",
      managernameErrorMsg: "",
      phoneErrorMsg: "",
      message: "",
      user: {},
      orderList: [],
      onlyLunchOrderList: [],
      onlyDinnerOrderList: [],
      allOrderList: [],
      number2TypeName: {
        5: "老人午餐",
        6: "老人晚餐",
        7: "老人全餐",
      },
    };
  },
  created() {
    this.getOrderListByCommiteIdAndTime();
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.orderList.forEach((item, index) => {
        allMoney += Number(item.price);
      });
      return allMoney;
    },
  },
  filters: {
    moneyFilter(money) {
      return toMoney(Number(money));
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getUserInfo() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getCommiteName(this.user.commiteId);
    },
    getCommiteName(id) {
      axios({
        // 获取菜单的uri
        url: url.getCommiteNameById,
        method: "post",
        data: { id },
      })
        .then((response) => {
          this.user = Object.assign(JSON.parse(JSON.stringify(this.user)), {
            commiteName: response.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      if (!this.checkForm()) {
        return Toast.fail("请填写表单");
      }

      if (this.orderList.length === 0) {
        return Toast.fail("暂无可提交订单");
      }

      const time = this.nowDate();
      const phone = this.phone;
      const userName = this.managername;
      const { commiteId } = JSON.parse(localStorage.getItem("user"));
      const price = this.totalMoney;
      const description = this.message;

      this.sumbitOrder({
        time,
        phone,
        userName,
        commiteId,
        price,
        description,
      });
    },
    // //得到购物车数据的方法
    // getCartInfo() {
    //   if (localStorage.cartInfo) {
    //     this.cartInfo = JSON.parse(localStorage.cartInfo);
    //   }
    //   // console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
    //   this.isEmpty = this.cartInfo.length > 0 ? true : false;
    // },
    // clearCart() {
    //   localStorage.removeItem("cartInfo");
    //   this.cartInfo = [];
    // },
    // onClickLeft() {
    //   this.$router.go(-1);
    // },
    checkForm() {
      let isOk = true;
      if (!this.managername.length) {
        this.managernameErrorMsg = "用户名格式错误";
        isOk = false;
      } else {
        this.managernameErrorMsg = "";
      }
      if (this.phone.length !== 11) {
        this.phoneErrorMsg = "手机号错误";
        isOk = false;
      } else {
        this.phoneErrorMsg = "";
      }

      return isOk;
    },
    nowDate() {
      var nowDate = new Date();
      var date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 2,
      };
      var systemDate =
        date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);
      // console.log(systemDate);
      return systemDate;
    },
    sumbitOrder(payload) {
      axios({
        url: url.submitOrder,
        method: "post",
        data: payload,
      })
        .then((response) => {
          if (response.data.code === 200) {
            Toast.success("提交成功");
            window.location.href = "/";
          } else {
            Toast.fail("提交失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOrderListByCommiteIdAndTime() {
      const { commiteId } = JSON.parse(localStorage.getItem("user"));
      const time = this.nowDate();
      axios({
        url: url.getOrderListByCommiteIdAndTime,
        method: "post",
        data: {
          commiteId,
          time,
        },
      })
        .then((response) => {
          if (response.data.code === 200) {
            this.orderList = response.data.data.filter((el) => el.status !== 2);
            this.onlyLunchOrderList = this.orderList.filter(el => el.type === 5);
            this.onlyDinnerOrderList = this.orderList.filter(el => el.type === 6);
            this.allOrderList = this.orderList.filter((el) => el.type === 7);
          } else {
            Toast.fail("获取数据失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.input_name {
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}
.recommend-title {
  border-bottom: 5px solid #eee;
  border-radius: 15px;
  font-size: 13px;
  padding: 0.5rem;
  color: #646566;
  background-color: #fff;
  /* text-indent: 10px; */
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.pang-goods-name {
  font-size: 14px;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
  height: 30px;
}
.pang-control {
  padding-bottom: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: left;
}
.totalMoeny {
  /* background-color: #f0f8fa; */
  border-bottom: 1px solid #e4e7ed;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  /* 脚部的高度 */
  clear: both;
}
.time {
  margin: 10px 20px;
}
</style>