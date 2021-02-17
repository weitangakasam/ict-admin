<template>
  <div>
    <iframe
      src="../../vlan/"
      frameborder="0"
      width="100%"
      ref="iframe"
    ></iframe>
  </div>
</template>

<script>
export default {
  computed: {
    height() {
      return window.innerHeight + "px";
    },
  },
  mounted() {
    console.log(this.height);
    this.$refs.iframe.style.height = this.height;
  },
};
</script>
<style>
</style>