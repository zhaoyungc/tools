const poster1 = {
    type: 'poster1', // 子类型
    moduleName: '头图组件1',
    disableData: { // 页面用到，但是不展示出来配置信息

    },
    propsData: { // 需要通过配置去改
        posterDown: {
            tip: '完整的头图',
            info: '宽度为750的图片，高度没要求, 大小限制在200kb',
            type: 'image', // 图片类型
            sizes: [0, 200], // 大小范围(kb)
            showSize: true, // 是否展示该图片的尺寸
            checkChange: true, // 是否监听更改，更改时会执行contactChange方法, 仅限于propsData下的字段
            value: 'http://www.metwo.cn/resource/gc/bannerDown.png',
        },
        posterCenter: {
            tip: '中间动画图',
            info: '可以不填，若选择动图需要与完整头图大小一致',
            type: 'image',
            value: 'http://www.metwo.cn/resource/gc/bannerCenter.png',
        },
        posterTop: {
            tip: '最上的小鸟',
            info: '可以不填，若选择动图需要与完整头图大小一致',
            type: 'image',
            value: 'http://www.metwo.cn/resource/gc/1656742518_92bc871b3d294ebb1ea694c5d3292435.png',
        },
        minHeight: {
            tip: '图片高度',
            noDisplay: true, // 不显示配置, 改数据会自行修改
            info: '所有图片在宽度为750的情况下的高度,上传完图片后',
            value: '844',
        },
    },
    requestData: {

    },
};

function getConfig() {
    return {
        name: '头图组件',
        componentsName: 'PagePoster',
        kind: 'poster',
        childs: {
            poster1,
        },
        contactChange: (data) => {
            if (data.posterDown.value) {
                const imgDom = new Image();
                imgDom.src = data.posterDown.value;
                this.errorMsg = '';
                imgDom.onerror = () => {
                    data.minHeight.value = '0';
                };
                if (imgDom.complete) {
                    data.minHeight = {
                        ...data.minHeight,
                        value: parseInt(imgDom.height / imgDom.width * 750 + '') + '',
                    };
                } else {
                    imgDom.onload = () => {
                        data.minHeight = {
                            ...data.minHeight,
                            value: parseInt(imgDom.height / imgDom.width * 750 + '') + '',
                        };
                    };
                }
            }
        }
    };
}

export default {
    getConfig,
};