
const wxp = require('../../utils/wxp');

module.exports = {
    state: {
        wx_user_info: []
    },
    effects: {
        async getWxUserInfo(action, { dispatch }) {
            // F5未来商店需要获取您的昵称等基本信息
            const res = await wxp.getUserProfile({
                desc: '用于用户辨认',
            });
            dispatch({
                type: 'user/setWxUserInfo',
                payload: res.userInfo
            });
            return res;
        }
    },
    reducers: {
        setWxUserInfo(state, { payload }) {
            return { ...state, wx_user_info: payload };
        }
    }
};