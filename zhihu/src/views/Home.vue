<template>
  <!-- 头部区域 -->
  <home-head :today="today" />

  <!-- 轮播图 -->
  <section class="banner-box">
    <van-swipe :autoplay="3000" lazy-render v-if="banner.length">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img
            :src="item.image"
            alt=""
            class="pic"
          />
          <div class="desc">
            <h3 c="title">{{item.title}}</h3>
            <p class="author">{{item.hint}}</p>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>

  <!-- 新闻列表 -->
  <van-skeleton title :row="5" v-if="list.length===0"></van-skeleton>
  <template v-else>
    <section class="news-box" v-for="(item,index) in list" :key="item.date">
      <van-divider content-position="left" v-if="index!==0">{{formatTime(item.date, '{1}月{2}日')}}</van-divider>
      <div class="content">
        <news-item v-for="newsItem in item.stories" :key="newsItem.id" :data="newsItem"/>
      </div>
    </section>
  </template>

  <div class="lazy-more" ref="loadBox" v-show="list.length > 0">
    <van-loading size="12px">小主，精彩数据准备中...</van-loading>
  </div>
</template>

<script>
import HomeHead from "@/components/HomeHead.vue";
import NewsItem from "@/components/NewsItem.vue";
import {reactive, toRefs, onBeforeMount, ref, onMounted, onBeforeUnmount} from "vue";
import { formatTime } from "@/assets/utils";
import api from '@/api'

export default {
  name: "Home",
  components: {
    HomeHead,
    NewsItem,
  },
  setup(){
    let state = reactive({
      today: formatTime(true, '{0}{1}{2}'),
      banner:[],
      list:[]
    })
    let loadBox = new ref(null)
    onBeforeMount(async () => {
      let {date, stories, top_stories} = await api.queryNewsLatest()
      state.today = date;
      state.banner = Object.freeze(top_stories);
      state.list.push(Object.freeze({
        date,
        stories
      }))
    })
    let ob = null
    onMounted(()=>{
      console.log(loadBox,'loadBox');
      ob = new IntersectionObserver(async(entries)=>{
        if(entries[0].isIntersecting){
          console.log(state.list, state.list[state.list.length -1]);

          const time = state.list[state.list.length -1]['date']
          const { date, stories } = await api.queryNewsBefore(time)
          state.list.push(Object.freeze({
            date, stories
          }))
        }
        console.log(entries,'哈哈哈');
      })
      ob.observe(loadBox.value)
    })

    onBeforeUnmount(()=>{
      ob.unobserve(loadBox.value)
      ob = null
    })

    return {
      ...toRefs(state),
      loadBox,
      formatTime
    }
  },
};
</script>

<style lang="less" scoped>
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background: #eee;
  overflow: hidden;

  .van-swipe {
    height: 100%;

    a {
      display: block;
      height: 100%;
    }

    .pic {
      display: block;
      width: 100%;
      height: 100%;
    }

    .desc {
      position: absolute;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      padding: 20px;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      background: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      );

      .title {
        line-height: 25px;
        font-size: 20px;
        color: #fff;
      }

      .author {
        line-height: 30px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  /deep/.van-swipe__indicators {
    left: auto;
    right: 20px;
    transform: none;

    .van-swipe__indicator--active {
      background-color: #fff;
      width: 18px;
      border-radius: 3px;
    }
  }
}

.news-box {
  padding: 0 15px;

  .van-divider {
    margin: 5px 0;
    font-size: 12px;

    &:before {
      display: none;
    }
  }
}

.van-skeleton {
  padding: 30px 15px;
}

.lazy-more {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  height: 50px;
  background: #f4f4f4;
}
</style>