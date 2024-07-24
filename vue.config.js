const fs = require('fs');
const UglifyJS = require('uglify-js');
const remScript = UglifyJS.minify(fs.readFileSync('./rem_v2.js', 'utf-8')).code;

module.exports = {
    publicPath: '/pages/tool/assets/',
    outputDir: './dist/',
    // css: {
    //     extract: true,
    //     sourceMap: false,
    //     loaderOptions: {
    //         css: {},
    //         postcss: {}
    //     }
    // },
    devServer: {
        client: {
            overlay: false,
        },
        proxy: {
            '/user/': {
                target: 'http://www.metwo.cn/'
            },
            '/page/': {
                target: 'http://www.metwo.cn/'
            }
        }
    },
    pages: {
        page_config: {
            // 配置化页面
            entry: 'src/page/page_config/main.js',
            template: 'src/page/page_config/index.html',
            filename: 'page_config.html',
            inline: remScript
        },
        auto_active: {
            // 活动基本页面
            entry: 'src/page/auto_active/main.js',
            template: 'src/page/auto_active/index.html',
            filename: 'auto_active.html',
            inline: remScript
        }
    }
};