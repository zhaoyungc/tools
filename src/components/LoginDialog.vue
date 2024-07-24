<template>
    <div class="login-dialog-ct">
        <div class="login-content">
            <div class="text">用户名</div>
            <div class="input-ct">
                <input v-model="username" class="input">
            </div>
            <div class="text">密码</div>
            <div class="input-ct">
                <input v-model="password" class="input">
            </div>
            <div class="btn-ct">
                <div class="btn out" @click="toCancel">取消</div>
                <div class="btn" @click="toSign" :class="(!username || !password) ? 'disable' : ''">注册</div>
                <div class="btn" @click="toLogin" :class="(!username || !password) ? 'disable' : ''">登录</div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
import ls from '../common/ls';
// 登陆弹窗
export default {
    name: 'LoginDialog',
    data: () => {
        return {
            username: "",
            password: "",
        };
    },
    components: {

    },
    methods: {
        toSign() {
            this.$request.post('/user/add/detail', {
                user_name: this.username,
                user_pass: this.password
            }, (status, res) => {
                if (status == 1) {
                    const token = res.data.user.token || '';
                    ls.setToken(token);
                }
                this.$emit('ok', status, res);

            });
        },
        toLogin() {
            this.$request.get('/user/get/name/detail', {
                user_name: this.username,
                user_pass: this.password
            }, (status, res) => {
                if (status == 1) {
                    const token = res.data.user.token || '';
                    ls.setToken(token);
                }
                this.$emit('ok', status, res);
            });
        },
        toCancel() {
            this.$emit('cancel');
        }
    },
    mounted() {

    },
};
</script>

<style lang="scss" scoped>
.login-dialog-ct {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;

    .login-content {
        position: absolute;
        width: 260px;
        height: 200px;
        padding: 20px;
        box-sizing: border-box;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -130px;
        background: #ffffff;
        border-radius: 3px;

        .text {
            width: 100%;
            font-size: 14px;
            color: #222222;
            padding-top: 10px;
        }

        .input-ct {
            width: 100%;
            height: 24px;
            border: 1px solid #222;
            border-radius: 2px;

            .input {
                width: 100%;
                height: 100%;
                border: none;
                outline: 0;
                resize: none;
                font-size: 14px;
                line-height: 18px;
                background: #fefefe;
            }
        }

        .btn-ct {
            width: 100%;
            padding-top: 20px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-evenly;

            .btn {
                width: 60px;
                height: 32px;
                box-sizing: border-box;
                background: #409eff;
                border-radius: 2px;
                border: 1px solid #409eff;
                color: #ffffff;
                font-size: 16px;
                line-height: 16px;
                padding: 8px 0;
                text-align: center;
                cursor: pointer;

                &.out {
                    background: #ffffff;
                    color: #409eff;
                }

                &.disable {
                    pointer-events: none;
                    opacity: 0.6;
                }
            }
        }
    }
}
</style>
