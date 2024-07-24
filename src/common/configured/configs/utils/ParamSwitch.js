import page_all from '../normal_props/page_all';
import normalConfig from '../normal_props/page_config/index.js';
// 把value对象内容取出来，拼接到key上，形成数据
function getValueToKey(data = {}) {
    if (data.constructor == Array) {
        const list = [];
        (data || []).forEach(item => {
            list.push(getValueToKey(item));
        });
        return list;
    } else {
        if (data.propsData) {
            // 说明是组件
            return {
                // ...data,
                type: data.type,
                kind: data.kind,
                disableData: data.disableData || {},
                styleData: data.styleData && getValueToKey(data.styleData),
                propsData: data.propsData && getValueToKey(data.propsData),
                eventData: data.eventData && getValueToKey(data.eventData),
                requestData: data.requestData && getValueToKey(data.requestData),
                extraData: data.extraData && getValueToKey(data.extraData)
            };
        } else {
            //说明是一般属性
            const newData = {};
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    if (data[key].type == 'array') {
                        newData[key] = getValueToKey(data[key].value);
                    } else if (data[key].type == 'arrayObject') {
                        newData[key] = data[key].value.map(val => {
                            return val.value;
                        });
                    } else if (data[key].type == 'object') {
                        newData[key] = getValueToKey(data[key].value);
                    } else if (data[key].constructor == Array) {
                        newData[key] = getValueToKey(data[key]);
                    } else {
                        newData[key] = data[key].value;
                    }
                }
            }
            return newData;
        }
    }
}

// 把value回转成对象格式
function getValueToValueObject(data = {}, conf, config, isExtra) {
    if (isExtra) {
        // 特殊逻辑，数据单独处理
        const confData = JSON.parse(JSON.stringify((conf)));
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                if (confData[key]) {
                    if (confData[key].type == 'array') {
                        const confVal = [];
                        const cusData = data[key] || [];
                        cusData.forEach(cus => {
                            const normalData = JSON.parse(JSON.stringify((confData[key].value[0] || {})));

                            for (const cuskey in cus) {
                                normalData[cuskey].value = cus[cuskey];
                                if (
                                    normalData[cuskey].rebaseTypeKeys &&
                                    cus[normalData[cuskey].rebaseTypeKeys]
                                ) {
                                    normalData[cuskey].type =
                                        cus[normalData[cuskey].rebaseTypeKeys];
                                }
                            }
                            if (cus.cusType == 'json') {
                                normalData.value.value = cus.value;
                            }
                            confVal.push(normalData);
                        });
                        confData[key].value = confVal;
                    } else {
                        const cus = data[key] || {};
                        const normalData = JSON.parse(JSON.stringify(confData[key].value || {}));
                        for (const cuskey in cus) {
                            normalData[cuskey].value = cus[cuskey];
                            if (
                                normalData[cuskey].rebaseTypeKeys &&
                                cus[normalData[cuskey].rebaseTypeKeys]
                            ) {
                                normalData[cuskey].type = cus[normalData[cuskey].rebaseTypeKeys];
                            }
                        }
                        if (cus.cusType == 'json') {
                            normalData.value.value = cus.value;
                        }
                        confData[key].value = normalData;
                    }
                }
            }
        }
        return confData;
    } else if (data.kind && data.type) {
        // 说明是组件
        const normal = config[data.kind];
        const child = normal.childs[data.type];
        if (child) {
            const childData = JSON.parse(JSON.stringify(child));
            const confData = {
                name: normal.name,
                kind: normal.kind,
                componentsName: normal.componentsName,
                type: childData.type,
                moduleName: childData.moduleName || '',
                disableData: {
                    // 覆盖操作
                    ...childData.disableData,
                    ...data.disableData
                },
                styleData: childData.styleData,
                propsData: childData.propsData,
                extraData: childData.extraData,
                eventData: childData.eventData,
                requestData: childData.requestData,
                contactChange: normal.contactChange || null, // 这个是数据之间的转换关系
                treeSelectMask: false // 树形标识
            };
            return {
                ...confData,
                styleData:
                    confData.styleData &&
                    getValueToValueObject(data.styleData, confData.styleData, config),
                propsData:
                    confData.propsData &&
                    getValueToValueObject(data.propsData, confData.propsData, config),
                eventData:
                    confData.eventData &&
                    getValueToValueObject(data.eventData, confData.eventData, config),
                requestData:
                    confData.requestData &&
                    getValueToValueObject(data.requestData, confData.requestData, config),
                extraData:
                    confData.extraData &&
                    getValueToValueObject(data.extraData, confData.extraData, config, true)
            };
        } else {
            return {};
        }
    } else if (data.propsData) {
        const normalData = JSON.parse(JSON.stringify(conf));
        return {
            ...normalData,
            styleData:
                normalData.styleData &&
                getValueToValueObject(data.styleData, normalData.styleData, config),
            propsData:
                normalData.propsData &&
                getValueToValueObject(data.propsData, normalData.propsData, config),
            eventData:
                normalData.eventData &&
                getValueToValueObject(data.eventData, normalData.eventData, config),
            requestData:
                normalData.requestData &&
                getValueToValueObject(data.requestData, normalData.requestData, config),
            extraData:
                normalData.extraData &&
                getValueToValueObject(data.extraData, normalData.extraData, config, true)
        };
    } else {
        //说明是一般属性
        if (JSON.stringify(data) == '{}') {
            // 去除错误组件
            return JSON.parse(JSON.stringify(conf));
        } else {
            const normalData = JSON.parse(JSON.stringify(conf));
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    if (normalData[key]) {
                        if (data[key] && data[key].constructor == Array) {
                            if (normalData[key].type == 'checkbox') {
                                // 多选场景
                                normalData[key].value = data[key];
                            } else {
                                const list = [];
                                data[key].forEach(conf => {
                                    if (normalData[key].value[0]) {
                                        if (normalData[key].type == 'arrayObject') {
                                            const val = JSON.parse(JSON.stringify(normalData[key].value[0]));
                                            val.value = conf;
                                            list.push(val);
                                        } else {
                                            list.push(
                                                getValueToValueObject(conf, normalData[key].value[0], config)
                                            );
                                        }
                                    } else {
                                        // 无内容时，内部存放的是组件
                                        list.push(getValueToValueObject(conf, config, config));
                                    }
                                });
                                normalData[key].value = list;
                            }
                        } else {
                            if (normalData[key].type == 'object') {
                                normalData[key].value = getValueToValueObject(data[key], normalData[key].value, config);
                            } else {
                                if (data[key] === 0) {
                                    normalData[key].value = 0;
                                } else {
                                    normalData[key].value = data[key] || '';
                                }
                            }
                        }
                    }
                }
            }
            return normalData;
        }
    }
}

