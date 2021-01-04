<template>
  <view class="container">
    <view class="logo">
      <text class="title">简·账</text>
      <text class="title-pro">记录你的账本生活</text>
    </view>
    <view class="input-price">
      <input
        class="uni-input"
        placeholder-class="font-plc"
        focus
        v-model="nickName"
        placeholder="给自己一个昵称吧"
      />
    </view>
    <view class="submit">
      <button type="primary" :loading="loading" @click="submit">
        确定进入
      </button>
    </view>
  </view>
</template>
<script>
import Bmob from "hydrogen-js-sdk";
export default {
  data() {
    return {
      loading: false,
      nickName: "",
    };
  },
  computed: {},
  methods: {
    submit() {
      console.log(this.nickName);
      if (this.nickName == "") {
        uni.showToast({
          title: "昵称不能为空",
          duration: 2000,
          icon: "none",
        });
        return;
      }
      const query = Bmob.Query("user_info");
      query.set("username", this.nickName);
      this.loading = true;
      query
        .save()
        .then((res) => {
          // console.log(res);
          uni.setStorageSync("userId", res.objectId);
          uni.navigateTo({ url: "/pages/index/index?"+`userId=${res.objectId}`});
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  flex-direction: column;
  background-color: #f4fcf8;
  background: url("../../static/bg.jpg") no-repeat;
}
.logo {
  height: 50%;
  width: 100%;
  background-position-x: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo .title {
  font-size: 60rpx;
  font-weight: 700;
  color: #e5ad78;
}
.logo .title-pro {
  font-size: 36rpx;
  font-weight: 500;
  color: #e5ad78;
  margin-top: 30rpx;
}
.input-price {
  width: 80%;
  background-color: #8cc59a;
  margin: 0 40rpx;
}
.input-price input {
  padding: 30rpx 0;
}
.submit {
  width: 80%;
  margin-top: 150rpx;
}
.submit button {
  background-color: #8cc59a;
}
</style>