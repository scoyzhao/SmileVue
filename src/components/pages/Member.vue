<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="我的" />
    </div>
    <div class="message">
      <div class="member_icon">
        <van-image
          round
          width="3.5rem"
          height="3.5rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="member_id">
          {{ user.userName }} 用户
          <van-tag v-show="user.auditStatus == 0" type="danger">未审核</van-tag>
        </div>
      </div>
    </div>
    <div class="body_name"></div>
    <van-notice-bar
      v-show="user.auditStatus == 0"
      left-icon="volume-o"
      text="您还未被审核，请尽快联系社区工作人员！"
    />
    <div>
      <van-cell-group>
        <van-cell title="历史订单" is-link url="/historyOrder" />
        <van-cell title="基础信息" is-link url="/OrderBody" />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
    <div class="login_out">
      <van-button type="default" size="large" @click="logout"
        >退出当前账户</van-button
      >
    </div>
  </div>
</template>

<script>
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
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    },
    getUserInfo() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f7f8fa;
  /* height: 100rem; */
}
.search-bar {
  height: 2.2rem;
  background-color: #6699cc;
  overflow: hidden;
  text-align: center;
  color: #f0e1e3;
  font-size: 18px;
  line-height: 1rem;
}
.top-img {
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin-left: 1rem;
  border-radius: 50px;
}
.top {
  height: 3.5rem;
  text-align: center;
  padding-top: 2rem;
  background-color: #ffffff;
}
.login {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
}
.login div {
  flex: 1;
  text-align: center;
}
.body_name {
  /* background-color: #f0f8fa; */
  height: 0.5rem;
}
.message {
  background-color: #fff;
  padding: 2rem 0.8rem 1.5rem 2rem;
}
.member_id {
  font-size: 16px;
  display: inline;
  margin-left: 1.5rem;
  /* height: 50px; */
  line-height: 65px;
  /* text-align: center; */
}
.member_icon {
  display: flex;
  /* padd 1rem; */
}
.login_out {
  padding: 0.5rem;
  /* color:#f0f8fa ; */
  /* border:#fff; */
  /* padding: .3rem; */
}
</style>