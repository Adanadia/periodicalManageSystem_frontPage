<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-card
            class="card reserve-card"
            shadow="hover"
            style="margin-top: 5px"
            :body-style="{ padding: '10px' }">
          <div class="main">
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :data="tableData.filter(data => !search || data.peridical_name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
              <el-table-column
                  label="期刊名"
                  prop="periodicalName">
              </el-table-column>
              <el-table-column
                  label="年"
                  prop="year">
              </el-table-column>
              <el-table-column
                  label="卷"
                  prop="volume">
              </el-table-column>
              <el-table-column
                  label="期"
                  prop="stage">
              </el-table-column>
              <el-table-column
                  label="所需押金"
                  prop="deposit">
              </el-table-column>

              <el-table-column
                  align="right">
                <template slot="header" slot-scope="{}">
                  <el-input
                      v-model="search"
                      size="big"
                      placeholder="输入期刊名搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="searchdetail(scope.$index, scope.row)">查看</el-button>
                  <el-button
                      size="mini"
                      type="danger"
                      @click="reservePeriodical(scope.$index, scope.row)">预定</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-drawer
                title="期刊详情"
                tabel="false"
                :visible.sync="table"
                direction="rtl"
                size="50%">
              <el-table :data="peridical_detail">
                <el-table-column property="paperTitle" label="期刊名" width="100"></el-table-column>
                <el-table-column property="paperAuthor" label="期刊作者" width="100"></el-table-column>
                <el-table-column property="paperKeyword1" label="关键字1"></el-table-column>
                <el-table-column property="paperKeyword2" label="关键字2"></el-table-column>
                <el-table-column property="paperKeyword3" label="关键字3"></el-table-column>
                <el-table-column property="paperKeyword4" label="关键字4"></el-table-column>
                <el-table-column property="paperKeyword5" label="关键字5"></el-table-column>
              </el-table>
            </el-drawer>
          </div>
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
  </div>
</template>

<script>
export default {
  name:"Reserve",
  components: '',
  data() {
    return {
      loading:true,
      table : false,
      tableData: [],
      search: '',
      a : [],
      peridical_detail : [],
      userTable:[]
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    next(vm=>{
      vm.getData()
    })
  },
  methods: {
    getData:function(){
      this.axios.get('/reserve').then(reponse=>{
            if(reponse.data.status === 0){
              this.loading=false
              this.tableData = reponse.data.data.periodicalBorrowVOList;
              this.userTable = reponse.data.data.userInfoVO;
            }else{
              this.$message.error("请求失败")
            }
          })
    },
    reservePeriodical(index, row){
      this.axios.post('/reserve/search/reservebooks',{
        periodical_name : row.periodicalName,
        year : row.year,
        volume : row.volume,
        stage : row.stage
      }).then(reponse=>{
        if(reponse.data.status === 0){
          this.$message({
            message: '预定成功',
            type: 'success'
          });
          setTimeout(()=>{
            this.$router.go(0);
          },1400);
        } else {
          this.$message.error(reponse.data.msg);
        }
      })
    },
    searchdetail(index,row){
      this.table = true;
      this.axios.get(`/reserve/search/detail/${row.periodicalName}/${row.year}/${row.volume}/${row.stage}`).then(reponse =>{
        this.peridical_detail = reponse.data.data;
      })
    }
  },
}
</script>

<style scoped>
.card{
  margin:10px;
}

.reserve-card{
  height: 88vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>