#Ajax & Axios & Fetch
## 1. Ajax
- AJAX 全称(Async Javascript and XML) 即异步的 JavaScript 和 XML ，它是一种使用 JavaScript 在无需重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术。通过 `XMLHttpRequest` 对象来实现，可以用于发送 GET 和 POST 请求。Ajax 不直接返回 Promise，需要使用回调函数来处理结果。然后⽤ JavaScript 来操作 DOM ⽽更新⻚⾯
### *如何使用XMLHttprequest：*
>1.需要对核心对象进行实例化 var 变量 =new XMLHttprequest() 
>2.建立连接 ： 变量.open(请求方式，请求路径，同步/异步) 
>3.发送请求 ： 变量.send(请求的参数) 
>4.变量.onreadystatechange=function(){}
## 2. Fetch
是AJAX的替代品，使用了ES6中的promise对象。Fetch是基于promise设计的，因此它直接返回 Promise 对象。但是，一定记住`fetch不是ajax的进一步封装`，而是`原生JavaScript API`，没有使用XMLHttpRequest对象。Fetch 对于错误的处理方式与 Ajax 和 Axios 不同。即使 HTTP 响应返回的状态是 404 或 500，只要请求已经完成，Fetch Promise 就会解析为 "ok"，而不是 "reject"。 fetch的优势主要优势就是：
- 语法简洁，更加语义化。
- 同构方便
- 更加底层，提供的API丰富（request, response）
- 脱离了XHR，是ES规范里新的实现方式

>请注意，fetch 规范与 ajax主要有三种方式的不同： 
>1）fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。 
>2）fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: ‘include’})。
>3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费。 
>4）fetch没有办法原生监测请求的进度，而XHR可以。

## 3. Axios
axios 是一个基于 Promise 的 http请求库，可以用在浏览器和 node.js 中使用，Axios 提供了许多实用的功能，例如拦截请求和响应、取消请求、转换 JSON 数据、客户端防御 XSRF 等。它还提供了用于处理 Promise 的方法，使你能够更容易地配置和处理 HTTP 请求。另外，Axios 的错误处理方式比 Fetch 更直观，如果 HTTP 响应的状态码表示错误（如 404 或 500），Axios Promise 会被 reject。本质上是对原生`XMLHttpRequest`的封装，只不过它是Promise 的实现版本，符合最新的ES规则。

>axios有如下特性： 
>1.从浏览器中创建 XMLHttpRequests 
>2.从 node.js 创建 http 请求 
>3.支持 Promise API 
>4.拦截请求和响应 
>5.转换请求数据和响应数据 
>6.取消请求 
>7.自动转换 JSON 数据 
>8.客户端支持防御 XSRF

## 总结
三者都是用于网络请求的，但是不同纬度。
* Ajax：一种技术统称，并不是一个API。

* Fetch：一个浏览器的原生API，和 XMLHttpRequest 是一个级别，但是语法更加简洁、易用，支持 Promise。

* Axios：一个最常用的第三方网络请求库。
  
| 网络请求 | 特点 |
| :----: | :----: |
| Ajax | 一种技术统称，主要利用XHR实现网络请求 |
| Fetch | 具体API，基于promise，实现网络请求 |
| Axios | 一个封装库，基于XHR封装，较为推荐使用 |