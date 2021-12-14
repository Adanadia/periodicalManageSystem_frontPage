<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-card
            class="card borrow-card"
            shadow="hover"
            style="margin-top: 5px"
            :body-style="{ padding: '10px' }">
          <el-table
              :data="periodicalData.filter(data => !search || data.periodicalName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
            <el-table-column
                label="期刊名字"
                prop="periodicalName">
            </el-table-column>
            <el-table-column
                label="卷"
                prop="volume">
            </el-table-column>
            <el-table-column
                label="年"
                prop="year">
            </el-table-column>
            <el-table-column
                label="期"
                prop="stage">
            </el-table-column>
            <el-table-column
                label="押金"
                prop="deposit">
            </el-table-column>
            <el-table-column align="right" width="200px">
              <!--eslint-disable-next-line vue/no-unused-vars-->
              <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="big"
                    placeholder="输入期刊名称搜索"/>
              </template>
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12">
                    <el-button
                        size="mini"
                        @click="handleBorrow(scope.$index, scope.row)">借阅</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDetail(scope.$index, scope.row)">查看信息</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card" shadow="hover">
          <div slot="header">
            <i class="el-icon-user"></i>
            <span> 用户信息</span>
          </div>
          <el-row>
            <el-col :span="8">
              用户名：
            </el-col>
            <el-col :span="16">
              {{userTable.userNum}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              邮箱：
            </el-col>
            <el-col :span="16">
              {{userTable.userEmail}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              余额：
            </el-col>
            <el-col :span="16">
              {{userTable.balance}}
            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>


    <el-drawer
        title="期刊详情信息"
        :visible.sync="drawer"
        :direction="'rtl'"
        size = 50%>
      <el-table :data="detailData">
        <el-table-column property="paperTitle" label="论文名字"></el-table-column>
        <el-table-column property="paperAuthor" label="论文作者"></el-table-column>
        <el-table-column property="paperKeyword1" label="关键词1"></el-table-column>
        <el-table-column property="paperKeyword2" label="关键词2"></el-table-column>
        <el-table-column property="paperKeyword3" label="关键词3"></el-table-column>
        <el-table-column property="paperKeyword4" label="关键词4"></el-table-column>
        <el-table-column property="paperKeyword5" label="关键词5"></el-table-column>
        <el-table-column property="periodicalPage" label="所在页数"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
// import PeriodicalHeader from "../components/PeriodicalHeader";
export default {
  // components: {PeriodicalHeader},
  name: "BorrowPage",
  beforeRouteEnter:(to,from,next)=>{
    next(vm=>{
      vm.getAllData()
    })
  },
  data() {
    return {
      drawer: false,
      radio:'1',
      content:'',
      userTable: '',
      periodicalData:[],
      search: '',
      detailData:[]
    }
  },
  methods: {
    handleBorrow:function(index, row) {
      console.log(index, row);
      if(row.deposit > this.userTable.balance){
        this.$message("余额不足")
      }else{
        this.axios.post('/borrow/search/borrowbooks',{
          periodical_name:row.periodicalName,
          year:row.year,
          volume:row.volume,
          stage:row.stage
        }).then(response=>{
          if(response.data.status === 0){
            this.$message('借阅成功')
            setTimeout(()=>{
              this.$router.go(0)
            },1000)

          }else{
            this.$message('借阅失败')
          }
        })
      }
    },
    handleDetail:function(index,row) {
      console.log(index, row);
      this.drawer = true
      this.axios.get(`borrow/search/detail/${row.periodicalName}/${row.year}/${row.volume}/${row.stage}`).then(response=>{
            if(response.data.status===0){
              this.detailData = response.data.data;
            }
      })
    },
    getAllData:function(){
      this.axios.get('/borrow').then(response=>{
        //console.log(response.data.msg)
        if(response.data.status===0){
          this.userTable = response.data.data.userInfo
          this.periodicalData = response.data.data.periodicalVOList
        }
        else if(response.data.status === 1){
          localStorage.removeItem("Authorization")
          //this.$router.go(0)
        }
      })
    }
  }
}
</script>

<style scoped>
  .card{
    margin:10px;
  }

  .borrow-card{
    height: 88vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>