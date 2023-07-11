# Axios笔记
# 前置内容
>1.Promise 和 AJAX
>2.辅助工具：json-server
安装： npm install -g json-server
启动： json-server --watch db.json
访问地址-本地 db.json
```json
db.json/
{
    "posts": [{
            "id": 1,
            "title": "json-server",
            "author": "typicode"
        },
    ],
    "comments": [{
            "id": 1,
            "body": "some comment",
            "postId": 1
        },
        {
            "body": "request Post Comments",
            "postId": 2,
            "id": 2
        }
    ],
    "profile": {
        "name": "typicode"
    }
}
```
>访问地址-
Home
    http://localhost:3000
Resourses:  
    http://localhost:3000/posts
    http://localhost:3000/comments
    http://localhost:3000/profile

>3. 安装
    npm install axios
    yarn add axios
    
    cdn

    <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>

    国内加速源
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script>   

# 1 Axios的理解和使用
## 1.1 Axios API 
- 函数式请求
    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script>
    </head>

    <body>
        <div class- "container">
            <h2 class="page-header">基本使用</h2>
            <button class="btn btn-primary">发送GET请求</button>
            <button class="btn btn-warning">发送POST请求</button>
            <button class="btn btn-success">发送PUT请求</button>
            <button class="btn btn-danger">发送DELETE请求</button>
        </div>
        <script>
            //获取按钮
            const btns = document.querySelectorAll('button')

            btns[0].onclick = function() {
                    //发送ajax请求
                    axios({
                        method: 'GET',
                        url: 'http://localhost:3000/posts/2'
                    }).then(response => {
                        console.log(response);
                    })
                }
                //添加数据
            btns[1].onclick = function() {
                    axios({
                        method: 'POST',
                        url: 'http://localhost:3000/posts',
                        data: {
                            title: "今天天气真不错",
                            author: "proleage"
                        }
                    }).then(response => {
                        console.log(response)
                    })
                }
                //更新数据
            btns[2].onclick = function() {
                axios({
                    method: 'PUT',
                    url: 'http://localhost:3000/posts/3',
                    data: {
                        title: "PUT更改后的数据",
                        author: "hotfix"
                    }
                }).then(response => {
                    console.log(response)
                })
            }

            btns[3].onclick = function() {
                axios({
                    method: 'DELETE',
                    url: 'http://localhost:3000/posts/4',

                }).then(response => {
                    console.log(response)
                })
            }
        </script>
    </body>

    </html>
    ```
- Axios request请求方法
    ```html
    <script>
         //获取按钮
        const btns = document.querySelectorAll('button')

        //发送GET请求
        btns[0].onclick = function() {
                axios.request({
                    method: 'GET',
                    url: 'http://localhost:3000/comments'
                }).then(response => {
                    console.log(response)
                })
            }
            //发送GET请求
        btns[1].onclick = function() {
            axios.post(
                'http://localhost:3000/comments', {
                    "body": "request Post Comments",
                    "postId": 2
                }
            ).then(res => {
                console.log(res)
            })
        }
      </script>
    ```
- 请求配置 Request Config
    ```js
    {
        //baseURL:'http://localhost:3000'，通常设置成域名

        baseURL: 'https://some-domain.com/api/',

        // url='/posts'  最终url = baseUrl+url
        url: '/user',

        // `method` 是创建请求时使用的方法
        method: 'get', // default

        

        // 对request的结果进行处理，处理后再发送给服务器
        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
        // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
        transformRequest: [function (data, headers) {
            // Do whatever you want to transform the data

            return data;
        }],

        // 对响应结果进行处理，可以通过自定义回调获取结果
        transformResponse: [function (data) {
            // Do whatever you want to transform the data

            return data;
        }],
          
        // `headers` 是即将被发送的自定义请求头
        headers: {'X-Requested-With': 'XMLHttpRequest'},

        // `params` 是即将与请求一起发送的 URL 参数
        // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
        params: {
            ID: 12345
        },


        // 常用的传参
        // axios({
        //     url:'/post',
        //     ///post?a=100&b=200
        //     //post/a/100/b/200
        //     //post/a.100/b.200
        //     params:{
        //         a:100,
        //         b:200
        //     }
        // })   
        
                |       |
                v       v

        // `paramsSerializer` 是一个负责 `params` 序列化的函数
        // 把请求对象转换成字符串,与服务器统一
        paramsSerializer: function(params) {
            return Qs.stringify(params, {arrayFormat: 'brackets'})
        },

        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream  

        data: {
            firstName: 'Fred'//请求体为json
        },
        // syntax alternative to send data into the body
        // method post
        // only the value is sent, not the key
        data: 'Country=Brasil&City=Belo Horizonte',//请求体为url参数传递形式

        // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)

        timeout: 1000,

        // `withCredentials` 表示跨域请求时是否需要使用凭证
        withCredentials: false, // default
        //true则在跨域请求时带着cookie

        // `adapter` 允许自定义处理请求，以使测试更轻松
        // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
        adapter: function (config) {
            /* ... */
        },

        // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
        // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers`
        // 设置的自定义 `Authorization`头
        auth: {
            username: 'janedoe',
            password: 's00pers3cret'
        },

        // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        responseType: 'json', // default

        // `responseEncoding` indicates encoding to use for decoding responses
        // Note: Ignored for `responseType` of 'stream' or client-side requests
        responseEncoding: 'utf8', // default

        // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
        xsrfCookieName: 'XSRF-TOKEN', // default

        // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
        xsrfHeaderName: 'X-XSRF-TOKEN', // default

        // `onUploadProgress` 允许为上传处理进度事件
        onUploadProgress: function (progressEvent) {
            // Do whatever you want with the native progress event
        },

        // `onDownloadProgress` 允许为下载处理进度事件
        onDownloadProgress: function (progressEvent) {
            // 对原生进度事件的处理
        },

        // `maxContentLength` 定义允许的响应内容的最大尺寸
        maxContentLength: 2000,//Byte

        // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
        maxBodyLength: 2000,//Byte

        // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 
        //或 reject  promise 。如果 `validateStatus` 返回 `true` 
        //(或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 
        //否则，promise 将被 reject
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default 
            //404 not found
        },

        // 最大重定向数目
        // 如果设置为0，将不会 follow 任何重定向
        maxRedirects: 5, // default

        //设定socket文件的位置，向docker的守护进程发送请求
        //数据转发
        //如何既设置socket，又设置proxy，优先选择socket
        socketPath: null, // default

        // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
        // `keepAlive` 是否保持连接，默认没有启用
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),

        // 'proxy' 定义代理服务器的主机名称和端口
        // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
        // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
        proxy: {
            host: '127.0.0.1',
            port: 9000,
            auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
            }
        },

        // `cancelToken` 指定用于取消请求的 cancel token
        // （查看后面的 Cancellation 这节了解更多）
        cancelToken: new CancelToken(function (cancel) {
        })
    ```

    -----------------------------------------
- 下面是采用config配置简化每次axios请求的代码片段作为样例
```html
    <<script>
        //获取按钮
        const btns = document.querySelectorAll('button')

        //------------------------------默认配置----------------------------
        axios.defaults.method = 'GET' //请求类型默认为GET
        axios.defaults.baseURL = 'http://localhost:3000' //设置基础URL
        axios.defaults.timeout = 3000 //超时3000ms
        //-----------------------------------------------------------------

        btns[0].onclick = function() {
            axios({
                url: '/posts'
            }).then(response => {
                console.log(response);
            })
        }
    </script>
