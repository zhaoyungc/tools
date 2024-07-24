// 配置内部使用的方法， 只是不想混用，单独做个文件，活动配置专用，要用到活动配置的数据，不是通用方法

function getBackGroundColor(configData) {
    if (configData.all && configData.all.styleData) {
        const bgColor = (configData.all.styleData.pageBackageColor || {}).value;
        const colorList = (configData.all.styleData.colorList || {}).value || [];
        if (bgColor) {
            if (bgColor.indexOf('#') == 0) { // 说明是颜色
                return bgColor;
            } else if(bgColor.indexOf('keys') == 0){
                let color = '';
                for (let index = 0; index < colorList.length; index++) {
                    const element = colorList[index] || {};
                    if ((element.keys || {}).value == bgColor){
                        color = (element.color || {}).value;
                        break;
                    }
                }
                return color;
            }
        }
    }
    return '';
}

// 第一个参数是颜色值， 第二个参数是颜色配置 all.styleData.colorList
// 关于颜色值的key问题，可以使用现有的几种
// keys_bg，keys_main，keys_second，keys_btn，keys_font，keys_1， keys_2，
// 其余的key值都是时间戳标识， 使用时可以按照json里的值，也可以更改成自己想用的值，必须是key_开头，不是#开头就可以，不能重复
function getNormalColor(colorKey, colorList) {
    if (colorList) {
        const valList = colorList.value || [];
        if (colorKey) {
            if (colorKey.indexOf('#') == 0) { // 说明是颜色
                return colorKey;
            } else if(colorKey.indexOf('keys') == 0){
                let color = '';
                for (let index = 0; index < valList.length; index++) {
                    const element = valList[index] || {};
                    if ((element.keys || {}).value == colorKey){
                        color = (element.color || {}).value;
                        break;
                    }
                }
                return color;
            }
        }
    }
    return '';
}

export {
    getBackGroundColor, // 获取背景颜色, 固定的，别动了
    getNormalColor, // 对外使用的，尤其是插槽内
};