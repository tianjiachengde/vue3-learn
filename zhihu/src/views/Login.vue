<template>
  <nav-back title="登录/注册" />
  <van-form ref="formBox">
    <van-cell-group inset>
      <van-field
        center
        label="手机号"
        label-width="50px"
        name="phone"
        v-model="ruleForm.phone"
        :rules="[
          { required: true, message: '手机号为必填项哦~' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '手机号格式不对哦~',
          },
        ]"
      >
        <template #button>
          <van-button class="form-btn" size="small" type="primary">
            发送验证码
          </van-button>
        </template>
      </van-field>

      <van-field
        label="验证码"
        label-width="50px"
        v-model="ruleForm.code"
        :rules="[
          { required: true, message: '验证码为必填项哦~' },
          { pattern: /^\d{6}$/, message: '验证码必须是6位数字哦~' },
        ]"
      />
    </van-cell-group>

    <div style="margin: 20px 40px">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        loading-text="小主,奴家正努力处理中..."
      >
        立即登录/注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import NavBack from "@/components/NavBack.vue";
import { reactive, toRefs } from "vue";

export default {
  name: "Login",
  components: { NavBack },
  setup() {
    let state = reactive({
      ruleForm: {
        phone: "",
        code: "",
      },
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.van-form {
  margin-top: 30px;

  .form-btn {
    width: 78px;
  }
}
</style>