<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="健康预约"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="selectType" :options="option1" @change="changeDocType"/>
    </van-dropdown-menu>
    <!-- <van-cell title="请选择预约日期" :value="date" @click="show = true" />
      <van-calendar v-model="show" @confirm="onConfirm" /> -->
    <div v-for="(item, index) in doctorList" :key="index">
      <van-card
        :title="item.name"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      >
        <template slot="tags">
          <van-tag plain type="danger">{{doctorMap[item.description]}}</van-tag>
        </template>
        <template slot="desc">
          <div class="test">
            身高一米九，拥有八块腹肌的绝世美貌男子，拥有亿万豪宅，在京城数一数二的任人物。。。
          </div>
        </template>
        <template slot="footer">
          <van-button size="normal" @click="gotoOrderPage(item)">一键预约</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import { doctorMap } from "../../config";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      selectType: -1,
      option1: [
        { text: "全部", value: -1 },
        { text: "内科", value: 0 },
        { text: "外科", value: 1 },
      ],
      doctorList: [],
      originDocList: [],
      doctorMap: doctorMap,
    };
  },
  mounted() {
    this.getDoctorList();
  },
  methods: {
    onChange(index) {
      this.activeKey = index;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getDoctorList() {
      axios({
        // 获取社工的uri
        url: url.getWorkerList,
        method: "post",
        data: { type: 0 },
      })
        .then((response) => {
          if (response.data.code == 200) {
            this.doctorList = response.data.data;
            this.originDocList = response.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeDocType(value) {
      this.selectType = value;
      if (value !== -1) {
        this.doctorList = this.originDocList.filter(el => Number(el.description) === value)
      } else {
        this.doctorList = this.originDocList;
      }
    },
    gotoOrderPage(doctor) {
      const {description, id, name} = doctor;
      this.$router.push({
        name: 'Order',
        query: {
          name,
          id,
          description,
        }
      });
    }
  },
};
</script>

<style>
</style>