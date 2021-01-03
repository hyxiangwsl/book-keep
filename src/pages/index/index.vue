<template>
  <view class="content">
    <view class="navi">
      <view class="nav-picker">
        <picker
          @change="bindPickerChange"
          :value="index"
          :range="array"
          mode="multiSelector"
        >
          <view class="uni-input">
            <image src="../../static/icon/摘选.png"></image>
            <text>{{ time }}</text>
          </view>
        </picker>
      </view>
      <image class="nav-setting" src="../../static/icon/设置.png"></image>
    </view>
    <view class="content-main">
      <view class="total"
        ><view class="font-main title">{{ time }}</view>
        <view class="font-main title"
          >收入:{{ addAll.toFixed(2) }} 支取:{{ cutAll.toFixed(2) }}</view
        >
      </view>
      <view class="mainView">
        <view class="list" v-for="(item, index) in dataList" :key="index">
          <view class="list-left">
            <image
              v-if="item.type == '1'"
              src="../../static/icon/add.png"
            ></image>
            <image
              v-if="item.type == '0'"
              src="../../static/icon/cut.png"
            ></image>
            <text>{{ item.desc }}</text>
          </view>
          <view class="list-right">
            <text class="font-main" v-if="item.type == '0'"
              >￥{{ item.count }}</text
            >
            <text style="color: #d81e06" v-if="item.type == '1'"
              >-￥{{ item.count }}</text
            >
          </view>
        </view>
      </view>
    </view>
    <view> </view>
    <view class="bottom">
      <view class="bottom-balance">
        <image src="../../static/icon/三横线.png"></image>
        <text class="bottom-balance-price"
          >余额:￥{{ balance.toFixed(2) }}</text
        >
        <image src="../../static/icon/三横线.png"></image>
      </view>
      <view class="bottom-op">
        <image @click="toCut" src="../../static/icon/jianshao.png"></image>
        <image @click="toAdd" src="../../static/icon/huabanfuben.png"></image>
      </view>
      <!-- <view>
        <keyboard></keyboard>
      </view> -->
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      time: "2021年1月",
      array: [[], []], //选择年份月份数组
      index: 0,
      balance: 10.0,
      dataList: [
        { type: 0, desc: "支出", count: 100 },
        { type: 1, desc: "收入", count: 10 },
        { type: 0, desc: "支出", count: 100 },
        { type: 1, desc: "收入", count: 10 },
      ],
      addAll: 100,
      cutAll: 10,
    };
  },
  onLoad() {},
  onShow() {
    this.array = this.getPickTime();
  },
  methods: {
    bindPickerChange(e: any) {
      let selectArr = e.detail.value;
      this.time = `${this.array[0][selectArr[0]]}${
        this.array[1][selectArr[1]]
      }`;
      console.log("选择时间", selectArr);
    },
    getPickTime() {
      let arr: any[] = [];
      let current = new Date();
      let year = current.getFullYear() - 6;
      let years = [];
      let months = [];
      for (let i = 0; i < 10; i++) {
        years.push(`${year + i}年`);
      }
      for (let i = 0; i < 12; i++) {
        months.push(`${i + 1}月`);
      }
      arr.push(years, months);
      return arr;
    },
    toCut() {
      uni.navigateTo({ url: "/pages/cut/index" });
    },
    toAdd() {
      uni.navigateTo({ url: "/pages/add/index" });
    },
  },
});
</script>

<style>
.navi {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-picker {
  margin-left: 20rpx;
  font-size: 36rpx;
  color: #ebf6f1;
}
.nav-setting {
  margin-right: 20rpx;
  width: 45rpx;
  height: 45rpx;
}
.content {
  height: 100vh;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  flex-direction: column;
  background-color: #f4fcf8;
}
.content-main {
  flex: 1;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  border-bottom: 1rpx solid #85c495;
  margin-top: 10rpx;
}
.title {
  margin: 20rpx 0;
}
.bottom-op {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom-balance {
  margin: 40rpx 0;
}
.bottom-balance image {
  width: 100rpx;
  height: 100rpx;
}
.bottom-op image {
  width: 200rpx;
  height: 200rpx;
}
.bottom-balance {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom-balance-price {
  background-color: #85c495;
  text-align: center;
  padding: 30rpx;
  color: #f4fcf8;
}
.uni-input image {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
}
.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  color: #666;
}
.list-left image {
  width: 70rpx;
  height: 70rpx;
  margin-right: 10rpx;
}
.list-left {
  display: flex;
  align-items: center;
}
</style>