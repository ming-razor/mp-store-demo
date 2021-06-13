# 微信小程序状态管理
基于发布订阅模式、小程序自定义组件behaviors配置 实现数据的状态管理。
   
## 应用场景
原生微信小程序开发

## 解决问题和实现目的
- [x] 全局共享的状态管理
- [x] 组件与页面都可订阅状态
- [x] 按需订阅
- [x] 支持异步编程
- [x] 不依赖插件

## 准备工作
小程序开发者工具-本地设置
- ES6转ES5
- 增强编译

## 如何使用
1. 创建model文件 `store/models/counter.js`；类似dva的model 或 vue的module
```javascript
const util = require('../../utils/util');
module.exports = {
    /* 
        状态管理-数据
    */
    state: {
        count: 0
    },
    /* 
        异步方法: return 会返回给 dispatch()
    */
    effects: {
        async delayAdd(action, { dispatch, storeState }) {
            // 延迟600ms
            await util.delay(600);
            dispatch({
                type: 'counter/add',
                payload: {
                    num: 1,
                }
            });
            return storeState.counter.count;
        },
    },
    /*
        同步方法: return 会覆盖此 model的 state
    */
    reducers: {
        add(state, { payload }) {
            return {
                ...state,
                count: state.count + payload.num
            }
        }
    }
};
```

2. store中注入此model `store/store.js`
```javascript
const createStore = require('../utils/createStore');
const counter = require('./models/counter.js');

module.exports = createStore({
    counter,
});
```

3. 在页面或组件的js的订阅需要的数据
```javascript
const store = require("../../store/store");
const connect = require('../../store/connect');

Component({
    /* 
        1. 这里选择需要订阅的数据。
            connect的参数: 模块名[]
    */
    behaviors: [
        connect(['counter']),
    ],
    data: {
        count: 0,
    },
    methods: {
        /*  
            2. 数据更新会触发 onStoreStateUpdate, 参数是 store 的 state
        */
        onStoreStateUpdate({ counter }) {
            this.setData({
                count: counter.count
            });
        },
        onAdd() {
            /* 
                触发数据变更
            */
            store.dispatch({
                type: 'counter/add',
                payload: {
                    num: 1
                }
            });
        },
        async onAsyncAdd() {
            /* 
                触发store的异步方法。一般方法内会再 dispatch 触发数据变更
            */
            const count = await store.dispatch({
                type: 'counter/delayAdd',
            });
        }
    }
});
```

## `store/store.js` 的属性
store.state
   * store的数据状态
---
store.dispatch({ type, payload })
   * type: 字符串, 以/为分割符；前面是model名，后面是方法名。 '[model name]/[method]'
   * payload 传给方法的参数
---
store.subscribe(subscribeModelNames, subscribeCallback)
  * subscribeModelNames: string[]  订阅的model
  * subscribeCallback: function()  订阅的model发布状态改变触发的回调
---
## 必要文件的简单说明 
* utils/createStore.js createStore方法 解析注入的models，创建store。
* store/store.js store对象。可用于获取所有数据(state); 触发状态改变(dispatch); 订阅与取消订阅(subscribe/unsubscribe)。
* store/connect.js connect方法用于接受需要订阅model，创建 behavior。 用于组件订阅
* store/models/* 数据模块管理文件

## 非必要解释
> * 关于组件标签 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/ 虽然官网申明 ‘因为 WXML 节点标签名只能是小写字母、中划线和下划线的组合，所以自定义组件的标签名也只能包含这些字符。但我发现大写并没有影响，为了提高辨识度方便查找文件所以我的组件名是大小写组合
> * 需 `本地设置-增强编译` 是因为我习惯了async/await 的写法。




