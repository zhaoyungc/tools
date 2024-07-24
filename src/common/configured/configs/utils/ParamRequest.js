import request from "@/common/request";

const NORMAL_NAME = '__page_checkout_save_config__';

async function setData(id, params) {
    if (window.location.hostname == 'localhost') {
        return new Promise(function (resolve, reject) {
            if (window.localStorage) {
                try {
                    const dataStr = JSON.stringify(params);
                    window.localStorage.setItem(NORMAL_NAME + id, dataStr);
                    console.log('本地保存数据');
                    window.alert('保存成功');
                    resolve();
                } catch (e) {
                    reject('出错');
                    console.log('出错', e);
                }
            }
        });
    } else {
        return new Promise(function (resolve, reject) {
            request.post('/page/add/detail', {
                id,
                msg: JSON.stringify(params)
            }, (status, res) => {
                if (status == 1) {
                    window.alert('保存成功');
                    resolve();
                } else {
                    reject(res.msg);
                }
            });
        });
    }
}

async function getData(id) {
    if (window.location.hostname == 'localhost') {
        if (window.localStorage) {
            const dataStr = window.localStorage.getItem(NORMAL_NAME + id);
            if (dataStr) {
                try {
                    const data = JSON.parse(dataStr);
                    console.log('本地读取数据', id);
                    return data || {};
                } catch (e) {
                    console.log('出错', e);
                }
            } else {
                return {};
            }
        }
        return {};
    } else {
        return new Promise(function (resolve, reject) {
            request.get('/page/get/detail', {
                id,
            }, (status, res) => {
                if (status == 1) {
                    const dataStr = ((res.data.list || [])[0] || {}).page_msg || '{}';
                    const data = JSON.parse(dataStr);
                    resolve(data);
                } else {
                    reject('');
                }
            });
        });
    }
}

export {
    getData,
    setData,
};
