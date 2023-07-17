# DOM 概述
> - 文档对象模型（DOM）是一个网络文档的编程接口。它代表页面，以便程序可以改变文档的结构、风格和内容。
> - DOM 不是一种编程语言,不是 JavaScript 语言的一部分，而是用于建立网站的 Web API。
> - 例如，DOM 中指定下面代码中的 `querySelectorAll`方法必须要返回文档中所有 `<p>`元素组成的列表：
```js 
const paragraphs = document.querySelectorAll("p");
// paragraphs[0] 是第一个 <p> 元素
// paragraphs[1] 是第二个 <p> 元素，依此类推
alert(paragraphs[0].nodeName);
```
> - DOM 被设计成与特定编程语言相独立，使文档的结构化表述可以通过单一，一致的 API 获得
> - 在使用 DOM 时，不需要做任何其他特殊的操作。你可以在脚本中直接使用 JavaScript 的 API，这是一个由浏览器运行的程序。:arrow_down:
```html
    <script>
        // 当文档加载时，运行这段函数
        window.onload = () => {
            // 在空 HTML 页面中创建一系列元素
            const heading = document.createElement("h1");
            const headingText = document.createTextNode("Big Head!");
            heading.appendChild(headingText);
            document.body.appendChild(heading);
        }
    </script>
```
![](../createElement.png)

## 1. 基本数据类型
  | 数据类型（接口） | 描述 |
  | ---- | :---- |
  | Document | 当一个成员返回 `document` 对象（例如，元素的 `ownerDocument` 属性返回它所属的 `document`），这个对象就是 `root document` 对象本身。 |
  | Node | 每个对象都是某种类型的节点。在一个 HTML 文档中，一个对象可以是一个元素节点，也可以是一个文本节点或属性节点。 |
  | Element | `element` 类型是基于 `node` 的。它指的是一个元素或一个由 DOM API 的成员返回的`element` 类型的节点。例如，我们说`createElement()`方法返回刚刚在 `DOM` 中创建的 `element`。`element 对象`实现了 DOM 的 Element 接口和`更基本的 Node 接口`。在 HTML 文档中，元素通过 HTML DOM API 的 HTMLElement 接口以及其他描述特定种类元素能力的接口（例如用于 &#60;table&#62; 元素的 HTMLTableElement 接口）进一步强化。 |
  | NodeList | nodeList 是由元素组成的数组，如同 `document.querySelectorAll()` 等方法返回的类型。nodeList 中的条目通过索引有两种方式进行访问： <li>list.item(1) ,  <li>list[1]<br> &nbsp;两种方式是等价的，第一种方式中 `item()` 是 `nodeList `对象中的单独方法。后面的方式则使用了经典的数组语法来获取列表中的第二个条目。|
  | Attr | 当 attribute 通过成员函数（例如通过 createAttribute() 方法）返回时，它是一个为属性暴露出专门接口的对象引用。DOM 中的属性也是节点，就像元素一样，只不过你可能会很少使用它。 |
  | NamedNodeMap | `namedNodeMap` 和数组类似，但是条目是由名称或索引访问的，虽然后一种方式仅仅是为了枚举方便，因为在 `list `中本来就没有特定的顺序。出于这个目的， namedNodeMap 有一个 item() 方法，你也可以从 namedNodeMap 添加或移除条目。 |
  
  >还有一些常见的术语需要记住。例如，通常把任何 Attr 节点称为 **attribute**，把 DOM 节点组成的数组称为 **nodeList**。

----------------------------
## 2. DOM接口
- 接口及对象

    > - 许多对象实现了几个不同的接口。例如，table 对象，一方面实现了一个专门的 `HTMLTableElement` 接口，其中包括诸如 **createCaption** 和 **insertRow** 等方法。另一方面它也是一个 **HTML** 元素，所以 table 实现了 `DOM Element` 。
    > - 就 DOM 而言，HTML 元素也是构成 HTML 或 XML 页面对象模型的节点树中的一个节点，所以表格对象也实现了更基本的 Node 接口，Element 就是从这个接口衍生出来的。

