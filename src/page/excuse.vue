<template>
    <el-container style="border: 1px solid #eee">
        <!--  Header  -->
        <el-header>
            <a style="height: 60px; width: 500px">
                <img src="../assets/img/logo.png" style="margin-left: 50px;" height="60px" width="60px"/>
                <img src="../assets/img/logo-titleText.png" height="60px" width="210px"/>
            </a>
            <a href="/info"><el-avatar style="background-color: #B3C0D1;"> user </el-avatar></a>
            <el-row style="margin: 10px; float: right">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                <el-button type="success" icon="el-icon-s-data" @click="topRedirect(data)" circle></el-button>
                <el-button type="warning" icon="el-icon-star-off" @click="topRedirect(message)" circle></el-button>
            </el-row>
            <el-button v-bind:disabled="isSigned" @click="signed" style="margin: 10px; float: right">签到</el-button>

        </el-header>
        <!-- mid Page -->
        <el-container style="min-height: 600px">
            <!-- aside -->
            <el-aside width="20%" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['3']" router :default-active="$route.path">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-s-home"></i>首页</template>
                        <el-menu-item-group>
                            <el-menu-item index="/home">首页</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>个人数据</template>
                        <el-menu-item-group>
                            <el-menu-item index="/info">个人信息</el-menu-item>
                            <el-menu-item index="/data" >考勤记录</el-menu-item>
                            <el-menu-item index="/attSum">考勤总结</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-order"></i>信息申请</template>
                        <el-menu-item-group>
                            <el-menu-item index="/excuse" default-active>请假条</el-menu-item>
                            <el-menu-item index="/apply">其他申请</el-menu-item>
                            <el-menu-item index="/applyList">我的申请</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-message-solid"></i>通知汇总</template>
                        <el-menu-item-group>
                            <el-menu-item index="/message">通知</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">优秀员工</template>
                        <el-menu-item-group>
                            <el-menu-item index="/exPerson">优秀员工展示</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <!-- main -->
            <el-main>
                <!--<el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>-->
                <el-card class="box-card">
                    <!--<div slot="header" class="clearfix">
                        <span>信息申请</span>
                    </div>-->

                    <div class="text item" >

                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{}">信息申请</el-breadcrumb-item>
                            <el-breadcrumb-item ><a href="/">请假条</a></el-breadcrumb-item>
                        </el-breadcrumb>
                        <el-divider></el-divider>

                        <el-form ref="form" :model="apply" label-width="80px">
                            <el-form-item label="请假原因">
                                <!--placeholder="10字以内"-->
                                <el-input v-model="apply.applyTitle" ></el-input>
                            </el-form-item>
                            <el-form-item label="请假类型">
                                <el-select v-model="apply.reason" placeholder="请选择请假类型">
                                    <el-option label="病假" value="病假"></el-option>
                                    <el-option label="事假" value="事假"></el-option>
                                    <el-option label="年休假" value="年休假"></el-option>
                                    <el-option label="出差" value="出差"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="apply.startTime"   style="width: 100%;"></el-date-picker>
                                </el-col>

                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="apply.endTime" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>

                            <el-form-item label="补充说明">
                                <el-input type="textarea" v-model="apply.tips"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitEx">立即发送</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>

                    </div>

                </el-card>
            </el-main>

        </el-container>

        <!-- footer -->
        <el-footer ></el-footer>

    </el-container>


</template>

