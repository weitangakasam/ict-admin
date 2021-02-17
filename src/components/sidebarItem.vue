<template>
  <div>
    <el-menu-item v-if="single" :index="currentPath">
      <template slot="title">
        <div @click="transition(currentPath)">{{ route.meta.title }}</div>
      </template>
    </el-menu-item>
    <el-submenu v-else :index="currentPath">
      <template slot="title" v-if="route.meta">
        <span>{{ route.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="(child, index) in route.children"
        :key="index"
        :route="child"
        :basepath="currentPath"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "sidebarItem",
  props: {
    basepath: {
      type: String,
    },
    route: {
      type: Object,
    },
  },
  computed: {
    currentPath() {
      let routepath = this.route.path;
      let res = path.resolve(this.basepath, routepath);
      return res;
    },
    single() {
      return !this.route.children || this.route.children.length === 0;
    },
  },
  methods: {
    transition(currentPath) {
      window.path = path;
      if (this.$route.path !== currentPath) {
        //防止报错重复路由
        this.$router.push(currentPath);
      }
    },
  },
};
</script>
<style>
</style>