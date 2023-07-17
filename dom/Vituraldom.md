# 虚拟dom
## 1.概念
- 本质上是 JavaScript 对象，是真实 DOM 的描述，用一个 JS 对象来描述一个 DOM 节点。
- 优点
  -  跨平台与分层设计

            实现了跨平台
  -  最小代价更新视图

            只更新变化的部分的视图
  -  保证性能下限

            普适的，所以它的性能并不是最优的
  -  无需手动操作 DOM

            js 运行效率高
  -  组件的高度抽象化

            可以适配 DOM 以外的渲染目标。不再依赖 HTML 解析器进行模版解析，可以进行更多的 AOT 工作提高运行时效率。
            Virtual DOM 的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。

- 缺点

    - 无法进行极致优化
    - 但在单个组件内部依然需要遍历该组件的整个 Virtual DOM 树。
    - 少量动态节点的情况下，这些遍历都是性能的浪费
    - 传统 Virtual DOM 的性能跟模版大小正相关，跟动态节点的数量无关

- 实现原理
  -  JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
  -  diff 算法 — 比较两棵虚拟 DOM 树的差异
  -  pach 算法(打补丁) — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。
   ![](/upload/更新节点.png)

## 小结
- 当数据发生改变时，订阅者 watcher 就会调用 patch 给真实的 DOM 打补丁
- 通过 isSameVnode 进行判断，相同则调用 patchVnode 方法
- patchVnode 做了以下操作：
  - 找到对应的真实 dom，称为 el
  - 如果都有文本节点且不相等，将 el 文本节点设置为 Vnode 的文本节点
  - 如果 oldVnode 有子节点而 VNode 没有，则删除 el 子节点
  - 如果 oldVnode 没有子节点而 VNode 有，则将 VNode 的子节点真实化后添加到 el
  - 如果两者都有子节点，则执行 updateChildren 函数比较子节点
- updateChildren 主要做了以下操作：
  - 设置新旧 VNode 的头尾指针
  - 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用 patchVnode 进行 patch 重复流程、调用 createElem 创建一个新节点，从哈希表寻找 key 一致的 VNode 节点再分情况操作 
