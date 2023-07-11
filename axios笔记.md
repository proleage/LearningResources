# Axios笔记
# 前置内容
>1.Promise 和 AJAX
>2.辅助工具：json-server
npm install -g json-server
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

# 2 Axios源码分析
# 3 仿写Axios