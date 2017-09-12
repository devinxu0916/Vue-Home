<template>
  <!--底部导航-->
  <mu-paper class="bottomNav">
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
          <mu-bottom-nav-item value="home" title="首页" icon="home" to="/" />
          <mu-bottom-nav-item value="message" title="信息" icon="email" to="/message" />
          <mu-bottom-nav-item value="person" title="我的" icon="person" :to="person_path" />
          <mu-bottom-nav-item value="more" title="更多" icon="more" to="/more" />
      </mu-bottom-nav>
  </mu-paper>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'home',
        person_path: ''
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    created () {
      this.facthData()
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      },
      facthData () {
        let accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
          this.person_path = '/my'
        } else {
          this.person_path = '/login'
        }
        if (this.$route.path === '/') {
          this.bottomNav = 'home'
        }
        if (this.$route.path === '/message') {
          this.bottomNav = 'message'
        }
        if (this.$route.path === '/login' || this.$route.path === '/my') {
          this.bottomNav = 'person'
        }
        if (this.$route.path === '/more') {
          this.bottomNav = 'more'
        }
      }
    }
  }
</script>

<style>
  .bottomNav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .bottomNav .mu-bottom-nav-shift-wrapper {
    display: flex;
    justify-content: space-around;
  }
  .mu-bottom-item-active .mu-bottom-item-icon{
    color: #4fc08d;
  }
  .mu-bottom-item-active .mu-bottom-item-text{
    font-size: 12px;
    color: #4fc08d;
  }
</style>
