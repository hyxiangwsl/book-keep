<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mpType: "app",
  onLaunch() {
    let userId = uni.getStorageSync("userId");
    if (userId) {
      uni.navigateTo({ url: "/pages/index/index?"+`userId=${userId}` });
    } else {
      uni.navigateTo({ url: "/pages/login/index" });
    }
  },
  onShow() {
    setTimeout(() => {
      // #ifdef APP-PLUS
      plus.navigator.closeSplashscreen();
      // #endif
    }, 2000);
  },
  onHide() {},
});
</script>

<style>
/*每个页面公共css */
.navi {
  background-color: #85c495;
  width: 100%;
  height: 75px;
}
.font-main {
  color: #a8c3b4;
  font-size: 36rpx;
}
.font-plc {
  color: #f8f8f8;
  font-size: 30rpx;
}
.font-plc2 {
  color: #a8c3b4;
  font-size: 30rpx;
}
</style>
