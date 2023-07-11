#Fetch
##  Fetch API
`fetch(url, optionObj)`

- ### :one: 基本概念
  fetch() 的功能与 XMLHttpRequest 基本相同，但有三个主要的差异
  - fetch() 使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
  - fetch() 采用模块化设计，API 分散在多个对象上（ Response 对象、 Request 对象、 Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
  - fetch() 通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。 XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。
- ### :two:用法
  在用法上， fetch() 接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 `Promise 对象。它的基本用法如下:arrow_down:
  ```js
    fetch('https://api.github.com/users/ruanyf')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('Request Failed', err)); 
  ```
  >上面示例中， fetch() 接收到的 response 是一个 Stream 对象， response.json() 是一个异步操作，取出所有内容，并将其转为 JSON 对象。
  >Promise 可以用 await 改写，从而有更加清晰的语义。  :arrow_down:
  ```js
    async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try {
    let response = await fetch(url);
    return await response.json();
    //await语句必须放在try...catch里面，这样才能捕捉异步操作中可能发生的错误。
  } catch (error) {
    console.log('Request Failed', error);
  }
    }
  ```

- ### :three: Fetch 配置对象
```js
const response = fetch(url, {
  method: "GET", // HTTP 请求的方法
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  }, // HTTP 请求的标头
  body: undefined, // POST 请求的数据体
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors", 
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```
- cache : 用于指定如何处理缓存。
    >-default：默认值，先在缓存里面寻找匹配的请求。
    >no-store：直接请求远程服务器，并且不更新缓存。
    >reload：直接请求远程服务器，并且更新缓存。
    >no-cache：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
    >force-cache：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
    >only-if-cached：只检查缓存，如果缓存里面不存在，将返回504错误。
-  mode : 用于指定请求的模式
    >cors：默认值，允许跨域请求。
    >same-origin：只允许同源请求。
    >no-cors：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。
- credential : 用于指定是否发送Cookie。
- keepalive : 用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。
- redirect : 用于指定 HTTP 跳转的处理方法。
    >follow：默认值，fetch()跟随 HTTP 跳转。
    >error：如果发生跳转，fetch()就报错。
    >manual：fetch()不跟随 HTTP 跳转，但是response.url属性会指向新的 URL，response.redirected属性会变为true，由开发者自己决定后续如何处理跳转。
- referrer : 用于设定 fetch() 请求的 referer 标头。
    >这个属性可以为任意字符串，也可以设为空字符串（即不发送referer标头）。
- referrerPolicy : 用于设定 referrer 标头的规则。
    >no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
    >no-referrer：不发送Referer标头。
    >**origin：Referer**标头只包含域名，不包含完整的路径。
    >**origin-when-cross-origin：同源请求Referer**标头包含完整的路径，跨域请求只包含域名。
    >same-origin：跨域请求不发送Referer****，同源请求发送。
    >strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。
    >strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
    >unsafe-url：不管什么情况，总是发送Referer标头。
-   signal： 指定一个 AbortSignal 实例，用于取消 fetch() 请求。

    >fetch() 请求发送以后，如果中途想要取消，需要使用 AbortController 对象。配置对象的 signal 属性必须指定接收 AbortController 实例发送的信号 controller.signal 。 controller.abort() 方法用于发出取消信号。这时会触发 abort 事件，这个事件可以监听，也可以通过 controller.signal.aborted 属性判断取消信号是否已经发出。
    ```js
    let controller = new AbortController();
    let signal = controller.signal;

    fetch(url, {
    signal: controller.signal
    });

    signal.addEventListener('abort',
    () => console.log('abort!')
    );

    controller.abort(); // 取消

    console.log(signal.aborted); // true
    ```

- ### :four: Response对象
    #### 1. Response对象属性
    - Response.headers : Response 所关联的 Headers 对象。
        >你可以通过 Request.headers 和Response.headers 属性检索一个Headers对象, 并使用 Headers.Headers() 构造函数创建一个新的Headers 对象。Headers 对象可以使用for...of循环进行遍历。
        ```js
        const response = await fetch(url);

        for (let [key, value] of response.headers) { 
        console.log(`${key} : ${value}`);  
        }

        // 或者
        for (let [key, value] of response.headers.entries()) { 
        console.log(`${key} : ${value}`);  
        }
        ```
    - Headers.append() : 给现有的header添加一个值, 或者添加一个未存在的header并赋值.
    - Headers.delete() : 从Headers对象中删除指定header。
    - Headers.entries()\Headers.keys()\Headers.values() : 以 迭代器 的形式返回Headers对象中所有的键值对 \ header 名 \ header 值。
    - Headers.get : 以 ByteString 的形式从Headers对象中返回指定header的全部值。
    - Headers.has : 以布尔值的形式从Headers对象中返回是否存在指定的header。
    - Headers.set : 替换现有的header的值, 或者添加一个未存在的header并赋值。Headers.set() 将会用新的值覆盖已存在的值, 但是 Headers.append() 会将新的值添加到已存在的值的队列末尾。
        ```js
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'text/xml');
            myHeaders.get('Content-Type');
            // should return 'text/xml'
        ```
    - Response.ok : 包含了一个布尔值，标示该 Response 成功（HTTP 状态码的范围在 200-299），网址跳转（3XX）的状态码会被自动转成200。
    - Response.status : 包含 Response 的状态码 （例如 200 表示成功）。
    - Response.statusText : 包含了与该 Response 状态码一致的状态信息（例如，OK对应 200）。
    - Response.redirected : 表示该 Response 是否来自一个重定向，如果是的话，它的 URL 列表将会有多个条
    - Response.url : 包含 Response 的URL。
    - Response.type : 包含 Response 的类型（例如，basic、cors）。
        >basic：普通请求，即同源请求。
        >cors：跨域请求。
        >error：网络错误，主要用于 Service Worker。> opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似表单的那种跨域请求。
        >opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值，详见请求部分。
    - Response.body : 一个简单的 getter，用于暴露一个 ReadableStream 类型的 body 内容。
    - Response.bodyUsed : 包含了一个布尔值来标示该 Response 是否读取过 Body。 
        >注意： fetch() 发出请求后，只有网络错误或者无法链接时，才会报错。其他情况都不会报错，而是认为请求成功。 也就是说，即使服务器返回的状态码是 4xx 或 5xx， fetch() 也不会报错（即 Promise 不会变为 rejected 状态）。只有通过 Response.status 属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功
        ```js
        async function fetchText() {
        let response = await fetch('/readme.txt');
        if (response.status >= 200 && response.status < 300) {
            return await response.text();
        } else {
            throw new Error(response.statusText);
        }
        }```

    #### 2. 对象的方法
    - 数据读取方法
        - 异步方法
          - response.text()：得到文本字符串。
          - response.json()：得到 JSON 对象。
          - response.blob()：得到二进制 Blob 对象。
            ```js
                const response = await fetch('flower.jpg');
                const myBlob = await response.blob();
                const objectURL = URL.createObjectURL(myBlob);
                const myImage = document.querySelector('img');
                myImage.src = objectURL
            ```
            - response.formData()：得到 FormData 表单对象。
            - response.arrayBuffer()：得到二进制 ArrayBuffer 对象，主要用于获取流媒体文件。
                ```js
                const audioCtx = new window.AudioContext();
                const source = audioCtx.createBufferSource();
                const response = await fetch('song.ogg');
                const buffer = await response.arrayBuffer();
                const decodeData = await audioCtx.decodeAudioData(buffer);
                source.buffer = buffer;
                source.connect(audioCtx.destination);
                source.loop = true;
                ``` 
        - 其他方法
          - Response.clone() : 创建一个 Response 对象的克隆。
          - Response.error() : 返回一个绑定了网络错误的新的 Response 对象。
          - Response.redirect : 用另一个 URL 创建一个新的 Response。

