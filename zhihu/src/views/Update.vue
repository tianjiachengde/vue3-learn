<template>
  <nav-back />
  <div class="form-box">
    <van-cell-group inset>
      <van-field label="用户名" label-width="60px" />
      <van-field label="用户头像" label-width="60px">
        <template #input>
          <van-uploader max-count="1" />
        </template>
      </van-field>
    </van-cell-group>

    <div style="margin: 20px 40px">
      <van-button
        :loading="true"
        :disabled="true"
        loading-text="处理中..."
        round
        block
        type="primary"
      >
        修改信息
      </van-button>
    </div>
  </div>
</template>

<script>
import NavBack from "@/components/NavBack.vue";

export default {
  name: "Update",
  components: { NavBack },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.form-box {
  margin-top: 30px;
}
</style>