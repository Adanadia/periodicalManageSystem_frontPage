<template>
  <div>
    <div v-for="i in [1,2,3,4,5]" :key="i">
      <el-row>
        <div style="visibility: hidden">{{i}}</div>
      </el-row>
    </div>
    <el-row>
      <el-col :span="6">
        <div style="visibility: hidden">HelloWorld</div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="按用户查询(输入账号)" value="1"></el-option>
              <el-option label="按期刊查询(输入期刊完整名字)" value="2"></el-option>
            </el-select>
            <el-button @click="searchFun" slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
      </el-col>
    </el-row>
    <el-row>
      <div style="visibility: hidden">Helloworld</div>
    </el-row>
    <el-row>
      <div style="visibility: hidden">Helloworld</div>
    </el-row>
    <el-row>
      <el-col :span="4" style="visibility: hidden">Helloworld</el-col>
      <el-col :span="16">
        <div v-if="select==='1'">
          <div v-for="(bookList,index) in bookDesList" v-bind:key="index">
            <el-descriptions class="margin-top" title="" :column="3" :size="size">
              <el-descriptions-item label="期刊名">{{ bookList.periodicalName }}</el-descriptions-item>
              <el-descriptions-item label="年">{{ bookList.year }}</el-descriptions-item>
              <el-descriptions-item label="卷">{{ bookList.volume }}</el-descriptions-item>
              <el-descriptions-item label="期">{{ bookList.stage }}</el-descriptions-item>
              <el-descriptions-item label="借阅时间">{{bookList.borrowDate}}</el-descriptions-item>
              <el-descriptions-item label="应还时间">{{bookList.dueDate}}</el-descriptions-item>
            </el-descriptions>
            <el-divider><i class="el-icon-more"></i></el-divider>
          </div>
        </div>
        <div v-else-if="select==='2'">
          <div v-for="(user,index) in userList" v-bind:key="index">
            <el-descriptions class="margin-top" title="" :column="3" :size="size">
              <el-descriptions-item label="借阅者">{{ user.userName }}</el-descriptions-item>
              <el-descriptions-item label="年">{{ user.year }}</el-descriptions-item>
              <el-descriptions-item label="卷">{{ user.volume }}</el-descriptions-item>
              <el-descriptions-item label="期">{{ user.stage }}</el-descriptions-item>
              <el-descriptions-item label="借阅时间">{{user.borrowDate}}</el-descriptions-item>
              <el-descriptions-item label="应还时间">{{user.dueDate}}</el-descriptions-item>
            </el-descriptions>
            <el-divider><i class="el-icon-more"></i></el-divider>
          </div>
        </div>
        <div v-else-if="select==='2'">
        </div>
      </el-col>
      <el-col :span="4" style="visibility: hidden">Helloworld</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "GoPage",
  data(){
    return {
      column: '',
      size: '',
      select:"0",
      searchContent:'',
      bookDesList:[],
      userList:[]
    };
  },
  methods:{
    searchFun:function (){
      if(this.select === "0"){
        this.$message.info("请选择查询方式")
        setTimeout(()=>{
          this.$router.go(0);
        },1500)
      }else{
        if(this.select === "1"){
          this.axios.get(`/bookdestination/search/${this.searchContent}/${this.select}`).then(response=>{
            if(response.data.status === 0){
              this.bookDesList = response.data.data.bookDestination_userList;
            }else{
              this.$message.error("查询错误")
              setTimeout(()=>{
                this.$router.go(0);
              },1500)
            }
          })
        }
        if(this.select === "2"){
          this.searchContent = /《(.*)》/.test(this.searchContent)?this.searchContent:'《'+this.searchContent+'》'
          this.axios.get(`/bookdestination/search/${this.searchContent}/${this.select}`).then(response=>{
            if(response.data.status === 0){
              this.userList = response.data.data.bookDestination_periodicalPageVOList;
            }else{
              this.$message.error("查询错误")
              setTimeout(()=>{
                this.$router.go(0);
              },1500)
            }
          })
        }
      }
    }
  }
}

</script>

<style scoped>

</style>