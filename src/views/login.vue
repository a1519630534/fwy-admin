<template>
    <div>
        <div class="box">
            <form autocomplete="off">
                <h2>用户登录</h2>
                <div class="inputBox">
                    <input type="text" v-model="form.username" required="required">
                    <span>用户名</span>
                    <i></i>
                </div>
                <div class="inputBox">
                    <input type="password" v-model="form.password" required="required">
                    <span>密码</span>
                    <i></i>
                </div>
                <input type="submit" value="登录" @click.prevent="submit">

            </form>
        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import router from '@/router';


export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: 'admin',
                password: 'admin'

            },

        };
    },
    methods: {

        submit() {


            this.$API.user.login(this.form).then(({ data }) => {
                if (data.code === 20000) {
                    Cookie.set('token', data.data.token)
                    Cookie.set('username', data.data.username)
                    // console.log(data);

                    //登录成功设置路由
                    this.$store.commit('setMenu', data.data.menu)
                    //动态添加路由
                    this.$store.commit('addMenu', this.$router)

                    //存储用户名
                    this.$store.dispatch('getInfo', data.data)



                    // console.log(this.$store.state.userinfo.userinfo);
                    this.$router.push('/home')
                    // console.log(data);

                    this.$message({
                        message: '登录成功',
                        type: 'success',


                    });
                } else if (data.status === 1) {
                    this.$message({
                        message: '用户名或密码错误',
                        type: 'error'

                    });
                }
                else {

                }
            })


        },
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#23242a')
    },
    beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
    },
    mounted() {

    },

}
</script>

<style lang="less" scoped>
/* 引入需要的字体 */
@import url('./font.css');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    background: #23242a;
}

.box {

    margin: 0 auto;
    margin-top: 184px;
    background-image: url('../assets/logo.png');
    position: relative;
    width: 380px;
    height: 500px;
    background: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
}

.box::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    transform-origin: bottom right;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    animation: animate 6s linear infinite;
}

.box::after {
    content: '';
    z-index: 1;
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    transform-origin: bottom right;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    animation: animate 6s linear infinite;
    animation-delay: -3s;
}

@keyframes animate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

form {
    position: absolute;
    inset: 2px;
    background: #28292d;
    padding: 50px 40px;
    border-radius: 8px;
    z-index: 2;
    display: flex;
    flex-direction: column;
}

h2 {
    color: #45f3ff;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.1em;
}

.inputBox {
    position: relative;
    width: 300px;
    margin-top: 35px;
}

.inputBox input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    color: #23242a;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    z-index: 10;
}

.inputBox span {
    position: absolute;
    left: 0;
    padding: 20px 0px 10px;
    pointer-events: none;
    font-size: 1em;
    color: #8f8f8f;
    letter-spacing: 0.05em;
    transition: 0.5s;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
    color: #45f3ff;
    transform: translateX(0px) translateY(-34px);
    font-size: 0.75em;
}

.inputBox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #45f3ff;
    border-radius: 4px;
    overflow: hidden;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
}

.inputBox input:valid~i,
.inputBox input:focus~i {
    height: 44px;
}



input[type="submit"] {
    border: none;
    outline: none;
    padding: 11px 25px;
    background: #45f3ff;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 600;
    width: 100px;
    margin-top: 10px;
}

input[type="submit"]:active {
    opacity: 0.8;
}
</style>