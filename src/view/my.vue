<template>
  <!--个人中心-->
  <div class="wrapper">
    <mu-appbar class="header" >
      <mu-icon-button icon="email" to="/message" slot="right" />
      <span class="my-news-title">个人中心</span>
    </mu-appbar>
    <mu-list class="main">
      <div class="my-information">
        <img :src="user.avatar_url" alt="user">
        <div class="timer">
          <span class="name"><b>{{ user.loginname }}</b></span><br/>
          <span>积分：{{ user_msg.score }}</span><br/>
          <span>注册时间：{{ user_msg.create_at | formatDate }}</span>
        </div>
      </div>
      <!--最近的话题-->
      <mu-list-item class="my-information-firstitem list-item" title="最近的话题" v-if="user_msg.recent_topics" toggleNested :open="false" >
        <mu-icon slot="left" value="chat" />
        <mu-list-item class="list-item-content" :to="{path: '/content', query: {id: item.id}}" v-for="item in user_msg.recent_topics" :key="item.id" slot="nested" :title="item.title" :afterText="item.last_reply_at| formatDate">
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{ user_msg.recent_topics.length }}</span>
      </mu-list-item>
      <!--最近的回复-->
      <mu-list-item class="list-item" v-if="user_msg.recent_replies" title="最近的回复" toggleNested :open="false">
        <mu-icon slot="left" value="public" />
        <mu-list-item class="list-item-content" :to="{path: '/content', query: {id: item.id}}" v-for="item in user_msg.recent_replies" :key="item.id" slot="nested" :title="item.title" :afterText="item.last_reply_at| formatDate">
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{user_msg.recent_replies.length}}</span>
      </mu-list-item>
      <!--收藏的话题-->
      <mu-list-item class="list-item" v-if="user_msg.collect_topics" title="收藏的话题" toggleNested :open="false">
        <mu-icon slot="left" value="star" />
        <mu-list-item class="list-item-content" :to="{path: '/content', query: {id: item.id}}" v-for="item in user_msg.collect_topics" :key="item.id" slot="nested" :title="item.title" :afterText="item.last_reply_at| formatDate">
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{user_msg.collect_topics.length}}</span>
      </mu-list-item>
    </mu-list>
    <!--退出登录-->
    <div class="logout">
      <mu-raised-button label="退出登录" @click="logout" class="demo-raised-button" primary/>
    </div>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
  import axios from 'axios'
  import FooterNav from '../components/FooterNav.vue'
  export default {
    components: {
      FooterNav
    },
    data () {
      return {
        accessToken: '',
        user: {},
        user_msg: {}
      }
    },
    // 获取存储的accessToken
    created () {
      this.accessToken = localStorage.getItem('accessToken')
      this.getData()
    },
    methods: {
      getData () {
        axios.post('https://www.vue-js.com/api/v1/accesstoken', {
          accesstoken: this.accessToken
        }).then((res) => {
          console.log(res)
          this.user = res.data
          this.getUserData()
        }).catch((err) => {
          console.log(err)
          alert('获取数据失败')
        })
      },
      // 根据用户登录名获取用户信息
      getUserData () {
        let userName = this.user.loginname
        axios.get('https://www.vue-js.com/api/v1/user/' + userName).then((res) => {
          console.log(res)
          this.user_msg = res.data.data
        }).catch((err) => {
          console.log(err)
          alert('获取用户数据失败')
        })
      },
      // 退出登录
      logout () {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user_id')
        localStorage.removeItem('loginname')
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_base.scss';
  .wrapper {
    @include wrapper;
    height: 100%;
    .my-news-title {
      padding-left: 5rem;
    }
    .my-information {
      height: 5rem;
      padding-top: 1rem;
      img {
        float: left;
        height: 5rem;
        width: 5rem;
        margin-left: 1rem;
      }
      .name {
        font-size: 1.6rem;
      }
      .timer {
        padding: 0.2rem 0 0 8rem;
        font-size: 1.2rem;
      }
    }
    .my-information-firstitem {
      margin-top: 2rem;
    }

    .list-item {
      .list-item-content {
        position: relative;
        border: 0.1rem solid #EFF2F7;
        margin: 0.6rem;
        margin-left: -1rem;


      }
      .msg-num {
        background-color: #f5f5f5;
        font-size: .2rem block;
        padding: 0 0.6rem;
        border-radius: 100%;
        position: absolute;
        right: 4rem;
        top: 1.2rem;
      }
    }
    .logout{
      text-align: center;
      .demo-raised-button {
        margin-top: 2rem;
      }
    }

  }

</style>
