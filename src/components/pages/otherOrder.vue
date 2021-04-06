<template>
  <div>
      <div class="navbar-div">
      <van-nav-bar
        title="天气详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>

</style>