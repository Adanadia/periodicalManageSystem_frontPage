<template>
  <div class="login-container">
    <el-form :model="ruleForm2" :rules="rules2"
             status-icon
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">期刊借阅系统登录</h3>
      <el-form-item prop="usernum">
        <el-input type="text"
                  v-model="ruleForm2.usernum"
                  auto-complete="on"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  auto-complete="new-password"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme" style="color: black">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:45%;"
                   @click.once="handleSubmit"
                   :loading="logining"
                   round
        >登录</el-button>
        <el-button type="primary"
                   style="width:45%;"
                   @click.once="register"
                   round
        >注册</el-button>
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
          }).then(data => {
            if (data.data.status === 0) {
              this.logining = true
              localStorage.setItem("token", data.data.data.authorization)
              // this.axios.defaults.headers.common['Authorization'] = token
              this.$router.push({path: '/main'})
            } else {
              this.logining = false
              this.$alert(data.data.msg, '提示', {
                confirmButtonText: '重新登录'
              })
            }
          })
        }else{
          this.$alert("请输入用户名或密码", '提示', {confirmButtonText: '重试'})
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
    width: 350px;
    padding: 35px 35px 15px;
    background-color: rgba(81, 136, 136, 0.25);
    border: 1px solid #5188883F;
    box-shadow: 0 0 25px #5188883F;

  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>