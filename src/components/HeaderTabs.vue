<template>
  <!--顶部-->
  <div class="demo-infinite-container HeaderTabs">
      <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
        <mu-tab value="all" title="全部" />
        <mu-tab value="good" title="精华" />
        <mu-tab value="weex" title="weex" />
        <mu-tab value="share" title="分享" />
        <mu-tab value="ask" title="问答" />
        <mu-tab value="job" title="招聘" />
      </mu-tabs>
      <div class="inLoading" v-if="inLoading">
        <img src="../assets/time.gif" alt="">
      </div>
      <!--列表展示-->
      <mu-list>
        <div class="list">
         <div class="item" v-for="item in items">
           <!--:to 实现点击头像进入该用户 ，:src+tag="img"实现item的头像展示；-->
           <!--<router-link src="item.author.avatar_url" tag="img" alt="user"></router-link>-->
           <img :src="item.author.avatar_url" alt="user">
           <!--同理实现点击进入帖子内容,以及判断显示置顶，精华等标签-->
           <router-link :to="{path:'/content',query:{id:item.id}}" tag="div" class="content">
             <div class="list-title">
               <span v-if="item.top">置顶</span>
               <span v-else-if="item.good">精华</span>
               <span v-else-if="item.tab === 'share'" :style="styleObj">分享</span>
               <span v-else-if="item.tab === 'ask'" :style="styleObj">问答</span>
               <span v-else-if="item.tab === 'job'" :style="styleObj">招聘</span>
               <strong>{{ item.title }}</strong>
             </div>
             <!--评论数和访问量和时间-->
             <div class="timer">
               <span><mu-icon value="chat" :size="14"/>{{item.reply_count}} &nbsp <mu-icon value="visibility" :size="14"/>{{item.visit_count}}</span>
               <span>{{item.last_reply_at | formatDate }}</span>
             </div>
           </router-link>
         </div>
       </div>
        <!--若下拉加载没内容了 显示这个 -->
        <p class="noMore" v-if="noMore">内容到底啦</p>
      </mu-list>
      <!--下拉加载更多数据-->
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        inLoading: true,
        activeTab: 'all',
        items: [],
        loading: false,
        scroller: null,
        styleObj: {
          backgroundColor: '#C5C5C7'
        },
        url: 'https://www.vue-js.com/api/v1/topics?tab=all',
        page: 1,
        noMore: false
      }
    },
    // 先导航和渲染组件，然后在组件的 created 钩子中获取数据
    // 组件创建完后获取数据，
    created () {
      this.getData()
    },
    // 挂载完毕
    mounted () {
      this.scroller = this.$el
    },
    methods: {
      // tab切换
      handleTabChange (val) {
        this.activeTab = val
        this.page = 1  // 切换tab，页面重置为第一页
        this.noMore = false  // 切换tab，重置
        this.url = 'https://www.vue-js.com/api/v1/topics?tab=' + val
        this.items = []
        this.getData()
      },
      getData () {
        this.loading = false
        this.items = []
        this.inLoading = true
        axios.get(this.url).then((res) => {
          this.items = res.data.data
          this.inLoading = false
          /* console.log(res.data.data) */
        })
      },
      loadMore () {
        if (!this.noMore && !this.inLoading) {
          this.loading = true
          this.page += 1
          let url = 'https://www.vue-js.com/api/v1/topics?tab=' + this.activeTab + '&page=' + this.page
          let arr = []
          setTimeout(() => {
            axios.get(url).then((res) => {
              arr = res.data.data
              console.log(arr.length)
              if (arr.length === 0) {
                this.loading = false
                this.noMore = true
                return
              }
              this.items = [...this.items, ...arr]
              arr = []
            })
            this.loading = false
          }, 1000)
        }
      }
    }
  }
</script>


<style scoped lang="scss">
  @import '../assets/sass/_base.scss';
  .HeaderTabs {
    overflow: auto;
    height: 100vh;
    .tabs{
      margin-top: 4rem;
      height: 4rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
    }
  }
  .inLoading{
    text-align: center;
    img{
      width: 100%;
    }
  }
  .mu-tab-link,
  .mu-tab-active {
    white-space: nowrap;
  }
  .item {
    display: flex;
    border-bottom: 0.6rem solid #EFF2F7;
    padding: 1rem;
    >img {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .list-title {
        text-align: left;
          >span {
            background-color: #369219;
            color: #fff;
            padding: 0.2rem;
            border-radius: 0.2rem;
            font-size: 1rem;
            margin-right: 0.5rem;
          }
          strong {
            font-size: 1.4rem;
         }
      }
      .timer {
        display: flex;
        justify-content: space-between;
        color: $gray;
        padding-top: 1rem;
      }
    }
  }
  .noMore {
    text-align: center;
    padding: 1rem 0;
  }
</style>
