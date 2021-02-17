<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <sidebarItem
            v-for="(route, index) in routes"
            :key="index"
            :route="route"
            basepath="/single"
          ></sidebarItem>
        </el-menu>
      </el-col>
      <el-col :span="19">
        <my-view></my-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../store";
import sidebarItem from "./sidebarItem";
import view from "../views/view.vue";
export default {
  components: {
    sidebarItem,
    myView: view,
  },
  data() {
    return {};
  },
  computed: {
    routes() {
      let route = store.getters.asyncRoutes.filter((route) => {
        return route.path === "/single";
      });
      console.log(route);
      return route[0].children;
    },
  },
  created() {
    console.log(this.routes);
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row :last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
>>> .el-menu-item.is-active > a {
  color: red;
}
</style>