// 数据， 活动id， 页面序号
function getShowData(data, evt_id, evt_sub) {
    const all = page_all.getConfig(evt_id, evt_sub);
    const newData = data || {};
    if (data.all) {
        const dataColorList = (data.all.styleData || {}).colorList || [];
        if (dataColorList.length == 0) {
            data.all.styleData = {
                ...data.all.styleData,
                colorList: getValueToKey(all.styleData).colorList
            };
        } else if (dataColorList.length > 0) {
            // 兼容数据,按照key重新写入
            const list = dataColorList;
            const confList = getValueToKey(all.styleData).colorList;
            list.forEach(itc => {
                let isIn = false;
                confList.forEach(ntc => {
                    if (ntc.keys == itc.keys) {
                        ntc.name = itc.name;
                        ntc.color = itc.color;
                        isIn = true;
                    }
                });
                if (!isIn) {
                    confList.push({
                        ...itc,
                        name: itc.name
                    });
                }
            });
            data.all.styleData = {
                ...data.all.styleData,
                colorList: confList
            };
        }
        newData.all = getValueToValueObject(data.all, all, {});
        // 吧列表数据重新缓存
    } else {
        newData.all = all;
    }
    if (data.pageConfig) {
        const config = normalConfig.getConfig();
        const list = [];
        data.pageConfig.forEach(conf => {
            list.push(getValueToValueObject(conf, config, config));
        });
        newData.pageConfig = list;
    } else {
        newData.pageConfig = [];
    }
    newData.staticData = data.staticData || {}; // 配置检测类型数据
    return newData;
}

function getSaveData(data) {
    const allEventData = getValueToKey(data.all);
    const newData = {
        all: allEventData,
        pageConfig: getValueToKey(data.pageConfig),
        staticData: {
            ...data.staticData,
            saveTimes: new Date().getTime() // 更新一下时间
        }
    };
    return newData;
}

// 获取页面配置的组件， 参数: pageConfig组件列表, kind类型, type标识
function getConfigModules(conf, kind, type) {
    let list = [];
    if (conf && conf.length > 0) {
        conf.forEach(element => {
            if (element && element.kind && element.type) {
                if (element.kind == kind && element.type == type) {
                    list.push(element);
                }
                if (element.kind == 'tab') {
                    const tabList = element.propsData.tabsConfig.value;
                    const newList = getConfigModules(tabList, kind, type);
                    list = list.concat(newList);
                } else if (element.kind == 'container') {
                    const tabList = element.propsData.children.value;
                    const newList = getConfigModules(tabList, kind, type);
                    list = list.concat(newList);
                }
            } else {
                // 只有tab一种情况
                const newList = getConfigModules(element.children.value, kind, type);
                list = list.concat(newList);
            }
        });
    }
    return list;
}

// 自动修复数据, 会自动添加完成正确的数据
// 所有数据均在原数据上改动
function getRepairData(val, evt_id, evt_sub = 0) {
    // 修复预览地址
}

// 检测数据是否未填写,仅做提示，不做逻辑
function getCheckData(data) {
    const tipList = [];
    // 分享没有加
    const allPropsData = data.all.propsData || {};
    if (!allPropsData.page_title.value) {
        tipList.push('请添加简单的页面标题');
    }
    return tipList;
}

export {
    getValueToKey, // 转换对象
    getShowData, // 下载下来的数据转换
    getSaveData, // 保存数据时转换
    getRepairData,
    getCheckData,
    getConfigModules
};
