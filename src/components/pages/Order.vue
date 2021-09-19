<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-notice-bar
        left-icon="volume-o"
        text="请仔细查看下方信息并确认无误后，点击提交订单。"
      />
    </div>
    <div class="order_lock">
      <van-cell
        center
        title=" 请选择预约日期"
        is-link
        :value="date"
        @click="show = true"
      />
      <van-calendar v-model="show" @confirm="onConfirm1" />
      <!-- <van-col span="8" offset="2">
          <div class="pang-goods-name">预约时间</div>
        </van-col>
        <van-col span="10" offset="2">
          <div class="pang-control">
            <div class="pang-goods-name">3/19</div>
          </div>
        </van-col> -->
    </div>
    <div class="order_lock">
      <van-row>
        <van-col span="8" offset="2">
          <div class="pang-goods-name">订单类型</div>
        </van-col>
        <van-col span="10" offset="2">
          <div class="pang-control">
            <div class="pang-goods-name">健康预约</div>
          </div>
        </van-col>
      </van-row>
      <van-divider />
      <van-row>
        <van-col span="8" offset="2">
          <div class="pang-goods-name">预约科目</div>
        </van-col>
        <van-col span="10" offset="2">
          <div class="pang-control">
            <div class="pang-goods-name">
              {{ doctorMap[doctor.description] }}
            </div>
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
            <div class="pang-goods-name">0.00元</div>
          </div>
        </van-col>
      </van-row>
      <van-divider />
      <van-row>
        <van-col span="8" offset="2">
          <div class="pang-goods-name">预约医师</div>
        </van-col>
        <van-col span="10" offset="2">
          <div class="pang-control">
            <div class="pang-goods-name">{{ doctor.name }}</div>
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
    <div>
      <van-submit-bar @submit="onSubmit" button-text="提交订单" />
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import url from "@/serviceAPI.config.js";
import { doctorMap } from "../../config";
import { Toast } from "vant";

export default {
  mounted() {
    this.getUserInfo();
    this.setDoctor();
  },
  data() {
    return {
      activeKey: 0,
      user: {},
      value: "",
      showPicker: false,
      workername: "",
      workernameErrorMsg: "",
      columns: [],
      date: "",
      show: false,
      doctorMap: doctorMap,
      doctor: {},
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm1(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    onConfirm(value) {
      this.workername = value;
      this.showPicker = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getUserInfo() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getCommiteName(this.user.commiteId);
    },
    getCommiteName(id) {
      axios({
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
    setDoctor() {
      const { name, id, description } = this.$route.query;
      this.doctor = {
        name,
        id,
        description,
      };
    },
    checkOrderTime() {
      let isOk = false;
      if (this.date) {
        isOk = true;
      }

      return isOk;
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
          } else {
            Toast.fail("预约失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      const { userNumber } = JSON.parse(localStorage.getItem("user"));
      const time = this.nowDate();
      const type = 0;
      if (!this.checkOrderTime()) {
        return Toast.fail("请先选择预约日期哦~");
      }

      const description = `${this.date} 预约 ${
        this.doctorMap[this.doctor.description]
      }${this.doctor.name} 检查身体`;

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

<style>
.order_lock {
  background-color: #fff;
  /* border-radius: 5px; */
  /* width: 100%; */
  border-bottom: 5px solid #dcdee0;
  border-top: 1px solid #dcdee0;
  margin: 10px 10px 10px;
  border-radius: 30px;

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