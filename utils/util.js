
const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : `0${n}`;
};

module.exports = {
    formatTime(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`;
    },
    delay(stamp = 0) {
        return new Promise(reslove => {
            setTimeout(reslove, stamp);
        });
    },
    findItemWithKeyValue(array, key, value) {
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i] && array[i].hasOwnProperty(key) && array[i][key] == value) {
                return array[i];
            }
        }
        return null;
    },
    findIndexWithKeyValue(array, key, value) {
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i] && array[i].hasOwnProperty(key) && array[i][key] == value) {
                return i;
            }
        }
        return -1;
    },
    debounce(fn, context, delay, mustRunDelay) {
        let timer = null;
        let start = Date.now();

        let args = [];
        let handler = function () {
            fn.apply(context, args);
        };

        return function () {
            args = arguments;

            clearTimeout(timer);
            timer = setTimeout(handler, delay);

        };
    },
    formatDate(date, format) {
        date = new Date(date);
        let yy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let hh = date.getHours();
        let m = date.getMinutes();
        let ss = date.getSeconds();
        hh = hh < 10 ? '0' + hh : hh;
        m = m < 10 ? '0' + m : m;
        ss = ss < 10 ? '0' + ss : ss;
        mm = mm < 10 ? '0' + mm : mm;
        dd = dd < 10 ? '0' + dd : dd;
        return format.toLowerCase().replace('yy', yy).replace('mm', mm).replace('dd', dd).replace('hh', hh).replace('m', m).replace('ss', ss);
    },
    isNull(item) {
        return item === null || item === undefined || item === '';
    },
    ObjectValues(obj) {

        if (Object.values) {
            return Object.values(obj);
        }

        let arr = [];
        obj = obj || {};
        for (let keyname in obj) {
            arr.push(obj[keyname]);
        }
        return arr;

    },
    setExtraField(products) {
        products.forEach(product => {
            product._isOnSales = !!product.originalPrice && product.originalPrice > product.price;
            product._viewImg = this.ossFilter(product.urlFullpath, 200, 200);
        });
    },
    optionsToParamsStr(options) {
        let paramsStr = [];

        Object.keys(options).forEach(key => {
            paramsStr.push(`${key}=${options[key]}`);
        });

        paramsStr = paramsStr.join('&');

        if (paramsStr != '') {
            paramsStr = '?' + paramsStr;
        }

        return paramsStr;
    },
    getSubDict(srcDict, fields) {
        const new_dict = {};
        for (let keyname of fields) {
            new_dict[keyname] = srcDict[keyname];
        }
        return new_dict;
    },

};
