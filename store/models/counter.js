const util = require('../../utils/util');

module.exports = {
    state: {
        count: 0,
        add_loading: false,
        reduce_loading: false,
    },
    effects: {
        async delayAdd(action, { dispatch, storeState }) {
            dispatch({
                type: 'counter/setAddLoading',
                payload: true
            });
            await util.delay(600);
            dispatch({
                type: 'counter/add',
                payload: {
                    num: 1,
                }
            });
            dispatch({
                type: 'counter/setAddLoading',
                payload: false
            });
            return storeState.counter.count;
        },
        async delayReduce(action, { dispatch, storeState }) {
            
            dispatch({
                type: 'counter/setReduceLoading',
                payload: true
            });
            await util.delay(500);
            dispatch({
                type: 'counter/reduce',
                payload: {
                    num: 1,
                }
            });
            dispatch({
                type: 'counter/setReduceLoading',
                payload: false
            });
            return storeState.counter.count;
        }
    },
    reducers: {
        add(state, { payload }) {
            return {
                ...state,
                count: state.count + payload.num
            }
        },
        reduce(state, { payload }) {
            return {
                ...state,
                count: state.count - 1
            }
        },
        setAddLoading(state, { payload }) {
            return {
                ...state,
                add_loading: payload
            }
        },
        setReduceLoading(state, { payload }) {
            return {
                ...state,
                reduce_loading: payload
            };
        },
    }
};