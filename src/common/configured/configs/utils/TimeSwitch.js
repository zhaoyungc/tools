// 时间戳转换为日期
function getTimesData(timestamp = "") {

    let date = null;
    if (timestamp) {
        if (timestamp > 1e9 && timestamp < 1e10) {
            timestamp = timestamp * 1000;
        }
        if (timestamp < 1e12 || timestamp >= 1e13) {
            return null;
        }
        date = new Date(timestamp);
    } else {
        date = new Date();
    }

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes(),
        second: date.getSeconds(),
    };
}

function getDouble(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num + '';
    }
}

function getTimesString(timestamp = "") {

    let date = null;
    if (timestamp) {
        if (timestamp > 1e9 && timestamp < 1e10) {
            timestamp = timestamp * 1000;
        }
        if (timestamp < 1e12 || timestamp >= 1e13) {
            return null;
        }
        date = new Date(timestamp);
    } else {
        date = new Date();
    }

    return date.getFullYear() + '/' +
        getDouble(date.getMonth() + 1) + '/' +
        getDouble(date.getDate()) + ' ' +
        getDouble(date.getHours()) + ':' +
        getDouble(date.getMinutes()) + ':' +
        getDouble(date.getSeconds());
}

// 活动专用，当前开始时间
// props默认值使用
function getActiveNormalTimesString(status) {
    let date = new Date();
    if (status == 'end') {
        date = new Date(new Date().getTime() + 3600000 * 24 * 7);
    }
    let res = date.getFullYear() + '/' +
    getDouble(date.getMonth() + 1) + '/' +
    getDouble(date.getDate());
    if (status == 'end') {
        res = res + ' ' + '23:59:59';
    } else {
        res = res + ' ' + '12:00:00';
    }
    return res;
}

export {
    getTimesData,
    getDouble,
    getTimesString,
    getActiveNormalTimesString,
};
