<template>
    <div class=".divbody">
        <el-card shadow="hover" :body-style="{ padding: '20px' }" style="width: 800px;height: 400px;">
            <el-form :hide-required-asterisk="true" label-position="left" style="text-align: center;" :model="form"
                ref="form" :rules="rules" :inline="true" size="normal">
                <h3>登录</h3>
                <el-form-item prop="username" label="用户名：" style="margin-top: 50px;margin-left: 5%;">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码：" style="margin-top: 50px;margin-left: 10.5%;">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>

            </el-form>
            <el-button style="margin-left: 45%;margin-top: 20px;" type="primary" @click="submit">登录</el-button>
        </el-card>


    </div>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import router from '@/router';
import { getMenu } from '../api';


export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: 'admin',
                password: 'admin'

            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        submit() {


            //效验并登录
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        if (data.code === 20000) {
                            Cookie.set('token', data.data.token)
                            // console.log(data);

                            //登录成功设置路由
                            this.$store.commit('setMenu',data.data.menu)
                            //动态添加路由
                            this.$store.commit('addMenu',this.$router)

                            this.$router.push('/home')
                            // console.log(data);
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                        } else if(data.code) {
                            
                            this.$message({
                                message: '用户名或密码错误',
                                type: 'error'
                            });
                        }
                        else {
                            
                        }
                    })
                }
            })



        },
    },
}
</script>

<style lang="less" scoped>
.el-card {

    background-color: rgb(248, 248, 248);
    margin: 180px auto;
    border-radius: 15px;
}
</style>