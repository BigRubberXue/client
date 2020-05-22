<template>

    <el-container>
        <el-header>
            <img src="../assets/img/logo.png"  style="margin-left: 30%" height="60px" width="60px"/>

            <img src="../assets/img/logo-adminText.png" height="60px" width="262.5px" style="margin-right: 30%"/>
        </el-header>
        <el-container id="mainController">
            <el-aside width="10%" > </el-aside>
            <el-main>
                <el-tabs type="border-card" v-model="model">
                    <el-tab-pane label="考勤记录" name="dataList">
                        <a style="margin-left:20px;font-size: xx-large">
                            考勤记录(个人)
                        </a>
                        <el-divider></el-divider>

                        <el-table
                                :data="attData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                                style="width: 100%">
                            <el-table-column
                                    prop="attMember"
                                    label="成员名称"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="attTime"
                                    label="时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="attStatus"
                                    label="状态">
                            </el-table-column>
                        </el-table>
                        <!--<el-pagination
                                :page-size="10"
                                :pager-count="10"
                                layout="prev, pager, next"
                                :total="1000">
                        </el-pagination>-->
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 100]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalNum">
                        </el-pagination>


                    </el-tab-pane>
                    <el-tab-pane label="申请列表" name="applyList">
                        <a style="margin-left:20px;font-size: xx-large">
                            申请列表
                        </a>
                        <el-divider></el-divider>

