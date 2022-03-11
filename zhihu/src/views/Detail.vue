<template>
  <van-skeleton title :row="5"  v-if="!info"/>
  <div class="contentMy" v-html="info.body" v-else></div>
  <div class="nav-box">
    <van-icon name="arrow-left" @click="router.go(-1)"></van-icon>
    <van-icon name="comment-o" :badge="comments"></van-icon>
    <van-icon name="good-job-o" :badge="popularity"></van-icon>
    <van-icon name="star-o" color="#1989fa"></van-icon>
    <van-icon name="share-o" color="#ccc"></van-icon>
  </div>
</template>

<script>
import {nextTick, onBeforeMount, onBeforeUnmount, reactive, toRefs, ref} from "vue";
import {useRouter, useRoute} from 'vue-router'
import api from '@/api/index'

export default {
  name: "Detail",
  setup(){
    const router = useRouter(),
        route = useRoute()
    const id = route.params.id
    const state = reactive({
      info: null,
      comments: 0,
      popularity: 0
    })
    onBeforeMount(async ()=>{
      state.info = await api.queryNewsDetail(id)
      await nextTick(()=>{
        insertCss()
        insertImage()
      })
    })
    onBeforeMount(async ()=>{
      const {popularity, comments} = await api.queryNewsComments(id)
      state.comments = comments
      state.popularity = popularity
    })
    onBeforeUnmount(()=>{
      const link = document.getElementById('link')
      if(!link) return
      document.head.removeChild(link)
    })
    const insertCss = () =>  {
      const css = state.info?.css?.[0]
      if(!css) return
      const link = document.createElement('link')
      link.id = 'link'
      link.rel = 'stylesheet'
      link.href = css
      document.head.appendChild(link)
    }
    const insertImage = () => {
      const image = state.info?.image
      const imageBox = document.querySelector('.img-place-holder')
      if(!image || !imageBox) return
      const img = new Image()
      img.src = image
      imageBox.appendChild(img)
    }
    return {
      ...toRefs(state),
      router,
    }
  }
};
</script>

<style lang="less" scoped>
.contentMy {
  background: #fff;
  padding-bottom: 50px;
  margin: 0;

  /deep/ .img-place-holder {
    height: 375px;
    overflow: hidden;
    img {
      display: block;
      margin: 0;
      width: 100%;
      min-height: 100%;
    }
  }
}

.van-skeleton {
  padding: 30px 15px;
}

.nav-box {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
  height: 50px;
  background: #f4f4f4;

  .van-icon:nth-child(1) {
    position: relative;
    &::after {
      position: absolute;
      top: -10%;
      right: -15px;
      content: "";
      width: 1px;
      height: 120%;
      background: #d5d5d5;
    }
  }

  /deep/ .van-badge {
    background-color: transparent;
    border: none;
    color: #000;
    right: -5px;
  }
}
</style>