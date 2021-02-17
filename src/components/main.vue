<!--  -->
<template>
  <div>
    <div>ICT</div>
    <div @click="toSingle">9000E</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toSingle() {
      this.$router.push({
        path: "/single",
        query: "id=123",
      });
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>