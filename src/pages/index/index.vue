<template>
  <view class="content">
    <view class="navi">
      <view class="nav-picker">
        <picker
          mode="date"
          :value="date"
          :start="startDate"
          :end="endDate"
          @change="bindDateChange"
        >
          <view class="uni-input">
            <image src="../../static/icon/select.png"></image>
            {{ date }}</view
          >
        </picker>
      </view>
      <image class="nav-setting" src="../../static/icon/setting.png"></image>
    </view>
    <view class="content-main">
      <view class="total"
        ><view class="font-main title">{{ date }}</view>
        <view class="font-main title">收入:{{ addAll }} 支取:{{ cutAll }}</view>
      </view>
      <view class="mainView">
        <view class="list" v-for="(i, idx) in dataList" :key="idx">
          <view class="list-left">
            <image v-if="i.type == '1'" src="../../static/icon/add.png"></image>
            <image v-if="i.type == '0'" src="../../static/icon/cut.png"></image>
            <text class="font-main">{{ i.desc }}</text>
          </view>
          <view class="list-right">
            <text class="font-main" v-if="i.type == '0'">￥{{ i.count }}</text>
            <text style="color: #d81e06" v-if="i.type == '1'"
              >-￥{{ i.count }}</text
            >
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="bottom-balance">
        <image src="../../static/icon/hang.png"></image>
        <text class="bottom-balance-price">余额:￥{{ balance }}</text>
        <image src="../../static/icon/hang.png"></image>
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

<script>
import Bmob from "hydrogen-js-sdk";
import Vue from "vue";

export default Vue.extend({
  data() {
    const currentDate = this.getDate({
      format: true,
    });
    return {
      time: "2021年1月",
      index: 0,
      balance: 0,
      dataList: [],
      addAll: 0,
      cutAll: 0,
      date: currentDate,
      userId: "", //用户id
    };
  },
  onLoad(option) {
    this.userId = option.userId;
    console.log(option.userId, "id");
  },
  onShow() {
    this.getDataList();
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
  },
  methods: {
    bindDateChange: function (e) {
      this.date = e.target.value;
      this.getDataList();
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    toCut() {
      uni.navigateTo({ url: "/pages/cut/index?" + `userId=${this.userId}` });
    },
    toAdd() {
      uni.navigateTo({ url: "/pages/add/index?" + `userId=${this.userId}` });
    },
    //获取账单操作
    getDataList() {
      const query = Bmob.Query("income-expend");
      //时间查询
      query.equalTo("date", "==", this.date);
      query.equalTo("user_id", "==", this.userId);
      query.find().then((res) => {
        // console.log(res);
        this.dataList = res;
      });

      query.statTo("sum", "count");
      query.statTo("groupby", "type");
      query.statTo("order", "-createdAt");
      query.find().then((res) => {
        if (res.length == 0) {
          this.addAll = 0;
          this.cutAll = 0;
        }
        res.forEach((e) => {
          if (e.type == "0") {
            this.addAll = e._sumCount;
          }
          if (e.type == "1") {
            this.cutAll = e._sumCount;
          }
        });
      });
      this.getBalance();
    },
    getBalance(){
      let addAll = 0;
      let cutAll = 0;
      const query = Bmob.Query("income-expend");
      query.equalTo("user_id", "==", this.userId);
      query.statTo("sum", "count");
      query.statTo("groupby", "type");
      query.statTo("order", "-createdAt");
      query.find().then((res) => {
        res.forEach((e) => {
          if (e.type == "0") {
            addAll = e._sumCount;
          }
          if (e.type == "1") {
            cutAll = e._sumCount;
          }
        });
        this.balance = Number(addAll - cutAll).toFixed(2);
      });
    }
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
  overflow: auto;
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