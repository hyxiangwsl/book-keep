import Vue from 'vue'
import App from './App.vue'
// import keyboard from "./components/PFUNI-Keyboard/Keyboard.vue";
// Vue.component('keyboard', keyboard);//全局键盘组件

import Bmob from "hydrogen-js-sdk";

// 初始化 SDK版本 2.0.0 以下保留之前的初始化方法
Bmob.initialize("6427311be2330018", "235066");

// 挂载到全局使用
Vue.prototype.Bmob = Bmob

// 项目其他页面使用跟小程序一样使用Bmob对象即可，例如：
// Bmob.User.login('test','123456').then(res => {
//    console.log(res)
//  }).catch(err => {
//   console.log(err)
// });

Vue.config.productionTip = false

new App().$mount()
