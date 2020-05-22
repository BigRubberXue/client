<template>
    <div id="mainHeader" class="el-header">
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: 'data',
                excuse: 'excuse',
                message: 'message',
            }
        },
        methods: {
            topRedirect: function (str) {
                console.log(str);
                this.$router.push({path: str})
            }
        }
    }
</script>

<style scoped>

</style>