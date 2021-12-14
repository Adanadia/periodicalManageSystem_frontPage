<template>
  <div class="login-container">
    <el-form :model="ruleForm2" :rules="rules2"
             status-icon
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">期刊借阅系统登录</h3>
      <el-divider></el-divider>
      <el-form-item prop="usernum">
        <el-input type="text"
                  v-model="ruleForm2.usernum"
                  auto-complete="on"
                  placeholder="用户名"
                  suffix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  auto-complete="new-password"
                  placeholder="密码"
                  suffix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col span="16">
          <el-checkbox v-model="checked" class="rememberme" style="color: black">记住密码</el-checkbox>
        </el-col>
        <el-col span="8">
          <el-button type="primary"
                     style="width:100%;"
                     @click.once="handleSubmit"
                     :loading="logining"

          >登录</el-button>
        </el-col>
      </el-row>
      <el-form-item style="width:100%;margin-bottom: 0px">
        <a @click.once="register" style="color: #1482f0" href="#">
          注册新账号
        </a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      logining: false,
      ruleForm2: {
        usernum: '',
        password: '',
      },
      rules2: {
        usernum: [{required: true, message: '请输入你的账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入你的密码', trigger: 'blur'}]
      },
      checked: false
    }
  },
  mounted:function (){
    this.ruleForm2.usernum = this.$route.query.userFormNum
  },
  methods: {
    handleSubmit:function (){
      this.$refs.ruleForm2.validate((valid) => {
        if(valid) {
          this.axios.post('/userlogin', {
            user_num: this.ruleForm2.usernum,
            password: this.ruleForm2.password
          }).then(response => {
            if (response.data.status === 0) {
              this.logining = true
              localStorage.setItem("token", response.data.data.authorization)
              // this.axios.defaults.headers.common['Authorization'] = token
              this.$router.push({path: '/main'})
              this.$router.go(0)
            } else {
              this.logining = false
              this.$alert(response.data.msg, '提示', {
                confirmButtonText: '重新登录',
                callback:action => {
                  action.at(0)
                  this.$router.go(0)
                }
              })
            }
          })
        }else{
          this.$alert("请输入用户名或密码", '提示', {
            confirmButtonText: '重试',
            callback:action => {
              action.at(0)
              this.$router.go(0)
            }
          })
        }
      })
    },
    register:function (){
      this.$router.push({path:'/register'})
    }
  }
};
</script>

<style scoped>
  .login-container {
    background-image: url("../assets/login/loginImg.jpg");
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1502;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 280px;
    padding: 35px 35px 15px;
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid #5188883F;
    box-shadow: 0 0 25px #5188883F;

  }
  label.el-checkbox.rememberme {
    margin-top: 10px;
    text-align: left;
  }
  .title{
    margin-top: 0px !important;
    text-align: center;
    font-weight: normal;
    font-size: 150%;

  }
</style>