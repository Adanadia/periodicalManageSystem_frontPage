<template>
  <div id="app">
    <PeriodicalHeader v-if="checkHeaderVisablity"/>
    <router-view></router-view>
  </div>
</template>

<script>
import PeriodicalHeader from "@/components/PeriodicalHeader";
export default {
  name: 'app',
  components: {
    PeriodicalHeader
  },
  methods:{
  },
  computed:{
    checkHeaderVisablity:function (){
      return this.$route.path != '/login' && this.$route.path != '/register'
    }
  }
}
</script>


<style>
  body{
    margin: 0px;
  }
</style>
