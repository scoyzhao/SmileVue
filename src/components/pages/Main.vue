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
    console.log(this.nowPath);
    this.changeTabBarActive();
  },
  methods: {
    changeTabBarActive() {
      this.nowPath = this.$route.path;
      if (this.nowPath == "/") {
        this.active = 0;
      }
      if (this.nowPath == "/categoryList") {
        this.active = 1;
      }
      if (this.nowPath == "/cart") {
        this.active = 2;
      }
      if (this.nowPath == "/member") {
        this.active = 3;
      }
    },
    changeTabbar(active) {
      console.log("🚀 ~ file: Main.vue ~ line 55 ~ changeTabbar ~ active", active)
      switch (active) {
        case 0:
          this.$router.push("/");
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
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