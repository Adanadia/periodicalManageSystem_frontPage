<template>
  <div>
    <div v-for="i in [1,2]" :key="i">
      <el-row>
        <div style="visibility: hidden">helloworld</div>
      </el-row>
    </div>
    <el-card shadow="always">
      <el-row>
        <el-col :span="6">
          <div style="visibility: hidden">helloworld</div>
        </el-col>
        <el-col :span="12">
          <el-tabs tab-position="left" style="height: 500px;">
            <el-tab-pane label="增订">
              <el-col :span="24">
                <el-card class="box-card">
                  <el-form ref="form" :model="Form1" label-width="80px" label-position="right" size="big">
                    <el-form-item label="期刊名称">
                      <el-input v-model="Form1.periodical_name" ></el-input>
                    </el-form-item>
                    <el-form-item label="CN编号">
                      <el-input v-model="Form1.CN"></el-input>
                    </el-form-item>
                    <el-form-item label="邮发代号">
                      <el-input v-model="Form1.mailing_code"></el-input>
                    </el-form-item>
                    <el-form-item label="ISSN">
                      <el-input v-model="Form1.ISSN"></el-input>
                    </el-form-item>
                    <el-form-item label="征订年份">
                      <el-input v-model="Form1.subscription_year" ></el-input>
                    </el-form-item>
                    <el-form-item label="期刊性质">
                      <el-checkbox-group v-model="Form1.type">
                        <el-checkbox-button label="人文类期刊" name="type"></el-checkbox-button>
                        <el-checkbox-button label="科技类期刊" name="type"></el-checkbox-button>
                        <el-checkbox-button label="自然科学类期刊" name="type"></el-checkbox-button>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="出版周期">
                      <el-radio-group v-model="Form1.public_cycle" size="medium">
                        <el-radio border value="年刊" label="年刊"></el-radio>
                        <el-radio border label="月刊"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item size="large">
                      <el-button type="primary" @click="Submit1">立即增订</el-button>
                      <el-button>取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="入库"><el-col :span="24">
              <el-card class="box-card">
                <el-form ref="form" :model="Form2" label-width="80px" label-position="right" size="big">
                  <el-form-item label="邮发代号">
                    <el-input v-model="Form2.mailing_code"></el-input>
                  </el-form-item>
                  <el-form-item label="期">
                    <el-input v-model="Form2.stage"></el-input>
                  </el-form-item>
                  <el-form-item label="期刊押金">
                    <el-input v-model="Form2.deposit"></el-input>
                  </el-form-item>
                  <el-form-item size="large">
                    <el-button type="primary" @click="Submit2">立即入库</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="6">
          <div style="visibility: hidden">helloworld</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AdminOperate",
  data() {
    return {
      Form1: {
        mailing_code: '',
        ISSN : '',
        CN: '',
        subscription_year : '',
        periodical_name: '',
        public_cycle: '',
        delivery: false,
        type: [],//不需要传
        desc: ''//不需要传
      },
      Form2 :{
        mailing_code : '',
        stage : '',
        deposit : '',
        delivery: false,
      }
    };
  },
  methods: {
    Submit1(){
      this.axios.post('/admin/subscribe',{
        mailing_code:this.Form1.mailing_code,
        ISSN:this.Form1.ISSN,
        CN:this.Form1.CN,
        subscription_year:this.Form1.subscription_year,
        periodical_name:/《(.*)》/.test(this.Form1.periodical_name)?this.Form1.periodical_name:'《'+this.Form1.periodical_name+'》',
        public_cycle:this.Form1.public_cycle
      }).then(response=>{
        if(response.data.status === 0){
          this.$message.success("征订成功");
          this.$router.go(0);
        }else{
          if(response.data.status === 10){
            this.$message.error(response.data.msg)
            localStorage.clear();
            setTimeout(()=>{
              this.$router.push({
                path:'/admin'
              },1000)
            })
          }else if(response.data.status === 1){
            this.$message.error(response.data.msg)
            setTimeout(()=>{
              this.$router.go(0);
            },1500)
          }
        }
      })
    },
    Submit2(){
      this.axios.post('/admin/bookcomes',{
        mailing_code:this.Form2.mailing_code,
        stage:this.Form2.stage,
        deposit:this.Form2.deposit
      }).then(response=>{
        if(response.data.status === 0){
          this.$message.success("入库成功");
          this.$router.go(0);
        }else{
          if(response.data.status === 1){
            this.$message.error(response.data.msg)
          }else if(response.data.status===10){
            this.$message.error(response.data.msg)
            localStorage.clear();
            setTimeout(()=>{
              this.$router.push({
                path:'/admin'
              },1000)
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>