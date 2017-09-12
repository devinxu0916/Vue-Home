<template>
  <!--首页-->
  <div class="wrapper">
    <!--顶部-->
    <HeaderBar></HeaderBar>
    <!--顶部切换-->
    <HeaderTabs class="tabs"></HeaderTabs>
    <!--底部导航-->
    <FooterNav></FooterNav>
  </div>
</template>

<script>
  import HeaderBar from '../components/HeaderBar.vue'
  import HeaderTabs from '../components/HeaderTabs.vue'
  import FooterNav from '../components/FooterNav.vue'
  export default {
    components: {
      HeaderBar,
      HeaderTabs,
      FooterNav
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .tabs {
      flex: 1;
      margin: 8rem 0 0 0;
    }
  }
</style>
