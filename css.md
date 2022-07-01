### 盒模型
标准盒模型和怪异盒模型，标准盒模型width不包括 padding border，怪异盒模型width包含 padding border
通过 box-sizing: border-box 设置怪异盒模型  box-sizing: content-box

### 水平垂直居中

父元素设置display: flex, 子元素 justify-content: center  algin-item: center
父元素position: relative, 子元素 position: absolute top: 50% left: 50% 
(margin-top: -height/2 margin-left: -width/2)  
(transform  translate(-50%, -50%))
line-height: height  text-align:center

### BFC

块级格式化上下文，独立的容器，容器中的元素不影响外面元素
块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
常见的BFC 两个盒子上下边距重合 浮动元素撑起容器高度

https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

https://segmentfault.com/a/1190000041460645

### 