```
## 1.2 Axios创建实例对象 
- 配置在每个实例对象内部生效，不像 axios.defaults.xxx ，对所有axios对象生效
    - 下面是一段实例Axios对象请求的样例，获取一段随机字符作为密码
        ```html
        <script>
            //获取按钮
            const btns = document.querySelectorAll('button')

            //创建实例对象，配置在每个实例对象内部生效，不像axios.default.<xxx>对所有axios对象生效
            const randomPwd = axios.create({
                baseURL: 'https://v.api.aa1.cn/api/api-mima/mima.php',
                params: {
                    msg: 10
                }
            })

            randomPwd({}).then(response => {
                console.log(response)
            })
        </script>
        ```
    - 如果在一段代码中有多个需要设置不同Axios请求对象时，则可以通过下面这样的代码完成
        ```html
        <script>
            //获取按钮
            const btns = document.querySelectorAll('button')

            //创建实例对象，配置在每个实例对象内部生效，不像axios.default.<xxx>对所有axios对象生效
            const randomPwd = axios.create({
                baseURL: 'https://v.api.aa1.cn/api/api-mima/mima.php',
                params: {
                    msg: 10
                }
            })

            randomPwd({}).then(response => {
                console.log(response)
            })

            //实时汇率换算
            const antherInstance = axios.create({
                baseURL: 'http://localhost:3000',
            })
            antherInstance({
                url: '/onebox/exchange/currency',
                params: {
                    from: 'CNY',
                    to: 'JPY',
                    version: 2,
                    key: '3d0ab2052881692482e2fe4bd1074153',
                }
            }).then(res => {
                console.log("CNY 1 = ", " JPY", res.data.result[0].result)
                console.log("JPY 1 = ", " CNY", res.data.result[1].result)
            })
        </script>
        ```
        ----------------------------------
        在这段代码中，遇到了由于浏览器同源策略导致的问题,报错如下
        ![报错](/upload/err_CORS.png "Magic Gardens")

        ![报错](https://github.com/proleage/LearningResources/blob/main/err_CORS.png?raw=true )
        **`同源策略`**
        > 它规定了一个网页的脚本在没有服务器的明确同意下，不能获取访问其它域名下的资源。如果你在尝试从一个源（origin）（比如 'http://127.0.0.1:5500'）访问另一个源（例如 'http://op.juhe.cn/onebox/exchange/currency'）的资源，浏览器会阻止这种行为，这就是你现在遇到的跨源资源共享（CORS）问题。
        
        解决方法有两种
         - 后端设置：如果你能控制http://op.juhe.cn服务器，你可以修改它的后端代码，使得它在响应头中包含 'Access-Control-Allow-Origin' 字段，并且这个字段的值可以是 '*'(表示接受任意域名的请求)，或者是 'http://127.0.0.1:5500'(表示只接受来自 'http://127.0.0.1:5500' 的请求)
         - 使用代理服务器：如果你不能修改后端服务器的代码，你可以考虑使用一个代理服务器。你可以创建一个服务器，这个服务器和你的网页在同一个源，然后由这个服务器转发你的请求，再将收到的响应返回给你的网页。如果你在使用Node.js，那么可以考虑使用 'http-proxy-middleware' 这个中间件来创建一个代理服务器。如果你在使用 create-react-app，那么可以使用它的内置代理功能。

        此处采用第二种方式 设置代理服务器的方法解决该问题：
        - 你需要安装 http-proxy-middleware
          `npm install http-proxy-middleware` 
        - 你需要创建一个 server.js 文件
            ```js
            //我们首先设置了 json-server，然后添加了代理配置。代理会拦截以 /onebox/exchange/currency 开头的请求，
            //并且将它们转发到 http://op.juhe.cn/onebox/exchange/currency。

            const jsonServer = require('json-server');
            const server = jsonServer.create();
            const path = require('path');
            const router = jsonServer.router(path.join(__dirname, 'db.json')); // 你的json文件路径
            const middlewares = jsonServer.defaults();

            server.use(middlewares);

            const { createProxyMiddleware } = require('http-proxy-middleware');

            // 代理设置
            server.use('/onebox/exchange/currency', createProxyMiddleware({ 
            target: 'http://op.juhe.cn', 
            changeOrigin: true,
            pathRewrite: {
                '^/onebox/exchange/currency': '/onebox/exchange/currency', // 重写请求路径
            },
            }));

            server.use(router);
            server.listen(3000, () => {
            console.log('JSON Server is running')
            });
            ```
            此处值得注意的是你的db.json文件所在的目录
            `const router = jsonServer.router(path.join(__dirname, 'db.json'));`
            


        - 在你的 axios 请求中，你的 baseURL 应该设为 http://localhost:3000，即你的 json-server 所在的地址
            ```js
            const antherInstance = axios.create({
            baseURL: 'http://localhost:3000',
            });
            ```
        - 运行 server.js文件，启动json-server
            `node server.js`
            >执行这条指令的时候，你可能会遇到
        报错：Error: Cannot find module 'json-server' 
        解决方法如下： 在你当前具有node_module文件夹的父目录下执行

            `npm install json-server`
        - 如果需要停止使用代理服务器并恢复到原始状态
            1. 注释或删除代理代码：在你的 server.js 文件中，注释或删除创建代理服务器的相关代码。即，下面这部分的代码。
                ```js
                    const { createProxyMiddleware } = require('http-proxy-middleware');
                    // 代理设置
                    server.use('/onebox/exchange/currency', createProxyMiddleware({ 
                    target: 'http://op.juhe.cn', 
                    changeOrigin: true,
                    pathRewrite: {
                        '^/onebox/exchange/currency': '/onebox/exchange/currency', // 重写请求路径
                    },
                    }));

                ````
            2. 在 axios 请求中，也需要将 baseURL 改回你原来的地址。
                ```js
                const antherInstance = axios.create({
                    baseURL: 'http://op.juhe.cn',
                });

                ```
            3. 你需要重启你的 json-server
                `json-server --watch db.json`
        ----------------------------------------------------
## 1.3 拦截器 Interceptors

  
# 2 Axios源码分析
# 3 仿写Axios