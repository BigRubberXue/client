<template>
    <el-container style="border: 1px solid #eee">
        <!--  Header  -->
        <el-header id="mainHeader">
            <a style="height: 60px; width: 500px">
                <img src="../assets/img/logo.png" style="margin-left: 50px;" height="60px" width="60px"/>
                <img src="../assets/img/logo-titleText.png" height="60px" width="210px"/>
            </a>
            <a href="/info"><el-avatar style="background-color: #B3C0D1;"> user </el-avatar></a>
            <el-row style="margin: 10px; float: right">
                <el-button type="primary" icon="el-icon-edit" @click="topRedirect(excuse)" circle></el-button>
                <el-button type="success" icon="el-icon-s-data" @click="topRedirect(data)" circle></el-button>
                <el-button type="warning" icon="el-icon-star-off" @click="topRedirect(message)" circle></el-button>
            </el-row>
            <el-button v-bind:disabled="isSigned" @click="signed" style="margin: 10px; float: right">签到</el-button>

        </el-header>

        <!-- mid Page -->
        <el-container style="min-height: 600px">
            <!-- aside -->
            <el-aside id="mainAside" width="20%" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['2']" router :default-active="$route.path">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-s-home"></i>首页</template>
                        <el-menu-item-group>
                            <el-menu-item index="/home">首页</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>个人数据</template>
                        <el-menu-item-group>
                            <el-menu-item index="/info" default-active >个人信息</el-menu-item>
                            <el-menu-item index="/data">考勤记录</el-menu-item>
                            <el-menu-item index="/attSum">考勤总结</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-order"></i>信息申请</template>
                        <el-menu-item-group>
                            <el-menu-item index="/excuse">请假条</el-menu-item>
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
                        <span>个人数据</span>
                    </div>-->

                    <div class="text item" >

                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{}">个人数据</el-breadcrumb-item>
                                <el-breadcrumb-item ><a>个人信息</a></el-breadcrumb-item>
                            </el-breadcrumb>
                            <el-divider></el-divider>
                        <div>
                            <el-container >
                                <el-aside width="10%"></el-aside>
                                <el-main width="80%">

                                    <el-container id="infoCard">

                                            <el-aside id="dataUser" width="50%" style="float: left">

                                                <div id="infoCard-dataUser-info" >
                                                    <el-form label-width="100%" label-position="top">
                                                        <el-form-item label="名称" class="dataShowForm">
                                                            <label class="dataShowLabel"  v-text="myUser.name"> </label>
                                                        </el-form-item>
                                                        <el-form-item label="工位" class="dataShowForm">
                                                            <label class="dataShowLabel" v-text="myUser.station">  </label>
                                                        </el-form-item>
                                                        <el-form-item label="联系方式" class="dataShowForm">
                                                            <label class="dataShowLabel" v-text="myUser.phone"></label>
                                                        </el-form-item>
                                                        <el-form-item label="工作邮箱" class="dataShowForm">
                                                            <label class="dataShowLabel" v-text="myUser.mail"></label>
                                                        </el-form-item>

                                                    </el-form>

                                                </div>
                                            </el-aside>
                                            <el-aside id="imgUser" width="50%" >
                                                <img id="infoCard-imgUser-img" src="../assets/img/logo.png" />
                                                <el-button id="changeData" @click="rewriteInfo"> 修改信息</el-button>
                                            </el-aside>


                                        </el-container>

                                </el-main>


                                <el-aside width="10%"></el-aside>
                            </el-container>
                        </div>

                    </div>




                </el-card>
            </el-main>

        </el-container>

        <!-- footer -->
        <el-footer id="mainFooter"></el-footer>

    </el-container>


</template>

<script>
    import apiTop from '@/components/apiTop'
    export default {
        data() {
            const item = {
                date: '2020-04-02',
                name: '王小虎',
                address: '广州市'
            };
            return {
                isSigned : false,
                data: 'data',
                excuse: 'excuse',
                message: 'message',
                user: {
                    name: '王小虎',
                    station: '7f-1010',
                    phone: '13512345678',
                    mail: '123456789@mail.com'
                },
                myUser: {
/*                  userId: '',
                    username: '',
                    password: '',*/
                    name: '',
                    station: '',
                    phone: '',
                    mail: '',
                },
                components: {
                    'app-top': apiTop
                },
                att: {
                    attMember : '',
                    attTime : '',
                    attStatus: '',
                    attMemberId: this.$session.get("myUserId"),
                },
                tableData: Array(10).fill(item),
                datatext: '123456789@qq.com',
                memberName : '',
            }
        },
        methods: {
            topRedirect: function (str) {
                console.log(str);
                this.$router.push({path: str})
            },
            rewriteInfo() {
                this.$router.push({path: 'rewriteInfo'})
            },
            async initUser() {
                let _this = this;
                _this.myUser.userId = _this.$session.get("myUserId");
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8083/infoPage/api/postInfo',
                    params: {
                        // userId: _this.myUser.userId
                        userId : _this.$session.get("myUserId"),
                    }
                }).then(function (response) {
                    if (response.data.userId == null) {
                        console.log('isNull')
                    } else {
                        console.log(response.data.name);
/*                      _this.myUser.userId = response.data.userId;
                        _this.myUser.username = response.data.username;
                        _this.myUser.password = response.data.password;*/
                        _this.myUser.name = response.data.name == null ? '未填写': response.data.name ;//
                        _this.myUser.station = response.data.station == null ? '未填写': response.data.station;
                        _this.myUser.phone = response.data.phone == null ? '未填写': response.data.phone;
                        _this.myUser.mail = response.data.mail == null ? '未填写': response.data.mail;
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

                _this.att.attMember = _this.myUser.name;
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
                    if( response.data.substring(0,index) == 'fail' ){
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
            this.initUser();
            this.checkSigned();
        }
    }

</script>

<style lang="less">
    #mainHeader {
        background-color: #3190e8;
        color: #333;
    }
    #mainFooter {
        background-color: #3190e8;
        color: #333;
    }

    #mainAside {
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
    #infoCard{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    #dataUser{
        float: left;
    }
    #imgUser{
        float: right;
        position: relative;
    }
    #infoCard-imgUser-img{
        position: absolute;
        border-radius: 50%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        top: 10%;
        left: 25%;
        width: 50%;
        height: auto;
    }
    #infoCard-dataUser-info{
        margin: 50px 00px 50px 50px;
        line-height:4.0;
        font-size: 17px;

    }

    .dataShowLabel {
        font-size: xx-large;
        vertical-align:bottom;
        word-wrap: break-word;

    }
    .dataShowForm {
        font-size: small;
        vertical-align : bottom;
    }
    #changeData {
        position: absolute;
        top: 70%;
        left: 30%;
        width: 40%;
        height: 10%;
    }



</style>

