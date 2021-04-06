<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <div class="input_name">
        <van-field
          v-model="username"
          left-icon="manager-o"
          placeholder="   请输入真实姓名"
          @click-icon="username = ''"
          :error-message="usernameErrorMsg"
        />
      </div>

      <div class="input_name">
        <van-field
          v-model="password"
          type="password"
          left-icon="lock"
          placeholder="   请输入密码"
          :error-message="passwordErrorMsg"
        />
      </div>

      <div class="input_name">
        <van-field
          v-model="phone"
          type="tel"
          left-icon="phone-circle-o"
          placeholder="   请输入手机号"
          :error-message="phoneErrorMsg"
        />
      </div>

      <div class="input_name">
        <van-field
          v-model="userNumber"
          type="number"
          left-icon="phone-circle-o"
          placeholder="   请输入证件号"
          :error-message="userNumberErrorMsg"
        />
      </div>

      <div>
        <van-field
          readonly
          clickable
          left-icon="wap-home-o"
          :value="commiteName"
          placeholder="  选择所在城市社区"
          @click="showPicker = true"
          :error-message="commitNameErrorMsg"
        />

        <!-- <van-icon name="phone-circle-o" /> -->
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>

      <div class="register-button">
        <van-button
          @click="registerAction"
          size="large"
          :loading="openLoading"
          >马上注册</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { Picker } from "vant";
export default {
  mounted() {
    // 调用获取社区信息的接口，并且放到colunmns理
    this.getCommiteInfo();
  },
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      userNumber:"",
      openLoading: false, //是否开启用户注册的Loading状态
      usernameErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "", //当密码出现错误时的提示信息
      phoneErrorMsg: "", //当密码出现错误时的提示信息
      userNumberErrorMsg: "",
      commitNameErrorMsg: '',
      value: "",
      columns: [],
      originColumns: [],
      commiteName: '',
      showPicker: false,
    };
  },
  filters:{
    commiteFilter() {
      return toMoney(money);
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
    },

    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password,
          phone: this.phone,
          commiteId: this.getCommitIdByName(this.commiteName),
          userNumber: this.userNumber,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            Toast.success(response.data.message);
            this.$router.push("/login");
          } else {
            console.log(response.data.message);
            this.openLoading = false;
            Toast.fail("注册失败");
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.fail("注册失败2");
          this.openLoading = false;
        });
    },
    //****表单验证方法
    checkForm() {
      let isOk = true;
      if (!this.username) {
        this.usernameErrorMsg = "姓名不能为空";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.phone.length != 11) {
        this.phoneErrorMsg = "手机号格式错误";
        isOk = false;
      } else {
        this.phoneErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      if (this.userNumber.length != 14) {
        this.userNumberErrorMsg = "证件号格式错误";
        isOk = false;
      } else {
        this.userNumberErrorMsg = "";
      }
      if (!this.commiteName) {
        this.commitNameErrorMsg = "社区不能为空";
        isOk = false;
      } else {
        this.commitNameErrorMsg = "";
      }
      return isOk;
    },
    onConfirm(value) {
      this.commiteName = value;
      this.showPicker = false;
    },
    getCommitIdByName(name) {
      for (let i = 0; i < this.originColumns.length; i++) {
        if (name === this.originColumns[i].name) {
          return this.originColumns[i].id;
        }
      }
    },
    getCommiteInfo() {
      axios({
        // 获取社区信息的uri
        url: url.getCommiteInfo,
        method: "get",
      })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            this.columns = response.data.data.map(function(el) {
              return el.name
            });
            this.originColumns = response.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.register-panel {
  width: 90%;
  /* padding-bottom: 80px;s */
  border-radius: 0.8rem;
  margin: 50px auto;
}
.register-button {
  padding-top: 1.5rem;
}
.input_name {
  margin-bottom: 1.5rem;
}
</style>