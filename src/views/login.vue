<!--  -->
<template>
  <div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>
      <el-form-item prop="username">
        <el-col :span="5">
          <el-input
            width="100px"
            size="medium"
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="password">
        <el-col :span="5">
          <el-input
            width="100px"
            size="medium"
            ref="password"
            v-model="loginForm.password"
            type="password"
            placeholder="Password"
            name="password"
            @keyup.enter.native="handleLogin"
          />
        </el-col>
      </el-form-item>
      <el-col :span="2">
        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {},
      sessionStorage,
    };
  },
  computed: {
    otherQuery() {
      let res = {};
      for (let key in this.$route.query) {
        if (key != "redirect") {
          res[key] = this.$route.query[key];
        }
      }
      return res;
    },
  },
  mounted() {
    this.sessionStorage = window.sessionStorage;
    window.sessionStorage = null;
  },
  methods: {
    handleLogin() {
      this.sessionStorage.setItem("token", "123");
      this.$router.push({
        path: this.$route.query.redirect || "/",
        query: this.otherQuery,
      });
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
