<template>
  <div class="item_wrap">
    <van-row gutter="16">
      <van-col span="20">
        <div class="item_title">
          <span>{{ item.time }}</span>
          <!-- TODO 类型展示问题 -->
          <span>{{ item.type | typeFilter }}</span>
        </div>
        <div>
          <span class="item_description">{{ item.description }}</span>
        </div>
      </van-col>
      <van-col span="4">
        <span
          :style="{ color: item.status === 2 ? 'green' : 'red' }"
          class="item_status"
        >
          {{ item.status | statusFilter }}
        </span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { orderStatusMap, numberToTypeMap } from "../../config";

export default {
  props: ["item"],
  filters: {
    typeFilter(type) {
      return numberToTypeMap[type] || "未知";
    },
    statusFilter(status) {
      return orderStatusMap[status] || "未知";
    },
  },
  methods: {},
};
</script>

<style scoped>
.item_wrap {
  margin: 15px 10px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  background-color: white;
}

.item_title {
  margin-bottom: 10px;
  font-size: 16px;
}

.item_description {
  color: #646566;
}

.item_status {
  line-height: 80px;
}
</style>