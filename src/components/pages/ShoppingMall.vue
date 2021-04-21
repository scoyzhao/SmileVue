<template>
  <div>
    <van-sticky>
      <div class="navbar-div">
        <van-nav-bar title="首页" />
      </div>
    </van-sticky>
    <!--swiper area-->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(url, index) in bannerPicArray" :key="index">
          <img class="block_img" :src="url" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--adbanner area-->
    <!-- <div>
            <van-col span="2">
            <img :src="locationIcon" width="80%" class="location-icon"/>
            </van-col>
        </div> -->
    <!--Recommend goods area-->
    <div class="reco_name">
      <van-notice-bar
        left-icon="volume-o"
        :text="'欢迎' + user.commiteName + ' 的 ' + user.userName + '回来~'"
      />
    </div>
    <div class="button_style">
      <van-grid clickable :column-num="3" gutter="10">
        <van-grid-item
          icon="shop-collect-o"
          text="微笑跑腿"
          @click="gotoPage('/CategoryList', 0)"
        />
        <van-grid-item
          icon="friends-o"
          text="社区订餐"
          @click="gotoPage('/GroupOrder', 1)"
        />
        <van-grid-item
          icon="contact"
          text="老人订餐"
          @click="gotoPage('/oldOrder', 0)"
        />
      </van-grid>
    </div>
    <div class="button_style">
      <van-grid clickable :column-num="3" gutter="10">
        <van-grid-item
          icon="wap-home-o"
          text="生活服务"
          @click="gotoPage('/serviceOrder', 0)"
        />
        <van-grid-item
          icon="like-o"
          text="健康预约"
          @click="gotoPage('/bookOrder', 0)"
        />
        <van-grid-item
          icon="location-o"
          text="天气新闻"
          @click="gotoWeatherPage"
        />
      </van-grid>
    </div>
    <div class="description">
      <div class="description-title">温馨提示：</div>
      <div class="description-content-wrap">
        <div class="description-content">微笑跑腿：仅限订当日服务</div>
        <div class="description-content">社区点餐：需提前一个月预定餐</div>
        <div class="description-content">老人服务：预定餐、上门服务等</div>
      </div>
    </div>
    <div class="step-area" v-show="user.type === 0">
      <div class="step-title">{{ mealMsg }}</div>
      <van-steps
        :active="mealActive"
        active-icon="success"
        active-color="#DB3D3C"
      >
        <van-step>已下单</van-step>
        <van-step>商家制作中</van-step>
        <van-step>正在派送中</van-step>
        <van-step>已送达</van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import goodsInfo from "../component/goodsInfoComponent";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";

