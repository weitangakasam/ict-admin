import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//模拟的数据
let children = [
  {
    path: "a",
    meta: {
      title: "layout1",
    },
    children: [
      {
        path: "a1",
        component: () => import("../views/a.vue"),
        meta: {
          title: "menu1",
          roles: ["admin", "user"],
        },
      },
      {
        path: "a2",
        component: () => import("../views/c.vue"),
        meta: {
          title: "menu2",
          roles: ["admin", "user"],
        },
      },
    ],
  },
  {
    path: "b",
    meta: {
      title: "layout2",
    },
    component: () => import("../views/b.vue"),
  },
];
let asyncRoutes = [
  {
    path: "/single",
    component: () => import("../components/single.vue"), //layout
    redirect: "/single/a",
    children,
  },
  {
    path: "/",
    component: () => import("../components/main.vue"),
    children,
  },
];
export default new Vuex.Store({
  state: {
    whiteList: ["/login", "/404"],
  },
  mutations: {
    setCharacter(state, char) {
      state.charactor = char;
    },
  },
  modules: {
    routes: {
      namespaced: true,
      state: {
        charactor: null,
        allRoutes: [
          {
            path: "/login",
            component: () => import("../views/login.vue"),
          },
        ],
        asyncRoutes: [],
      },
      mutations: {
        addRoutes(state, payload) {
          state.asyncRoutes = payload;
          state.allRoutes = state.allRoutes.concat(payload);
        },
      },
      actions: {
        //这部分代码可以放到后台去
        getAsyncRoutes({ commit }, char) {
          function filterAsync(routes, char) {
            return routes.filter((route) => {
              if (route.children) {
                route.children = filterAsync(route.children, char);
              }
              return route.meta && route.meta.roles
                ? route.meta.roles.includes(char)
                : true;
            });
          }
          return Promise.resolve(asyncRoutes).then((asyncRoutes) => {
            let res = filterAsync(asyncRoutes, char);
            console.log(res);
            commit("addRoutes", res);
            return res;
          });
        },
        getUserCharactor({ commit }) {
          return Promise.resolve("admin").then((value) => {
            commit("setCharacter", value, { root: true });
            return value;
          });
        },
      },
    },
  },
  getters: {
    allRoutes: (state) => state.routes.allRoutes,
    asyncRoutes: (state) => state.routes.asyncRoutes,
  },
});
