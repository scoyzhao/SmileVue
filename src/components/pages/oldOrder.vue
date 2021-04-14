<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="老人订餐"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-notice-bar
        left-icon="volume-o"
        text="具体金额结算方式，请点击此处查看。"
        @click="Dialogdetail"
      />
    </div>
    <div class="order_lock">
      <div>
        <van-tabs @click="changeTab">
          <van-tab title="午餐">
            <div class="">
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单类型</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">老人餐</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单项目</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">下月午餐</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <!-- <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">菜品单价</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">10.00元</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider /> -->
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">预计金额</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">
                      {{ getMonthCountDay() * 10 }}元
                    </div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单生效月</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ bookDate() }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <div class="black"></div>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">联系方式</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ user.phone }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">姓名</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ user.userName }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单时间</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ nowDate() }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
            </div>
          </van-tab>
          <van-tab title="晚餐">
            <div class="">
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单类型</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">老人餐</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单项目</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">下月晚餐</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">预计金额</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">
                      {{ getMonthCountDay() * 10 }}元
                    </div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单生效月</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ bookDate() }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <div class="black"></div>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">联系方式</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ user.phone }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">姓名</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ user.userName }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单时间</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ nowDate() }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
            </div>
          </van-tab>
          <van-tab title="全餐">
            <div class="">
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单类型</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">老人餐</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单项目</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">下月全餐</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">预计金额</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">
                      {{ getMonthCountDay() * 25 }}元
                    </div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单生效月</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ bookDate() }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <div class="black"></div>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">联系方式</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ user.phone }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">姓名</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ user.userName }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
              <van-row>
                <van-col span="8" offset="2">
                  <div class="pang-goods-name">订单时间</div>
                </van-col>
                <van-col span="10" offset="2">
                  <div class="pang-control">
                    <div class="pang-goods-name">{{ nowDate() }}</div>
                  </div>
                </van-col>
              </van-row>
              <van-divider />
            </div>
          </van-tab>
        </van-tabs>
        <div class="totalMoeny">
          <van-submit-bar
            :price="numberToSinglePrice[orderType] * getMonthCountDay() * 100"
            button-text="提交订单"
            @submit="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import url from "@/serviceAPI.config.js";
import { Dialog, Toast } from "vant";

export default {
  mounted() {
    this.getUserInfo();
  },
  data() {
    return {
      orderType: 5,
      user: {},
      numberToSinglePrice: {
        5: 10,
        6: 10,
        7: 25,
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    changeTab(value) {
      this.orderType = value;
    },
    getUserInfo() {
      this.user = JSON.parse(localStorage.getItem("user"));
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
    bookDate() {
      var nowDate = new Date();
      var date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 2,
        day: nowDate.getDate() + 1,
      };
      var systemDate =
        date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);
      return systemDate;
    },
    getMonthCountDay() {
      const nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      return 32 - new Date(year, month, 32).getDate();
    },
    Dialogdetail() {
      Dialog.alert({
        confirmButtonColor: "white",
        title: "APP结算方式详解",
        message:
          "本APP斤斤计较急急急急急急急急急急急急急急急斤斤计较急急急急急急急急急急急急急急急",
      }).then(() => {
        // on close
      });
    },
    addOrder(payload) {
      axios({
        url: url.addMealOrder,
        method: "post",
        data: payload,
      })
        .then((response) => {
          if (response.data.code === 200) {
            Toast.success("提交成功");
            window.location.href = "/";
          } else if (response.data.code === 202) {
            Toast.fail(response.data.message);
          } else {
            Dialog.confirm({
              title: '提示',
              message: response.data.message,
              confirmButtonColor: "white",
            })
              .then(() => {
                this.editOrder(payload)
              })
              .catch(() => { });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editOrder(payload) {
      axios({
        url: url.editMealOrder,
        method: "post",
        data: payload,
      })
        .then((response) => {
          if (response.data.code === 200) {
            Toast.success("修改成功");
            window.location.href = "/";
          } else {
            Toast.fail("修改失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      const type = Number(this.orderType);
      const { userNumber, commiteId } = JSON.parse(
        localStorage.getItem("user")
      );
      const time = this.bookDate();
      const price = this.numberToSinglePrice[this.orderType] * this.getMonthCountDay()

      this.addOrder({
        type,
        userNumber,
        commiteId,
        time,
        price,
      });
    },
  },
};
</script>

<style>
.order_lock {
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  /* margin: 10px auto; */
}
.pang-goods-name {
  font-size: 14px;
  /* margin: 20px auto; */
  text-indent: 20px;
  margin-top: 10px;
  /* display: inline; */
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.black {
  height: 10px;
}
.data {
  width: 50%;
}
.good_name {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>