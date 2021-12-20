<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-row :span="12">
          <el-card shadow="hover" class="card1">
            <div  class="borrow">
              <el-descriptions title="个人信息" :column="3" border size="medium"  style="width: 100%">
                <el-descriptions-item label="用户名"  label-class-name="my-label" content-class-name="my-content">{{userInfomation.userNum}}</el-descriptions-item>
                <el-descriptions-item label="余额">{{userInfomation.balance}}</el-descriptions-item>
                <el-descriptions-item label="居住地" ><span class="my-content">安徽合肥</span></el-descriptions-item>
                <el-descriptions-item label="备注">安徽大学</el-descriptions-item>
                <el-descriptions-item label="邮箱">{{userInfomation.userEmail}}</el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card shadow="hover" class="card3">
              <div class="table">
                <h3 class="title1">已经借阅的期刊</h3>
                <el-table
                    :data="periodicalList"
                    style="width: 100%"
                    max-height="250"
                    :row-class-name="tableRowClassName">
                  <el-table-column
                      prop="periodicalName"
                      label="期刊名称"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="volume"
                      label="卷"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="year"
                      label="年"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="stage"
                      label="期"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="issn"
                      label="ISSN"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      fixed="right"
                      label="操作"
                      width="120">
                    <template slot-scope="scope">
                      <el-button
                          @click.native.prevent="deleteRow(scope.$index, scope.row)"
                          type="text"
                          size="small">
                        归还期刊
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card shadow="hover" class="card2">
              <div class="table1">
                <h3 class="title2">已经预定的期刊</h3>
                <el-table
                    :data="reserve"
                    style="width: 100%"
                    max-height="250">
                  <el-table-column
                      prop="periodicalName"
                      label="期刊名称"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="reserveDate"
                      label="预定时间"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="year"
                      label="年"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="stage"
                      label="卷"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="stage"
                      label="期"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      fixed="right"
                      label="操作"
                      width="120">
                    <template slot-scope="scope">
                      <el-button
                          @click.native.prevent="cancelReserve(scope.$index, scope.row)"
                          type="text"
                          size="small">
                        取消预定
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <el-calendar v-model="value">
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: '',
  data() {
    return {
      periodicalList: [],
      userInfomation: "",
      reserve : [],
      value: new Date()
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.getData()
    })
  },
  methods: {
    getData: function () {
      this.axios.get('/information').then(response => {
        if (response.data.status === 0) {
          this.periodicalList = response.data.data.periodical;
          this.userInfomation = response.data.data.user_table;
          this.reserve = response.data.data.reserve;
        }
      })
    },
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (400 / 1920) * this.screenWidth;
    },
    deleteRow:function(index, row) {
      this.axios.put('/information/return',{
        periodical_name:row.periodicalName,
        volume:row.volume,
        year:row.year,
        stage:row.stage
      }).then(response=>{
        if(response.data.status === 0){
          this.$message.success(response.data.msg);
          setTimeout(()=>{
            this.$router.go(0)
          },1500);
        }else if(response.data.status === 1){
          this.$message.error("归还失败")
        }
      })
    },
    cancelReserve:function (index, row){
      // console.log(index,row)
      this.axios.put('/reserve/delete',{
        periodical_name:row.periodicalName,
        volume:row.volume,
        year:row.year,
        stage:row.stage
      }).then(response=>{
        if(response.data.status === 0){
          this.$message.success(response.data.msg)
          setTimeout(()=>{
            this.$router.go(0)
          },1500);
        }else{
          this.$message.error("处理错误")
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
      row;
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    mounted() {
      // 首次加载时,需要调用一次
      this.screenWidth = window.innerWidth;
      this.setSize();
      // 窗口大小发生改变时,调用一次
      window.onresize = () => {
        this.screenWidth = window.innerWidth;
        this.setSize();
      }
    }
  }
}
</script>

<style scoped>
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}

.table{
  top:30%;
  right: 00%;
}
</style>