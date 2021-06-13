
const util = require('../../utils/util');
const store = require('../../store/store');
const connect = require('../../store/connect');

Component({
    behaviors: [
        connect(['user'])
    ],

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: null,
        nickName: null
    },

    pageLifetimes: {
        
    },

    methods: {
        onStoreStateUpdate({ user }) {
            if (user.wx_user_info) {
                this.setData({
                    nickName: user.wx_user_info.nickName || null,
                    avatarUrl: user.wx_user_info.avatarUrl || null,
                })
            }
        },
        onGetUserInfo() {
            store.dispatch({
                type: 'user/getWxUserInfo'
            });
        }
    }
});