<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="历史订单"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
    </van-sticky>
    <div>
      <van-tabs v-model="active" @change="changeTab">
        <van-tab title="订餐订单">
          <HistoryOrderList :orderList="mealOrderList" />
        </van-tab>
        <van-tab title="其他订单">
          <HistoryOrderList :orderList="lifeOrderList" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "../../http";
import url from "@/serviceAPI.config.js";
import HistoryOrderList from "./HistoryOrderList";

export default {
  data() {
    return {
      active: 0,
      mealOrderList: [],
      lifeOrderList: [],
    };
  },
  mounted() {
    this.getMealOrderList();
  },
  components: { HistoryOrderList },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getMealOrderList() {
      // TODO 获取订餐订单
      console.log("meal");
      this.mealOrderList = [];
    },
    getLifeOrderList() {
      const { userNumber } = JSON.parse(localStorage.getItem("user"));
      axios({
        // 获取社工的uri
        url: url.getLifeOrderList,
        method: "post",
        data: { userNumber },
      })
        .then((response) => {
          this.lifeOrderList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeTab(index) {
      if (index === 0) {
        this.getMealOrderList();
      } else {
        // 获取生活订单数据
        this.getLifeOrderList();
      }
    },
  },
};
</script>

<style>
</style>