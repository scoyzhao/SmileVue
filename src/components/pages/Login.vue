<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="登陆" />
    </div>
    <div class="member_icon">
      <van-image
        round
        width="3rem"
        height="3rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </div>

    <div class="register-panel">
      <van-cell-group>
        <div class="input_name">
          <van-field
            v-model="phone"
            left-icon="manager-o"
            placeholder="   请输入手机"
            clearable
            @click-icon="phone = ''"
            :error-message="phoneErrorMsg"
          />
        </div>
      </van-cell-group>
      <van-cell-group>
        <div class="">
          <van-field
            v-model="password"
            type="password"
            left-icon="lock"
            placeholder="   请输入密码"
            :error-message="passwordErrorMsg"
          />
        </div>
      </van-cell-group>
      <div class="register-button">
        <van-button
          
          @click="loginAction"
          size="large"
          :loading="openLoading"
          >登录</van-button
        >
      </div>
    </div>
    <!-- <div class="register-panel">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div> -->
    <div class="tip">
      <a href="/Register">注册新用户</a>
    </div>
    <div class="login_bottom">
      Copyright@2020 浙江理工大学Team ALL rights reserved
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { Picker } from "vant";
export default {
  data() {
    return {
      phone: "",
      password: "",
      tel: "",
      openLoading: false, //是否开启用户注册的Loading状态
      phoneErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "", //当密码出现错误时的提示信息
      value: "",
      columns: [],
      showPicker: false,
    };
  },
  created() {
    // if (localStorage.userInfo) {
    //   Toast.success("您已经登录");
    //   this.$router.push("/main");
    // }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      this.checkForm() && this.axiosLoginUser();
    },
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          phone: this.phone,
          password: this.password,
        },
      })
        .then((response) => {
          if (response.data.code == 200) {
            new Promise((resolve, reject) => {
              console.log('respone.data', response.data)
              const {user, token} = response.data.data
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(user))

              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch((err) => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            this.openLoading = false;
            Toast.fail("登陆失败");
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.fail("登陆失败");
          this.openLoading = false;
        });
    },
    //****表单验证方法
    checkForm() {
      let isOk = true;
      if (this.phone.length != 11) {
        this.phoneErrorMsg = "用户名格式错误";
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

      return isOk;
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
  }
};
</script>

<style scoped>
.register-panel {
  width: 90%;
  border-radius: 0.8rem;
  margin: 50px auto;
  /* padding: 80px; */
}
.register-button {
  padding-top: 1.5rem;
}
.member_icon {
  /* display: flex; */
  padding: 3rem;
  margin: 0 auto;
  text-align: center;
  height: 20px;
  line-height: 20px;
}
.input_name {
  margin-bottom: 1.5rem;
}
.tip {
  /* color: #23233; */
  text-align: right;
  font-size: 14px;
  margin-right: 50px;
}
a:link {
  color: #969799;
} /* 未被访问的链接 */
a:visited {
  color: #969799;
} /* 已被访问的链接 */
a:hover {
  color: #969799;
} /* 鼠标指针移动到链接上 */
.login_bottom {
  position: absolute;
  bottom: 30px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>