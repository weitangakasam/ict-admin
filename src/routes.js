import store from "./store";

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

let routes = store.getters.allRoutes;

console.log(routes);
let router = new Router({
  routes,
});

//让用户无法手动写入sessionStorage
window.addEventListener("storage", function() {
  sessionStorage.clear();
});

router.beforeEach(async (to, from, next) => {
  if (sessionStorage.getItem("token")) {
    console.log(store.state.charactor);
    try {
      if (!store.state.charactor) {
        //去查用户的角色
        let char = await store.dispatch("routes/getUserCharactor");
        let asyncRoutes = await store.dispatch("routes/getAsyncRoutes", char);
        router.addRoutes(asyncRoutes);
        next({
          path: to.path,
          query: to.query,
        });
      } else {
        next();
      }
    } catch (e) {
      next({
        path: "/login",
        query: {
          redirect: to.path,
          ...from.query,
        },
      });
    }
  } else {
    if (store.state.whiteList.includes(to.path)) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.path,
          ...from.query,
        },
      });
    }
  }
});

export default router;
