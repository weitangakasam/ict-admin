<script>
export default {
  props: {
    name: {
      type: String,
      default: "default",
    },
  },
  render(h) {
    //这里的话这么写是因为我们的路由嵌套,如果是从根(bar)组件下来,
    //中间它的children才是我们真正要展示的sidebar的内容,
    //然后由于我们的children里面的各个child有两种情况,有一个嵌套,和没有嵌套,
    //如果我们不使用我们自己的一个my-view的话,那么我们需要先路由到一个/a底下,然后在里头写router-view这是不现实的
    const name = this.name;
    const route = this.$parent.$route;
    const depth = route.matched.length - 1;
    const matched = route.matched[depth];
    const component = matched && matched.components[name];
    console.log(route.matched, component);
    return h(component);
  },
};
</script>
<style>
</style>