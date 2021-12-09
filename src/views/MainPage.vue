<template>
  <div>
    <PeriodicalHeader></PeriodicalHeader>
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="img in imglist" v-bind:key="img">
          <img :src="img" alt/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-for="periodical in periodicalList" v-bind:key="periodical">
      {{periodical.periodicalName}}
    </div>
    <div>{{userInfomation.userNum}}</div>
  </div>
</template>
<script>
import PeriodicalHeader from "../compponents/PeriodicalHeader";
export default {
  components: {PeriodicalHeader},
  data() {
    return{
      periodicalList:[],
      userInfomation:'',
      imglist:[
        {
          URL : require("../assets/mainimg/img1.png")
        }
      ]

    }
  },
  beforeRouteEnter:(to,from,next)=>{
    next(vm=>{
      vm.getData()
    })
  },
  methods:{
    getData:function (){
      this.axios.get('/information').then(response=>{
        if(response.data.status === 0){
          this.periodicalList = response.data.data.periodical;
          this.userInfomation = response.data.data.user_table;
        }
      })
    },
    setSize: function() {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (400 / 1920) * this.screenWidth;
    }
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
};

</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
</style>