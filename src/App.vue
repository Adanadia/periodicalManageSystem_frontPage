<template>
  <div v-clock>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header class="header">{{message}}</el-header>
        <el-main>
          <el-row>
            <el-col :span="24" style="text-align:center">
              <h1>登录</h1>
              <el-input v-model="username" placeholder="用户名"></el-input>
              <el-input v-model="password" placeholder="密码"></el-input>
              <el-button type="primary" @click="login">登录</el-button>

              <el-button type="primary" @click="userinfo">获取用户信息</el-button>
              <br/>
              {{userinfojson}}
            </el-col>
          </el-row>
        </el-main>
        <el-footer class="header">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'app',
  components: {
  },
  data: ()=>({
    message:"rua",
    username:"",
    password:"",
    userinfojson:null,
  }),

  mounted:function(){
    let token = localStorage.getItem("token")
    if(token != null){
      this.axios.defaults.headers.common['Authorization'] = token;
      console.log("token loaded")
    }
  },
  methods:{
    login:function(){
      this.axios.post("http://192.168.43.195:8081/userLogin",
      {
        user_num:this.username,
        password:this.password
      }
      ).then(data => {
        console.log(data)
        this.message = data.data.msg
        localStorage.setItem("token",data.data.data.authorization)
        this.axios.defaults.headers.common['Authorization'] = data.data.data.authorization;
      })
    },
    userinfo: function(){
      this.axios.get("http://192.168.43.195:8081/information").then(data => {
        console.log(data)
        this.userinfojson = data.data
      })
    }
  }
}

</script>

<style>
[v-clock]{
  display: none;
}
.header{
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

body{
  padding: 0px;
  margin:0px;
}
</style>
