<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="基础信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-contact-card
        type="edit"
        :name="user.userName"
        :tel="user.phone"
        @click="onEdit"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  mounted() {
    this.getUserInfo();
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUserInfo() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    onEdit() {
      Toast("社区已审核，暂无法修改");
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.test {
  /* background-color: red; */
}
</style>