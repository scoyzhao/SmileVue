<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar
      v-model="active"
      @change="changeTabbar(active)"
      active-color="#DB3D3C"
      inactive-color="#646566"
    >
      <!-- active-color="#DB3D3C" inactive-color="#fff" -->
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">商品</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      active: 0,
      nowPath: "", //当前路径
    };
  },
  created() {
    this.changeTabBarActive();
  },
  updated() {
    this.changeTabBarActive();
  },
  methods: {
    changeTabBarActive() {
      this.nowPath = this.$route.path;
      const { type } = JSON.parse(localStorage.getItem("user"));

      if (this.nowPath == "/") {
        this.active = 0;
      }
      if (this.nowPath == "/member") {
        this.active = 3;
      }

      if (type === 0) {
        if (this.nowPath == "/categoryList") {
          this.active = 1;
        }
        if (this.nowPath == "/cart") {
          this.active = 2;
        }
      }
    },
    changeTabbar(active) {
      const { type } = JSON.parse(localStorage.getItem("user"));
      switch (active) {
        case 0:
          this.$router.push("/");
          break;
        case 1:
          if (type === 0) {
            this.$router.push({ name: "CategoryList" });
          } else {
            Toast.fail("你不能去那里哦~");
          }
          break;
        case 2:
          if (type === 0) {
            this.$router.push({ name: "Cart" });
          } else {
            Toast.fail("你不能去那里哦~");
          }
          break;
        case 3:
          this.$router.push({ name: "Member" });
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>