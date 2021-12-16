<template>
  <div>
    <div v-for="i in [1,2,3,4,5,6]" :key="i">
      <el-row>
        <div style="visibility: hidden">helloworld</div>
      </el-row>
    </div>
    <el-row>
      <el-col :span="8"><div style="visibility: hidden">helloworld</div></el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <h2 style="text-align: center">期刊管理员登录</h2>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="管理员账号" prop="account">
              <el-input v-model="ruleForm.account" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8"><div style="visibility: hidden">helloworld</div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data(){
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      callback()
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback()
    };
    return {
      i:"0",
      ruleForm: {
        account:'',
        pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/admin',{
            id:this.ruleForm.account,
            password:this.ruleForm.pass
          }).then(response => {
            if(response.data.status === 0){
              localStorage.setItem("token", response.data.data.authorization)
              this.$router.push({
                path:'/admin/index'
              })
              this.$router.go(0);
            }else{
              this.$message.error("登录错误，请确实管理员身份")
              this.$router.go(0);
            }
          })
        } else {
          this.$message.error("验证失败请确认输入是否有误")
          this.$router.go(0);
        }
      });
    }
  }
}
</script>

<style scoped>

</style>