<!--                        <el-table-->
<!--                                :data="applyData.slice((currentPage-1)*pageSize,currentPage*pageSize)"-->
<!--                                style="width: 100%">-->
<!--                            <el-table-column-->
<!--                                    prop="applyTitle"-->
<!--                                    label="标题"-->
<!--                                    width="180">-->
<!--                            </el-table-column>-->
<!--                            <el-table-column-->
<!--                                    prop="reason"-->
<!--                                    label="原因"-->
<!--                                    width="180">-->
<!--                            </el-table-column>-->
<!--                            <el-table-column-->
<!--                                    prop="userId"-->
<!--                                    label="成员id">-->
<!--                            </el-table-column>-->
<!--                        </el-table>-->
<!--                        &lt;!&ndash;<el-pagination-->
<!--                                :page-size="10"-->
<!--                                :pager-count="10"-->
<!--                                layout="prev, pager, next"-->
<!--                                :total="1000">-->
<!--                        </el-pagination>&ndash;&gt;-->
<!--                        <el-pagination-->
<!--                                @size-change="handleSizeChange"-->
<!--                                @current-change="handleCurrentChange"-->
<!--                                :current-page="currentPage"-->
<!--                                :page-sizes="[10, 100]"-->
<!--                                :page-size="pageSize"-->
<!--                                layout="total, sizes, prev, pager, next, jumper"-->
<!--                                :total="totalNum">-->
<!--                        </el-pagination>-->
                        <el-table
                                :data="applyData"
                                style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand" v-show="props.row.applyType == 1">
                                        <el-form-item label="标题">
                                            <span>{{ props.row.applyTitle}}</span>
                                        </el-form-item>
                                        <el-form-item label="原因">
                                            <span>{{ props.row.reason}}</span>
                                        </el-form-item>
                                        <el-form-item label="成员 ID">
                                            <span>{{ props.row.userId}}</span>
                                        </el-form-item>
                                        <el-form-item label="tips">
                                            <span>{{ props.row.tips}}</span>
                                        </el-form-item>
                                        <el-form-item label="开始时间">
                                            <span>{{ props.row.startTime}}</span>
                                        </el-form-item>
                                        <el-form-item label="结束时间">
                                            <span>{{ props.row.endTime}}</span>
                                        </el-form-item>
                                    </el-form>
                                    <el-form label-position="left" inline class="demo-table-expand" v-show="props.row.applyType == 2">
                                        <el-form-item label="标题">
                                            <span>{{ props.row.applyTitle}}</span>
                                        </el-form-item>
                                        <el-form-item label="成员 ID">
                                            <span>{{ props.row.userId }}</span>
                                        </el-form-item>
                                        <el-form-item label="tips">
                                            <span>{{ props.row.tips }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="标题"
                                    prop="applyTitle">
                            </el-table-column>
                            <el-table-column
                                    label="原因"
                                    prop="reason">
                            </el-table-column>
                            <el-table-column
                                    label="成员 ID"
                                    prop="userId">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="props"><!-- slot-scope="props"-->
                                    <el-button
                                            size="mini"
                                            type="success"
                                            @click="agree(props.row.applyId, props.row.userId)">同意</el-button>
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="disagree(props.row.applyId)">拒绝</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                    </el-tab-pane>
                    <el-tab-pane label="发送消息" name="sendMsg">
                        <a style="margin-left:20px;font-size: xx-large">
                            发送消息
                        </a>
                        <el-divider></el-divider>
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="通知标题">
                                <el-input v-model="form.msgTitle" placeholder="请输入通知的标题"></el-input>
                            </el-form-item>
                            <el-form-item label="通知内容">
                                <el-input type="textarea" v-model="form.msg" placeholder="请输入通知的具体内容"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitMsg">立即发送</el-button>
                                <el-button @click="clearMsgForm">清空</el-button>
                            </el-form-item>
                        </el-form>
                        <div id="sendMsgTips">
                            <a>tips: 此处编辑的信息将发送到所有的公司员工账号上。
                            </a>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="员工添加" name="addMember">
                        <a style="margin-left:20px;font-size: xx-large">
                            员工添加
                        </a>
                        <el-divider></el-divider>
                        <el-form ref="form" :model="member" label-width="100px">
                            <el-form-item label="员工用户名" >
                                <el-input v-model="member.username" placeholder="请输入员工用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="员工密码">
                                <el-input type="textarea" v-model="member.password" placeholder="请输入员工密码"> </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitUser">添加用户</el-button>
<!--                                <el-button @click="resetForm('member')">清空</el-button>-->
                            </el-form-item>
                        </el-form>
                        <el-divider></el-divider>
                        <el-container>
                            <el-aside width="10%"></el-aside>
                            <el-main>
                                <el-table
                                        :data="userList.slice((userListSetting.currentPage-1)*userListSetting.pageSize,userListSetting.currentPage*userListSetting.pageSize)"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="name"
                                            label="成员名称"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="userId"
                                            label="成员id"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="username"
                                            label="用户名"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="station"
                                            label="工位">
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                        @size-change="handleSizeChangeUser"
                                        @current-change="handleCurrentChangeUser"
                                        :current-page="userListSetting.currentPage"
                                        :page-sizes="[10, 100]"
                                        :page-size="userListSetting.pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="userListSetting.totalNum">
                                </el-pagination>
                            </el-main>
                            <el-aside width="10%"></el-aside>
                        </el-container>


                        <div id="addMemberTips">
                            <a>tips: 员工id在上表显示，点击<el-link @click="visible = true">删除用户</el-link>
                                <el-dialog :visible.sync="visible" title="删除用户">
                                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                        <el-form-item label="用户名">
                                            <el-input v-model="formInline.username" placeholder="请输入删除用户的用户名"></el-input>
                                        </el-form-item>
                                        <el-form-item label="管理员密码">
                                            <el-input v-model="formInline.adminPas" placeholder="请输入管理员密码"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-popconfirm
                                                    title="确定需要删除吗？"
                                                    @onConfirm="delectUser"
                                            >

                                                <el-button type="danger" slot="reference" >删除</el-button>
                                            </el-popconfirm>
                                        </el-form-item>
                                        <!--<el-popover
                                                placement="top"
                                                width="160"
                                                v-model="visible">
                                            <p>这是一段内容这是一段内容确定删除吗？</p>
                                            <div style="text-align: right; margin: 0">
                                                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                                            </div>
                                            <el-button slot="reference">删除</el-button>
                                        </el-popover>-->
                                    </el-form>
                                </el-dialog>
                            </a>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="优秀员工" name="exPerson">
                        <a style="margin-left:20px;font-size: xx-large">
                            优秀员工评选
                        </a>
                        <el-button style="float: right; margin-top: 5px" @click="updateExPerson">更新结果</el-button>
                        <el-divider></el-divider>

                        <el-table
                                :data="exPerson.slice((exPersonDataSetting.currentPage-1)*exPersonDataSetting.pageSize,exPersonDataSetting.currentPage*exPersonDataSetting.pageSize)"
                                style="width: 100%">
                            <el-table-column
                                    prop="userId"
                                    label="用户id"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="signedTime"
                                    label="签到次数"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="mouth"
                                    label="月份"
                                    width="180">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @size-change="handleSizeChangeExPerson"
                                @current-change="handleCurrentChangeExPerson"
                                :current-page="exPersonDataSetting.currentPage"
                                :page-sizes="[10, 100]"
                                :page-size="exPersonDataSetting.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="exPersonDataSetting.totalNum">
                        </el-pagination>
                        <div id="exPersonTips">
                            <a>tips: 优秀员工评选标准为，当前月份签到最多的一名或多名员工。
                            </a>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="考勤记录(每日总结)" name="attData">
                        <a style="margin-left:20px;font-size: xx-large">
                            考勤记录(每日总结)
                        </a>
                        <el-button style="float: right; margin-top: 5px" v-bind:disabled="hasSub" @click="subToday">总结当日</el-button>
                        <el-divider></el-divider>
                        <el-table
                                :data="attSumData.slice((attSumDataSetting.currentPage-1)*attSumDataSetting.pageSize,attSumDataSetting.currentPage*attSumDataSetting.pageSize)"
                                style="width: 100%">
                            <el-table-column
                                    prop="attTime"
                                    label="日期"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="unsigned"
                                    label="未签到人数"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="signed"
                                    label="签到人数"
                                    width="180">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @size-change="handleSizeChangeAttSum"
                                @current-change="handleCurrentChangeAttSum"
                                :current-page="attSumDataSetting.currentPage"
                                :page-sizes="[10, 100]"
                                :page-size="attSumDataSetting.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="attSumDataSetting.totalNum">
                        </el-pagination>

                    </el-tab-pane>
                </el-tabs>

            </el-main>
            <el-aside width="10%" > </el-aside>
        </el-container>

        <el-footer></el-footer>
    </el-container>
</template>

<script>
    export default {
        data(){
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                visible: false,
                formInline: {
                    username : '',
                    adminPas:'',
                },
                form: {
                    msgTitle: '',
                    msg: '',
                    // userId : '',
                    //this.$session.get("userId");
                },
                member: {
                    username: '',
                    password: '',
                },
                tableData: Array(20).fill(item),
                currentPage: 1,//默认显示第一页
                pageSize:10,//默认每页显示10条
                totalNum: 1000,
                userListSetting:{
                    currentPage: 1,//默认显示第一页
                    pageSize:10,//默认每页显示10条
                    totalNum:10,
                },
                attSumDataSetting:{
                    currentPage: 1,//默认显示第一页
                    pageSize:10,//默认每页显示10条
                    totalNum:10,
                },
               exPersonDataSetting:{
                    currentPage: 1,//默认显示第一页
                    pageSize:10,//默认每页显示10条
                    totalNum:10,
                },
                model:'dataList',
                attData:[],
                applyData:[],
                userList:[],
                attSumData:[],
                exPerson:[],
                systemDate:'',
                hasSub: false,

            }
        },
        methods: {
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // },
            async onSubmit() {
            },
            //加载优秀员工
            async initExPerson(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/postExPerson',
                    /*params: {
                        username : this.loginForm.username,
                        password : this.loginForm.password
                    }*/
                }).then(function(response){
                    console.log(" response = "+response);
                    console.log(response);
                    if(response.data.length <= 0){
                        console.log("fail");
                    }else{
                        console.log("success");
                        for(var num = 0 ; num < response.data.length ; num++){
                            _this.exPerson.push({
                                userId: response.data[num].userId,
                                signedTime: response.data[num].signedTime,
                                name: response.data[num].name,
                                mouth : response.data[num].mouth ,
                            });
                        }
                        console.log("finish init "+response.data.length+" items about exPerson");
                        _this.exPersonDataSetting.totalNum=_this.exPerson.length;
                    }
                });
            },
            //考勤总结加载
            async initattData(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/getAttSum',
                    /*params: {
                        username : this.loginForm.username,
                        password : this.loginForm.password
                    }*/
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                    }else{
                        for(var num = 0 ; num < response.data.length ; num++){
                            _this.attSumData.push({
                                attDataId:response.data[num].attDataId,
                                attTime: response.data[num].attTime,
                                unsigned: response.data[num].unsigned,
                                signed: response.data[num].signed,
                            });
                        }
                        console.log("finish init "+response.data.length+" items about attSum");
                        _this.attSumDataSetting.totalNum=_this.attSumData.length;
                    }
                });
            },
            //考勤表加载
            async initData(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/postAtt',
                    /*params: {
                        username : this.loginForm.username,
                        password : this.loginForm.password
                    }*/
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                    }else{
                        for(var num = 0 ; num < response.data.length ; num++){
                            _this.attData.push({
                                attId:response.data[num].attId,
                                attMember: response.data[num].attMember,
                                attTime: response.data[num].attTime,
                                attStatus: response.data[num].attStatus==1?'已签到':'其他',
                                attMemberId:response.data[num].attMemberId,
                            });
                        }
                        console.log("finish init "+response.data.length+" items about att");
                        _this.totalNum=_this.attData.length;
                    }
                });
            },
            //用户表加载
            async initUserList(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/getUserList',
                    /*params: {
                        username : this.loginForm.username,
                        password : this.loginForm.password
                    }*/
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                    }else{
                        console.log('userList init');
                        for(var num = 0 ; num < response.data.length ; num++){
                            _this.userList.push({
                                userId:response.data[num].userId,
                                username: response.data[num].username,
                                password: response.data[num].password,
                                name: response.data[num].name,
                                station:response.data[num].station,
                                phone:response.data[num].phone,
                                mail:response.data[num].mail,
                            });
                        }
                        console.log("finish init "+response.data.length+" items about userList");
                        console.log(response.data);
                        _this.userListSetting.totalNum = response.data.length;
                    }
                });
            },
            //申请表加载
            async initApplyList(){
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
                        for(var num = 0 ; num < response.data.length ; num++){
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
                    }
                });
            },

            ////操作类
            //提交消息通知
            async submitMsg(){
                let _this = this;
                if(this.form.msgTitle == ''|| this.form.msg == ''){
                    _this.$message({
                        message: '填写正确信息',
                        type: 'warning'
                    });
                    return;
                }
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
                        msgTitle : _this.form.msgTitle,
                        msg : _this.form.msg,
                        msgTime : date.year + '-' + date.month + '-' + date.date,
                    }
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                    }else{
                        console.log(response.data+' in sendMsg');
                        _this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        _this.clearMsgForm();
                        // _this.userList = [];
                    }
                });
            },
            //添加用户
            async submitUser(){
                let _this = this;
                if(_this.member.username == '' || _this.member.password == ''){
                    _this.$message({
                        message: '错误信息填写',
                        type: 'warning'
                    });
                    return;
                }
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/addMember',
                    params: {
                        username : _this.member.username,
                        password : _this.member.password,
                    }
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                    }else{
                        console.log(response.data+' in addMember');
                        _this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        _this.member.username='';
                        _this.member.password='';
                        _this.userList = [];
                        _this.initUserList();
                    }
                });
            },
            //删除用户
            async delectUser(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/deleteMember',
                    params: {
                        username : _this.formInline.username,
                        adminPas : _this.formInline.adminPas,
                    }
                }).then(function(response){
                    if(response.data.length <= 0){
                        console.log("fail");
                    }else{
                        console.log(response.data+' in deleteMember');
                        _this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        _this.visible = false;
                        _this.userList = [];
                        _this.initUserList();
                    }
                });
            },
            //同意申请
            async agree(index, userId){
                console.log("id: "+index);
                let _this = this;
                var nowDate = new Date();
                let date = {
                    year : nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/agreeApply',
                    params: {
                        applyId : index,
                        msgTime: date.year + '-' + date.month + '-' + date.date,
                        userId: userId,
                    }
                }).then(function(response){
                    if(response.data == null){
                        console.log("fail");
                    }else{
                        _this.$message({
                            message: '已同意申请',
                            type: 'success'
                        });
                        _this.applyData = [];
                        _this.initApplyList();
                    }
                });
            },
            //拒绝申请
            async disagree(index){
                console.log("id: "+index);
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/disagreeApply',
                    params: {
                        applyId : index,
                    }
                }).then(function(response){
                    if(response.data == null){
                        console.log("fail");
                    }else{
                        _this.$message({
                            message: '已拒绝申请',
                            type: 'warning'
                        });
                        _this.applyData = [];
                        _this.initApplyList();
                    }
                });
            },
            //总结今日考勤
            async subToday(){
                let _this = this;
                var nowDate = new Date();
                let date = {
                    year : nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/subToday',
                    params: {
                        date : date.year + '-' + date.month + '-' + date.date,
                    }
                }).then(function(response){
                    console.log(response);
                    _this.hasSub = true;
                    _this.attSumData = [];
                    _this.initattData();
                });
            },
            //更新优秀员工
            async updateExPerson(){
                let _this = this;
                var nowDate = new Date();
                let date = {
                    year : nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                this.$axios({
                    method:'post',
                    url:'http://localhost:8083/admin/api/updateExPerson',
                    params: {
                        // date : date.year + '-' + date.month + '-' + date.date,
                        date : date.month,
                    }

                }).then(function(response){
                    console.log(response);
                    _this.hasSub = true;
                    _this.exPerson = [],
                    _this.initExPerson();
                });
            },
            //页面加载
            async init(){
                let _this = this;
                switch(_this.$route.query.model) {
                    case 'applyList':
                        _this.model = 'applyList';
                        break;
                    case 'sendMsg':
                        console.log('1111111')
                        _this.model = 'sendMsg';
                        break;
                    case 'addMember':
                        _this.model = 'addMember';
                        break;
                    default:
                        _this.model = 'dataList';
                }
                console.log(_this.$route.query.model)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;    //动态改变
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;//动态改变
            },
            handleSizeChangeUser(val) {
                console.log(`每页 ${val} 条`);
                this.userListSetting.pageSize = val;    //动态改变
            },
            handleCurrentChangeUser(val) {
                console.log(`当前页: ${val}`);
                this.userListSetting.currentPage = val;//动态改变
            },
            handleSizeChangeAttSum(val) {
                console.log(`每页 ${val} 条`);
                this.attSumDataSetting.pageSize = val;    //动态改变
            },
            handleCurrentChangeAttSum(val) {
                console.log(`当前页: ${val}`);
                this.attSumDataSetting.currentPage = val;//动态改变
            },
            handleSizeChangeExPerson(val) {
                console.log(`每页 ${val} 条`);
                this.exPersonDataSetting.pageSize = val;    //动态改变
            },
            handleCurrentChangeExPerson(val) {
                console.log(`当前页: ${val}`);
                this.exPersonDataSetting.currentPage = val;//动态改变
            },
            clearMsgForm(){
                this.form.msg = '';
                this.form.msgTitle = '';
            },
            clearUserForm(){
                this.member.username='';
                this.member.password='';
            },
            adminSubmit(){

            }
        },
        mounted: function () {
            this.init();
            this.initData();
            this.initApplyList();
            this.initUserList();
            this.initattData();
            this.initExPerson();
        }
    }
</script>
<style lang="less">
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    #mainController {
        background-image: url("../assets/img/bg_2.jpg");
        background-repeat: no-repeat;
        min-height: 600px;
    }
    #addMemberTips {
        margin-left: 40px;
        font-size: medium;
        color: #979b9d;
    }
    #sendMsgTips {
        margin-left: 40px;
        font-size: medium;
        color: #979b9d;
    }
    #exPersonTips{
        margin-left: 40px;
        font-size: medium;
        color: #979b9d;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

</style>