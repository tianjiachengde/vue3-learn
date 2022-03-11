<template>
  <header class="header-box">
    <div class="text">
      <div class="time">
        <span>{{time.day}}</span>
        <span>{{time.month}}</span>
      </div>
      <h2 class="title">知乎日报</h2>
    </div>

    <div class="picture">
      <router-link to="/person">
        <img src="../assets/images/timg.jpg" alt="" class="logo" />
      </router-link>
    </div>
  </header>
</template>

<script>
import {computed} from 'vue'
import {formatTime} from "@/assets/utils";

export default {
  name: "HomeHead",
  props:{
    today:{
      type:String,
      required:true
    }
  },
  setup(props){
    let time = computed(()=>{
      let today = props.today;
      let [month, day] = formatTime(today, '{1}-{2}').split('-');
      let arr = ['','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      return {
        month: arr[+month],
        day
      }
    })
    return {
      time
    }
  }
};
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

  .picture {
    box-sizing: border-box;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;

    a {
      display: block;
      height: 100%;

      .logo {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 34px;

    .title {
      padding-left: 20px;
      line-height: 68px;
      font-size: 44px;
      border-left: 1px solid #ddd;
      transform: scale(0.5);
      transform-origin: left;
    }

    .time {
      box-sizing: border-box;
      padding-right: 15px;

      span {
        display: block;
        line-height: 20px;
        font-size: 20px;
        text-align: center;

        &:nth-last-child(1) {
          line-height: 14px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>