export default {
  mounted() {
    this.initQuery();
  },
  data() {
    return {
      bannerPicArray: [],
      user: {},
      orderMealType: null,
      mealActive: 2,
      mealMsg: '今日暂无订餐~',
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  components: { swiper, swiperSlide, floorComponent, goodsInfo },
  computed: {
    showStepArea: function() {
      return orderMealType && this.user.type === 0;
    }
  },
  methods: {
    initQuery() {
      this.getMenuList();
      this.getUserInfo();
      this.getOrderType();
    },
    getUserInfo() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getCommiteName(this.user.commiteId);
    },
    getCommiteName(id) {
      axios({
        // 获取菜单的uri
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
    getMenuList() {
      axios({
        // 获取菜单的uri
        url: url.getMenuList,
        method: "get",
      })
        .then((response) => {
          if (response.data.code == 200) {
            this.bannerPicArray = response.data.data.map(function (el) {
              return el.url;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    gotoPage(url, type) {
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log(type)
      // console.log(user.type)
      if (user.type == type) {
        return this.$router.push(url);
      } else {
        return Toast.fail("你不能去那里哦~");
      }
    },
    gotoWeatherPage() {
      window.location.href = "http://tianqi.2345.com/";
    },
    nowDate() {
      var nowDate = new Date();
      var date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
      };
      var systemDate =
        date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);
      // console.log(systemDate);
      return systemDate;
    },
    // * 获取老人当天是否有订餐，如果有返回类型：5 午餐 6 晚餐 7 全餐
    getOrderType() {
      const { userNumber } = JSON.parse(localStorage.getItem("user"));
      axios({
        // 获取菜单的uri
        url: url.getMealOrderList,
        method: "post",
        data: { userNumber },
      })
        .then((response) => {
          if (response.data.code === 200) {
            const { data } = response.data;
            for (let i = 0; i < data.length; i++) {
              // * status = 2 表示审核已完成
              if (data[i].time === this.nowDate() && data[i].status === 2) {
                if (data[i].type === 5) {
                  this.mealMsg='今日有预定午餐(大约12:00送达)';
                } else if (data[i].type === 6) {
                  this.mealMsg='今日有预定晚餐(大约18:00送达)';
                } else if (data[i].type === 7) {
                  this.mealMsg='今日有预定午餐(大约12:00送达)、晚餐(大约18:00送达)';
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.button_style {
  padding: 0px, 0px, 0px, 10px;
  margin-top: 5px;
}
.search-input {
  width: 100%;
  height: 2rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #a0afb3;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  clear: both;
  max-height: 15rem;
  margin: 5px 0;
  height: 200px;
  overflow: hidden;
}
.topname {
  text-align: center;
  color: #f0e1e3;
  font-size: 18px;
  line-height: 1rem;
}
.reco_name {
  /* position: absolute;left:85%; */
  background-color: #f0f8fa;
  border-color: #74d3c5;
  color: #74d3c5;
}
.type_name1 {
  margin: 1px;
  background-color: #e3f2f6;
  border-color: #ffffff;
  color: #6699cc;
  width: 100%;
  height: 4rem;
  font-weight: bold;
  border-radius: 2%;
  font-size: 20px;
}
.type_name2 {
  margin: 1px;
  background-color: #e3f2f6;
  /* border-color: #74D3C5; */
  color: #6699cc;
  width: 100%;
  height: 5rem;
  font-weight: bold;
  border-radius: 2%;
  font-size: 20px;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1;
}
.left_name {
  margin-top: 0.3rem;
  margin-left: 1rem;
}
.step-area {
  border-bottom: 1px solid #f2f3f5;
  margin-top: 0.5rem;
  padding-bottom: 3rem;
  border-radius: 15px;
  background-color: #fff;
  margin-top: 0.5rem;
}
.step-title {
  padding: 0.6rem 0.8rem 0.6rem 0.8rem;
  background-color: #fff;
  font-weight: bold;
  font-size: 0.5rem;
}
.recommend-black {
  height: 2rem;
  background-color: #f0f8fa;
}
.recommend-title {
  border-bottom: 1px solid #f0f8fa;
  font-size: 10px;
  padding: 0.2rem;
  color: #a0afb3;
  height: 1rem;
  background-color: #e3f2f6;
  text-indent: 10px;
}
.recommend-menu {
  border-bottom: 1px solid #f0f8fa;
  font-size: 14px;
  padding: 0.2rem;
  color: #a0afb3;
  height: 1.5rem;
  background-color: #e3f2f6;
  text-indent: 10px;
}
.recommend-text {
  background-color: #ffffff;
  margin-top: 1rem;
  /* margin-left:1rem; */
  height: 5.5rem;
  font-size: 16px;
  border-bottom: 1px solid #f0f8fa;
  color: #a0afb3;
}
.recommend-button {
  border-bottom: 1px solid #fff;
  font-size: 16px;
  /* color:#cc6123; */
  height: 2rem;
}
.recommend-addr {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #a0afb3;
}
.recommend-body {
  border-bottom: 1px solid #eee;
  background-color: #ebfefe;
  margin-top: 0%;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 15rem;
  overflow: hidden;
  background-color: #fff;
}
.block_img {
  display: block;
}

.description {
  padding: 0.6rem 0.8rem 0.6rem 0.8rem;
  border-bottom: 5px solid #dcdee0;
  border-radius: 15px;
  background-color: #fff;
  margin-top: 0.5rem;
}

.description-title {
  margin-bottom: 0.8rem;
  font-weight: bold;
  font-size: 0.8rem;
}

.description-content-wrap {
  background-color: #f2f3f5;
  border-radius: 10px;
  padding: 0.2rem;
}

.description-content {
  margin: 0.2rem 0 0 0.8rem;
  font-size: 0.5rem;
}
.special-area {
  height: 10rem;
}
</style>
