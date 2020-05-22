<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manage_tip">
                    <p>员工考勤系统</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"><span></span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain class="submit_btn" @click="onSubmit">登陆</el-button>
                    </el-form-item>
                </el-form>
                <el-link @click="visible = true">后台管理员登陆</el-link>
                <el-dialog :visible.sync="visible" title="身份验证">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="密码">
                            <el-input v-model="formInline.adminPas" placeholder="请输入管理员密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="adminSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </section>
        </transition>
    </div>
</template>

<script>
    // import {login, getAdminInfo} from '@/api/getData'

    export default {
        data(){
            return {
                visible: false,

                formInline: {
                    adminPas:'',
                },
                myUser:{
                    userId:'',
                    username: '',
                    password: '',
                    name: '',
                    station: '',
                    phone: '',
                    mail: '',
                },
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },

            }
        },
        methods: {
            async onSubmit() {
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/sign/api/checkToSign',
                    params: {
                        username : this.loginForm.username,
                        password : this.loginForm.password
                    }
                }).then(function(response){
                    if(response.data.userId == null) {
                       console.log('isNull');
                        _this.$message({
                            message: '错误的用户名密码',
                            type: 'warning'
                        });

                    }else {

                        /*Vue.set(this.iptDatas[index], `showAlert`, true)*/
                        console.log(response.data.userId+"home login");
/*
                        _this.myUser.userId = response.data.userId;
                        _this.myUser.username = response.data.username;
                        _this.myUser.password = response.data.password;
                        _this.myUser.name = response.data.name;
                        _this.myUser.station = response.data.station;
                        _this.myUser.phone = response.data.phone;
                        _this.myUser.mail = response.data.mail;
                        _this.$session.set("myUser", _this.myUser);
*/
                        console.log(_this.myUser.userId);
                        _this.$session.set("myUserId", response.data.userId);
                        _this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        _this.$router.push({path: 'home'});
                    }

                });
            },
            async adminSubmit(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/sign/api/adminLogin',
                    params: {
                        password : this.formInline.adminPas,
                    }
                }).then(function(response){
                    if(response.data == 'fail'){
                        _this.$message({
                            message: '错误的密码',
                            type: 'error'
                        });
                        return;
                    }
                    console.log(response.data);
                    _this.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    _this.$router.push({path: 'admin'});
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .login_page{
        background-color: #324057;
    }
    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
            color: #fff;
        }
    }
    .form_contianer{
        .wh(320px, 210px);
        .ctp(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
</style>
