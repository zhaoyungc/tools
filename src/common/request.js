import axios from 'axios';
import ls from './ls';

function get(url, params, callback) {
    axios.get(url, {
        params: {
            ...params,
            token: ls.getToken(),
        }
    }).then(function (response) {
        const resData = response.data || {};
        callback(resData.status, resData);
    }).catch(function () {
        callback(0, { msg: '错误' });
    });
}

function post(url, params, callback) {
    axios.post(url, {
        ...params,
        token: ls.getToken(),
    }).then(function (response) {
        const resData = response.data || {};
        callback(resData.status, resData);
    }).catch(function () {
        callback(0, { msg: '错误' });
    });
}

export default {
    get,
    post,
};