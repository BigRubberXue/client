<template>

    <el-container>
        <el-header>
            <img src="../assets/img/logo.png"  style="margin-left: 30%" height="60px" width="60px"/>
            <img src="../assets/img/logo-adminText.png" height="60px" width="262.5px" style="margin-right: 30%"/>
        </el-header>
        <el-container id="mainController">
            <el-aside width="10%"></el-aside>
            <el-main>
                <el-container style="width:100%">
                    <el-main v-loading="kqLoading" style=" width: 50%">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>考勤记录</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="onSubmit(staticData.dataList)">查看详情</el-button>
                            </div>
                            <div>
                                总员工数：<a style="font-size: xx-large; color: #555555 " v-text="dataList.comMember"></a>
                            </div>
                            <div>
                                截至目前已签到人数：<a style="font-size: xx-large; color: #555555 " v-text="dataList.signed" ></a>
                            </div>
                            <div>
                                截至目前未签到人数：<a style="font-size: xx-large; color: #555555 " v-text="dataList.unsigned"></a>
                            </div>
                            <div></div>
                        </el-card>
                    </el-main>
                    <el-main style=" width: 50%" v-loading="applyLoading">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>申请列表</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="onSubmit(staticData.applyList)">查看详情</el-button>
                            </div>
                            <div v-for="apply in applyData" :key="apply.applyId" class="text item">
                                {{'未处理申请 ' + apply.applyId + ' 标题 :' + apply.applyTitle}}
                            </div>
                            <div  class="text item" v-show="applyMore">
                                ......
                            </div>
                        </el-card>
                    </el-main>
                </el-container>
                <el-container>
                    <el-main style=" width: 50%">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>发送消息</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="onSubmit(staticData.sendMsg)">查看详情</el-button>
                            </div>
                            <el-form ref="form" :model="msgForm" label-width="80px">
                                <el-form-item label="标题">
                                    <el-input v-model="msgForm.msgTitle"></el-input>
                                </el-form-item>
                                <el-form-item label="说明">
                                    <el-input v-model="msgForm.msg"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitMsg">立即发送</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-main>
                    <el-main style=" width: 50%">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>员工添加</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="onSubmit(staticData.addMember)">查看详情</el-button>
                            </div>
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="员工用户名">
                                    <el-input v-model="userForm.username"></el-input>
                                </el-form-item>
                                <el-form-item label="员工密码">
                                    <el-input v-model="userForm.password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitUser">立即发送</el-button>
                                    <el-button>清空</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-main>

                </el-container>



            </el-main>
            <el-aside width="10%"></el-aside>
        </el-container>

        <el-footer></el-footer>
    </el-container>
</template>

<script>
    export default {
        data(){
            return {
                dataList:{
                    comMember : 1,
                    signed : 2,
                    unsigned: 3,
                },

                kqLoading: true,
                applyLoading: true,
                form: {
                    applyTitle: '',
                    tips: '',
                    userId : 1,
                    //this.$session.get("userId");
                },
                msgForm:{
                    msgTitle: '',
                    msg: '',
                },
                userForm:{
                    username:'',
                    password:'',
                },
                staticData : {
                    dataList : 'dataList',
                    applyList : 'applyList',
                    sendMsg : 'sendMsg',
                    addMember : 'addMember',
                },
                applyData:[],
                applyMore : false,
                // attData:[],
            }
        },
        methods: {
            async onSubmit(str) {
                console.log('111');
                this.$router.push({path:'adminData',query: {model:str}});
            },
            async initData(){
                console.log('111');
                let _this = this;
                var nowDate = new Date();
                let date = {
                    year : nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8083/admin/api/getSumDataMap',
                    params: {
                        // userId: _this.myUser.userId
                        date : date.year + '-' + date.month + '-' + date.date,
                    }
                }).then(function (response) {
                    console.log(response.data);
                    console.log(response.data.signedMember+" response.data.signedMember ");
                    _this.dataList.comMember = response.data.sumMember;
                    _this.dataList.signed = response.data.signedMember;
                    _this.dataList.unsigned = _this.dataList.comMember - _this.dataList.signed;

                });
                this.kqLoading = false;
            },
            //发消息
            async submitMsg(){
                let _this = this;
                var nowDate = new Date();
                let date = {
                    year : nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/sendMsg',
                    params: {
                        msgTitle : _this.msgForm.msgTitle,
                        msg : _this.msgForm.msg,
                        msgTime : date.year + '-' + date.month + '-' + date.date,
                    }
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                        _this.$message({
                            message: '提交失败',
                            type: 'info'
                        });
                    }else{
                        console.log(response.data+' in sendMsg');
                        _this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        _this.clearMsgForm();
                        _this.userList = [];
                    }
                });
            },
            //添加用户
            async submitUser(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/addMember',
                    params: {
                        username : _this.userForm.username,
                        password : _this.userForm.password,
                    }
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                        _this.$message({
                            message: '提交失败',
                            type: 'info'
                        });
                    }else{
                        console.log(response.data+' in addMember');
                        _this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        _this.userForm.username='';
                        _this.userForm.password='';
                    }
                });
            },
            //加载申请表
            async initApply(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/postApply',
                    /*params: {
                        username : this.loginForm.username,
                        password : this.loginForm.password
                    }*/
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                    }else{
                        for(var num = 0 ; num < Math.min(response.data.length, 5) ; num++){
                            _this.applyData.push({
                                applyId:response.data[num].applyId,
                                applyTitle: response.data[num].applyTitle,
                                tips: response.data[num].tips,
                                reason: response.data[num].reason,
                                startTime:response.data[num].startTime,
                                endTime:response.data[num].endTime,
                                applyType:response.data[num].applyType,
                                userId:response.data[num].userId,
                            });
                        }
                        console.log("finish init "+response.data.length+" items about att");
                        if(response.data.length >= 5){
                            _this.applyMore = true;
                        }
                        _this.applyLoading = false;
                    }
                });

            },
            clearMsgForm(){
                this.msgForm.msg = '';
                this.msgForm.msgTitle = '';
            },
        },
        mounted: function () {
            this.initData();
            this.initApply();
        }
    }
</script>

<style lang="less">
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    #mainController {
        background-image: url("../assets/img/bg_2.jpg");
        background-repeat: no-repeat;
        min-height: 600px;
    }
</style>