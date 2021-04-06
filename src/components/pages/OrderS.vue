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
      <van-row>
        <van-col span="8" offset="2">
          <div class="pang-goods-name">订单类型</div>
        </van-col>
        <van-col span="10" offset="2">
          <div class="pang-control">
            <div class="pang-goods-name">生活服务</div>
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
            <div class="pang-goods-name">{{ this.typeName }}</div>
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
          <div class="pang-goods-name">预约时间</div>
        </van-col>
        <van-col span="10" offset="2">
          <div class="pang-control">
            <div class="pang-goods-name">{{ bookDate() }}</div>
          </div>
        </van-col>
      </van-row>
      <van-divider />
      <van-row>
        <!-- <van-col span="8" offset="2">
          <div class="pang-goods-name">上门社工</div>
        </van-col>
        <van-col span="10" offset="2">
          <div class="pang-control">
            <div class="pang-goods-name">{{ getHouseKeeper() }}</div>
          </div>
        </van-col> -->
        <van-field
          readonly
          clickable
          input-align="center"
          label-align="center"
          label="社工"
          label-width="6.5em"
          :value="workername"
          placeholder="选择社工"
          @click="showPicker = true"
          :error-message="workernameErrorMsg"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </van-row>
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
        <van-col span="10" offset="3">
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
      <van-submit-bar
        button-text="提交订单"
        tip="温馨提示：订单生效时间为提交订单的下一天！！！"
        @submit="onSubmit"
      />
      <!-- @submit="OrderSAction" -->
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import url from "@/serviceAPI.config.js";
import { numberToTypeMap } from "../../config";
import { Toast } from "vant";

export default {
  mounted() {
    this.getUserInfo();
    this.getWorkerList();
    this.setType();
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
      typeName: "",
    };
  },
  watch: {
    $route: function (to, from) {
      //执行数据更新查询
      this.setType();
      this.getWorkerList();
    },
  },
  methods: {
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
    getWorkerList() {
      const { type } = this.$route.query;
      axios({
        // 获取社工的uri
        url: url.getWorkerList,
        method: "post",
        data: { type },
      })
        .then((response) => {
          if (response.data.code == 200) {
            this.columns = response.data.data.map(function (el) {
              return el.name;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // OrderSAction() {
    //   this.checkForm() && this.axiosworker();
    // },
    // axiosworker() {
    //   this.openLoading = true;
    //   axios({
    //     url: url.registerUser,
    //     method: "post",
    //     data: {
    //       userName: this.username,
    //       password: this.password,
    //       phone: this.phone,
    //       commiteId: this.getCommitIdByName(this.commiteName),
    //       userNumber: this.userNumber,
    //     },
    //   })
    //     .then((response) => {
    //       console.log(response);
    //       if (response.data.code == 200) {
    //         Toast.success(response.data.message);
    //         this.$router.push("/login");
    //       } else {
    //         console.log(response.data.message);
    //         this.openLoading = false;
    //         Toast.fail("注册失败");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       Toast.fail("注册失败2");
    //       this.openLoading = false;
    //     });
    // },
    // checkForm() {
    //   let isOk = true;
    //   if (!this.workername) {
    //     this.workernameErrorMsg = "请选择社工";
    //     isOk = false;
    //   } else {
    //     this.workernameErrorMsg = "";
    //   }
    //   return isOk;
    // },
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
        month: nowDate.getMonth() + 1,
        day: nowDate.getDate() + 1,
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
    setType() {
      const { type } = this.$route.query;
      this.typeName = numberToTypeMap[type] || "未知";
      this.workername = "";
    },
    checkWorkerName() {
      let isOk = false;
      if (this.workername) {
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
            window.location.href = "/main";
          } else {
            Toast.fail("预约失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      if (!this.checkWorkerName()) {
        return Toast.fail("请先选择社工~");
      }

      const { userNumber } = JSON.parse(localStorage.getItem("user"));
      const time = this.nowDate();
      const { type } = this.$route.query;
      const description = `${this.bookDate()} 预约了 ${this.workername} 服务`;

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
  margin-left: 10px;
  margin-right: 10px;
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