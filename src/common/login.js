import request from '@/common/request';
import ls from './ls';

function toLogin(_name, _pass) {
    request.get('/user/get/name/detail', {
        user_name: _name,
        user_pass: _pass
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

function autoLogin(callback) {
    const lsKey = ls.getToken();
    if (lsKey) {
        request.get('/user/get/token/detail', {}, callback);
    } else {
        callback(0, {});
    }
}

export default {
    toLogin,
    autoLogin,
};