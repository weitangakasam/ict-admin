配合 nginx 启动的问题
如果我们将项目 build 后放到了 nginx 目录下面之后,
那么直接放入之后,会报请求 chunk.js404 的问题,
那么其中的原因是因为没有加入 publicPath 的问题,因为
如果 build 中的 html 直接请求 localhost:8001/js/...,
那么这个路径是不对的,这是一个绝对路径,因为我们的项目是放在 vlan 的 alias 路径下的
所以必须通过在 vue.confi.js 中加入 publicPath:"/vlan"这个偏移量才行.

路由模块分为静态和异步的,异步的要登录之后去请求来的.路由守卫的逻辑是先看登录了没有,没有
就看是否为白名单,然后如果是的话,那么就直接过去,不是就去登录

app 底下放着 router-view,路由的根路径是主页面,里面放着标签,点击进入单网元.

路由的的单网元是一个/single,里面的话左边是一个侧边栏菜单.右边是一个 my-view 组件
然后我们需要遍历 single 这个路由的 children 来遍历里面的信息.来生成左侧的 el-menu 菜单栏,
然后 children 的结构最多只有两层.每一层都需要有一个标题.如果它有 chilren(不管有一个还是两个),那么就不需要有
component,就是一个 el-submenu,如果它没有 children 了,那么就是一个 el-menu-item.然后所以
通过 sidebaritem 的循环组件来渲染.需要传入 currentPath 给这个自定义组件.让它点击时候通过
\$router.push(path.resolve(currentPath,route.path)) 来改变 url.

axios.intercepotrs.response.use((response)=>{
  let code = response.data.code;
  if(code === -2){
  //token 过期了,无感知去刷新 token.
  }

},err=>{
  //没 token 直接 401,直接去首页
  //有 token 返回 500,reject.
})
