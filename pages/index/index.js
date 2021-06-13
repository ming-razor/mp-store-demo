const store = require("../../store/store");
const util = require("../../utils/util");
const connect = require('../../store/connect');

Component({
    behaviors: [
        connect(['counter', 'user']),
    ],

    data: {
        add_loading: false,
        reduce_loading: false,
        nickName: '',
    },

    lifetimes: {
        created() {
            
        },
        attached() {

        },
        detached() {
        },
    },
    pageLifetimes: {

    },

    methods: {
        onStoreStateUpdate({ counter, user }) {
            this.setData({
                nickName: user.wx_user_info ? user.wx_user_info.nickName : '',
                add_loading: counter.add_loading,
                reduce_loading: counter.reduce_loading,
            });
        },
        onReduce() {
            store.dispatch({
                type: 'counter/reduce',
                payload: {
                    num: 1
                }
            });
        },
        async onChainReduce() {
            if (this.data.reduce_loading) {
                return;
            }
            await store.dispatch({
                type: 'counter/delayReduce',
            });
            await store.dispatch({
                type: 'counter/delayReduce',
            });
        },
        onAdd() {
            store.dispatch({
                type: 'counter/add',
                payload: {
                    num: 1
                }
            });
        },
        onAsyncAdd() {
            if (this.data.add_loading) {
                return;
            }
            store.dispatch({
                type: 'counter/delayAdd',
            });
        },
        toUser() {
            wx.navigateTo({
                url: '/pages/user/user'
            })
        },

        onPageScroll(event) {
            console.log('component 的监听页面滚动')
        },
        
    },
});
