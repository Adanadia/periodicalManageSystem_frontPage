<template>
  <div>
    <el-header>
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
        <el-menu-item @click="toMainPage" index="1">首页</el-menu-item>
        <el-menu-item @click="toBorrowPage" index="2">期刊借阅</el-menu-item>
        <el-menu-item @click="toReservePage" index="3">期刊预定</el-menu-item>
        <el-menu-item @click="toGoPage" index="4">期刊去向</el-menu-item>
      </el-menu>

    </el-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key,keyPath);
      this.activeIndex = keyPath[0]
    },
    toMainPage:function (){
      this.$router.push({
        path:'/main'
      })
    },
    toBorrowPage:function (){
      this.$router.push({
        path:'/borrow'
      })
    },
    toReservePage:function (){
      this.$router.push({
        path:'/reserve'
      })
    },
    toGoPage:function (){
      this.$router.push({
        path:'/go'
      })
    }
  },
  computed:{
    activeIndex:{
      get:function(){
        return ({
          "/main":"1",
          "/borrow":"2",
          "/reserve":"3",
          "/go":"4"
        })[this.$route.path]
      },
      set:function(){}
    }
  }
}
</script>

<style scoped>

</style>