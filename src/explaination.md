如果没有写:
style='color:red',那么就会变成通过staticStyles变成了静态的style,是在vnode的data里面
_c('div',{staticStyle:{"{color":"`red`}"}},[_v("aa")])

如果写了的话,就是_c('div',{style:({color:`red`})},[_v("aa")]

这是因为如果没有写:的话,el.attrs就会在processElement中调用getAndRemoveAttr("style")就能拿到style的属性
,然后转变为了staticStyle,然后在parseStyleText中通过parseStyleText变成了一个object,然后拼接起来

而如果写了的话,el.attrs里面放的就是:style,然后就拿不到style属性
所以就变成了{style:({color:`red`})}

在处理的时候通过getStyle会把二者extend起来,变成一个newStyle,然后把他们都elm.style.set起来

没加冒号
with(this){return _c('div',{attrs:{"id":"app"}},[_c('test',{attrs:{"a":"a"}})],1)}

加了冒号
with(this){return _c('div',{attrs:{"id":"app"}},[_c('test',{attrs:{"a":a}})],1)}
在parseHTML的过程中,有一个attrs是属性,是在processAttrs里面加入的,如果v-bind:|:正则没有匹配到,那么就把它
他JSON.stringyfy一下再把调用addAttrs.