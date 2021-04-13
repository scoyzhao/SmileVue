<template>
  <div class="wrap">
    <div v-if="orderList.length === 0">
      <van-empty description="暂无订单" />
    </div>
    <div v-else v-for="(item, index) in orderList" :key="index">
      <orderItemComponent :item="item" />
    </div>
  </div>
</template>

<script>
import orderItemComponent from "../component/orderItemComponent";

export default {
  props: ["orderList"],
  components: { orderItemComponent },
};
</script>

<style scoped>
.wrap {
  margin-bottom: 60px;
}
</style>