<script>
    export default {
        data() {

            const item = {
                date: '2020-04-02',
                name: '王小虎',
                address: '广州市'
            };
            return {
                isSigned : false,
                data:'data',
                message:'message',
                tableData: Array(10).fill(item),
                apply: {
                    applyTitle: '',
                    reason: '',
                    startTime: '',
                    endTime: '',
                    tips: '',
                    applyType : 1,
                    userId : this.$session.get("myUserId"),
                    //this.$session.get("userId");
                    // station : 0,
                },
                att: {
                    attMember : '',
                    attTime : '',
                    attStatus: '',
                    attMemberId: this.$session.get("myUserId"),
                },
                memberName : '',
            };
        },
        methods: {

            topRedirect: function (str) {
                console.log(str);
                this.$router.push({path: str})
            },
            async submitEx() {
                let _this = this;
                if(this.apply.applyTitle == '' || this.apply.reason == ''
                    ||this.apply.startTime == ''||this.apply.endTime == ''||this.apply.tips == ''){
                    _this.$message({
                        message: '请填写信息',
                        type: 'warning'
                    });
                    return;
                }
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8083//applyPage/api/postApply',
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: JSON.stringify({
                        //_this.$session.get("userId");
                        apply: _this.apply,
                    })
                }).then(function (response) {
                    if (response.data == "fail") {
                        console.log("fail");
                    } else {
                        console.log("success");
                        _this.$message({
                            message: '提交成功，等待审核',
                            type: 'success'
                        });
                        _this.$router.push({path: '/home'});
                    }
                });
            },
            //检查是否签到
            async checkSigned(){
                //_this.$session.get("userId");
                // if(this.$session.get("isSigned") != null){
                //     _this.isSigned = true;
                //     return ;
                // }
                let _this = this;
                var nowDate = new Date();
                let date = {
                    year : nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                _this.systemDate =date.year + '-' + date.month + '-' + date.date;


                console.log( _this.systemDate);
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/recordPage/api/checkSign',
                    params:{
                        //_this.$session.get("userId");
                        userId : _this.$session.get("myUserId"),
                        data :  _this.systemDate,
                    }
                }).then(function(response){
                    console.log(response);
                    if(response.data == "success"){
                        console.log("success");
                    }else{
                        _this.isSigned = true;
                        console.log("fail");
                    }
                });
            },
            //签到按钮事件
            async signed(){

                let _this = this;
                var nowDate = new Date();
                let date = {
                    year : nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                _this.systemDate =date.year + '-' + date.month + '-' + date.date;
                _this.att.attTime = _this.systemDate;
                if(nowDate.getHours() < 10){
                    _this.att.attStatus = 1;
                }else{
                    _this.att.attStatus = 2;
                }

                _this.att.attMember = _this.memberName;
                console.log("test get username finish");
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/recordPage/api/signIn',
                    headers:{'Content-Type':'application/json;charset=UTF-8'},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    data:JSON.stringify({
                        //_this.$session.get("userId");
                        // att : this.att,
                        att : _this.att,
                    })
                }).then(function(response){
                    var index = response.data.indexOf(":");
                    if( response.data.substring(0,index) == 'fail'){
                        console.log("fail"+response.data.substring(index, response.data.length));
                    }else{
                        console.log(response.data);
                        _this.$message({
                            message: '签到成功',
                            type: 'success'
                        });
                        _this.isSigned = true;
                        // this.isSigned = true;
                        /* _this.$router.push({path:'/apply'});*/
                    }
                });
            },
            async initName (){
                console.log("test get username");
                let _this = this;
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8083/infoPage/api/postInfo',
                    params: {
                        // userId: _this.myUser.userId
                        userId : _this.$session.get("myUserId"),
                    }
                }).then(function (response) {
                    console.log(response.data);
                    if (response.data.userId == null) {
                        console.log('isNull')
                    } else {
                        console.log(response.data.name);
                        _this.memberName = response.data.name;
                    }
                });
                console.log("member Name is "+  _this.memberName);
            }
        },
        mounted: function () {
            if(this.$session.get("myUserId") == null){
                console.log("11111111");
                this.$message({
                    message: '发现你未登录系统，请先登陆',
                    type: 'warning'
                });
                this.$router.push({path: 'login'});
                return;
            }
            this.initName();
            this.checkSigned();
        }
    };



</script>

<style lang="less">
    .el-header {
        background-color: #3190e8;
        color: #333;
    }
    .el-footer {
        background-color: #3190e8;
        color: #333;
    }

    .el-aside {
        color: #333;
    }
    .el-avatar{
        margin: 10px 0px ;
        float: right;
    }

    .item {
        margin-top: 15px;
        margin-right: 00px;
    }
    #card-el-main{
        padding-top: 0px;
    }
</style>

