<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="handle"
  />
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "NavBack",
  props: {
    title: {
      type: String,
      default: "个人中心",
    },
  },
  setup() {
    const router = useRouter();

    const handle = () => {
      router.go(-1);
    };

    return {
      handle,
    };
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-icon,
/deep/ .van-nav-bar__text {
  color: #000;
}
</style>