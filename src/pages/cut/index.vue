<template>
  <view class="container">
    <view class="pick-time">
      <image src="../../static/icon/日期.png"></image>
      <picker
        mode="date"
        :value="date"
        :start="startDate"
        :end="endDate"
        @change="bindDateChange"
      >
        <view class="uni-input font-main">{{ date }}</view>
      </picker>
    </view>
    <view class="input-price">
      <input
        class="uni-input"
        type="digit"
        placeholder-class="font-plc"
        focus
        v-model="form.count"
        placeholder="输入金额"
      />
    </view>
    <view class="input-desc">
      <input
        v-model="form.desc"
        class="uni-input"
        placeholder-class="font-plc2"
        placeholder="添加备注"
      />
    </view>
    <view class="submit">
      <button type="primary" :loading="loading" @click="submit">提交</button>
    </view>
  </view>
</template>
<script>
import Bmob from "hydrogen-js-sdk";
export default {
  data() {
    const currentDate = this.getDate({
      format: true,
    });
    return {
      date: currentDate,
      loading: false,
      userId:"",
      form: {
        //添加数据表单
        desc: "",
        count: "",
      },
    };
  },
  onLoad(option) {
    this.userId = option.userId;
    // console.log(option.userId, "id");
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
    submit() {
      // console.log(this.form, this.date);
      if (this.form.count == "") {
        uni.showToast({
          title: "金额不能为空",
          duration: 2000,
          icon: "none",
        });
        return;
      }
      const query = Bmob.Query("income-expend");
      query.set("user_id", this.userId);
      query.set("type", 1);
      query.set("desc", this.form.desc);
      query.set("count", Number(this.form.count));
      query.set("date", this.date);
      query
        .save()
        .then((res) => {
          uni.navigateTo({ url: "/pages/index/index?"+`userId=${this.userId}` });
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
}
.pick-time {
  display: flex;
  margin: 50rpx;
  /* color: #798079; */
}
.pick-time image {
  width: 55rpx;
  height: 55rpx;
}
.input-price {
  width: 80%;
  background-color: #8cc59a;
  margin: 0 40rpx;
}
.input-price input {
  padding: 50rpx 0;
}
.input-desc {
  width: 80%;
  height: 40rpx;
}
.input-desc input {
  padding-top: 50rpx;
  border-bottom: 1rpx solid #8cc59a;
}
.submit {
  width: 80%;
  margin-top: 150rpx;
}
.submit button {
  background-color: #8cc59a;
}
</style>