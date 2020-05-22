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
                <el-menu :default-openeds="['4']" router :default-active="$route.path">
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
                            <el-menu-item index="/message"  default-active >通知</el-menu-item>
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
                            <el-breadcrumb-item :to="{}">通知汇总</el-breadcrumb-item>
                            <el-breadcrumb-item ><a href="/message">通知</a></el-breadcrumb-item>
                        </el-breadcrumb><el-divider></el-divider>
                        <div>
                            <el-container>

                                <el-aside width="15%"></el-aside>
                                <el-main class="newDetail">

                                    <div class=" msgTitle " >{{newsDetail.msgTitle}}</div>
                                    <div class=" subtitle " v-text="'发布于:'+newsDetail.msgTime"></div>
                                    <div class=" msg " v-text="newsDetail.msg"></div>
                                    <div class=" msgTime " v-text="newsDetail.msgTime"></div>

                                </el-main>
                                <el-aside width="15%"></el-aside>

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
                excuse:'excuse',
                message:'message',
                tableData: Array(10).fill(item),
                // paramsId : this.$route.query.id,
                newsDetail:{
                    msgId:'id',
                    msgTitle: 'msgTitle',
                    msg:'msg',
                    msgTime:'msgTime'
                },
                att: {
                    attMember : '',
                    attTime : '',
                    attStatus: '',
                    attMemberId: this.$session.get("myUserId"),
                },
                memberName : '',
            }
        },
        methods: {
            topRedirect:function (str) {
                console.log(str);
                this.$router.push({path:str})
            },
            async initMsg() {
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/newsPage/api/postMsg',
                    params:{
                        msgId: _this.$route.query.msgId
                    }
                    /*params: {
                        username : _this.loginForm.username,
                        password : _this.loginForm.password
                    }*/
                }).then(function(response){
                    if(response.data.length < 0){
                        console.log("fail");
                    }else{

                        _this.newsDetail.msgId = response.data.msgId;
                        _this.newsDetail.msg = response.data.msg;
                        _this.newsDetail.msgTime = response.data.msgTime;
                        _this.newsDetail .msgTitle = response.data.msgTitle;

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
            },
            async hasRead(){
                let _this = this;
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8083/newsPage/api/hasRead',
                    params: {
                        // userId: _this.myUser.userId
                        msgId: _this.$route.query.msgId
                    }
                }).then(function (response) {
                    console.log(response.data);
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
            this.initMsg();
            this.initName();
            this.checkSigned();
            this.hasRead();
        }
    };
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

    .newDetail{

        position: relative;
    }
    .msgTitle {
        font-size: xx-large;
        text-align: center;
    }
    .subtitle {
        text-align: center;
        font-size: medium;
        margin-bottom: 30px;
    }
    .msg {

        font-size: larger;
    }
    .msgTime {
        margin-top: 100px;
        float: right;

    }


</style>

