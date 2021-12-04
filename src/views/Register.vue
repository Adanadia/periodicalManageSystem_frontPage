<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules2"
             status-icon
             ref="ruleForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">注册</h3>
      <el-form-item prop="usernum">
        <el-input type="text"
                  v-model="ruleForm.usernum"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm.username"
                  auto-complete="off"
                  placeholder="昵称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="useremail">
        <el-input type="email"
                  v-model="ruleForm.useremail"
                  auto-complete="off"
                  placeholder="邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwordConfirm">
        <el-input type="password"
                  v-model="ruleForm.passwordConfirm"
                  auto-complete="off"
                  placeholder="重复密码密码"
        ></el-input>
      </el-form-item>
        <el-checkbox v-model="checked" class="verifing" style="color: black">
          同意用户协议
        </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:100%;"
                   :loading="registering"
                   @click.once="handleSubmit"
                   round
        >确认注册</el-button>
      </el-form-item>
        <i class="el-icon-back" style="width: 100%" ><el-link href="/login"
        style="color: black">返回</el-link> </i>
    </el-form>
  </div>
</template>

<script>
export default {
  props:true,
  data(){
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    var passwordLenthValiddator = (rule,value,callback)=>{
      if(value.length < 8 ){
        callback(new Error("密码长度太短请重新输入"))
      }else{
        callback();
      }
    }
    var passwordValiddator = (rule,value,callback)=>{
      if(value === ''){
        callback(new Error('请再次输入密码'));
      }else if(value !== this.ruleForm.password){
        callback(new Error('密码不统一，请重新输入'));
      }else {
        callback();
      }
    }
    return {
      registering:false,
      ruleForm: {
        usernum: '',
        username: '',
        useremail:'',
        password:'',
        passwordConfirm:''
      },
      rules2: {
        usernum: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        username: [{required: true, message: '昵称不能为空', trigger:'blur'}],
        useremail: [{required: true, message: '邮箱不能为空', trigger:'blur'},
          {validator: checkEmail,trigger: 'blur'}],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {validator: passwordLenthValiddator,trigger: 'blur'}],
        passwordConfirm: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {validator: passwordValiddator,trigger: 'blur'}]
      },
      checked: false
    }
  },
  mounted:function (){
  },
  methods: {
    handleSubmit:function (){
      this.$refs.ruleForm.validate((valid) => {
        if(valid && this.checked === true) {
          this.axios.post("/userlogin/register",{
            user_num:this.ruleForm.usernum,
            user_name:this.ruleForm.username,
            password:this.ruleForm.password,
            email:this.ruleForm.useremail
          }).then(response=>{
            if(response.data.status === 0){
              this.registering = true
              this.$alert("注册成功", '提示', {confirmButtonText: '确定'})
              this.$router.push(
                  {
                    path: '/login',
                    query:{
                      userFormNum:this.ruleForm.usernum
                    }
                  }
              )
            }else{
              this.registering = false
              this.$alert(response.data.msg, '提示', {confirmButtonText: '尝试重新注册'})
            }
          })
        }
        else{
          if(this.checked === false){
            this.$alert("请同意用户协议", '提示', {confirmButtonText: '尝试重新注册'})
          }else{
            this.$alert("请查看输入表单是否正确", '提示', {confirmButtonText: '尝试重新注册'})
          }
        }
        }
      )
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
label.el-checkbox.verifing {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>