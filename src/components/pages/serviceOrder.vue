<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="生活服务"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div v-show="activeKey === 0">
      <van-row>
        <van-col span="15">
          <van-cell title="所在社区为： " icon="location-o" />
        </van-col>
        <van-col span="9">
          <van-cell :value="user.commiteName" />
        </van-col>
      </van-row>
      <van-card thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
        <template slot="tags">
          <van-tag plain type="danger">免费</van-tag>
        </template>
        <template slot="title">
          <div class="service_name">家庭保洁</div>
        </template>
        <template slot="desc">
          <div class="service_description">服务范围包括：厨房等</div>
        </template>
        <template slot="footer">
          <van-button size="normal" @click="gotoOrderDetailPage(1)"
            >一键下单</van-button
          >
        </template>
      </van-card>
      <van-card thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
        <template slot="tags">
          <van-tag plain type="danger">付费</van-tag>
        </template>
        <template slot="desc">
          <div class="service_description">服务范围: 电视电脑维修等</div>
        </template>
        <template slot="title">
          <div class="service_name">家电维修</div>
        </template>
        <template slot="footer">
          <van-button size="normal"  @click="gotoOrderDetailPage(4)">一键下单</van-button>
        </template>
      </van-card>
      <van-card thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
        <template slot="tags">
          <van-tag plain type="danger">免费</van-tag>
        </template>
        <template slot="desc">
          <div class="service_description">其他上门服务</div>
        </template>
        <template slot="title">
          <div class="service_name">需要帮助</div>
        </template>
        <template slot="footer">
          <van-button size="normal" @click="gotoOrderDetailPage(2)"
            >一键下单</van-button
          >
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import url from "@/serviceAPI.config.js";

export default {
  mounted() {
    this.getUserInfo();
  },
  data() {
    return {
      activeKey: 0,
      date: "",
      show: false,
      value1: 0,
      value2: "a",
      user: {},
    };
  },
  methods: {
    onChange(index) {
      this.activeKey = index;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
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
    gotoOrderDetailPage(type) {
      this.$router.push({
        name: 'OrderS',
        query: {
          type,
        }
      });
    },
  },
};
</script>

<style scoped>
.service_name {
  margin-top: 5px;
  font-size: 16px;
}

.service_description {
  margin: 20px 0;
}
</style>