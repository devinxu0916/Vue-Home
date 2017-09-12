<template>
  <div class="wrapper">
    <!--我的消息  这个页面其实就是数据的拉取了 没啥功能-->
    <mu-appbar class="header" title="我的消息"></mu-appbar>
    <div class="main">
      <div class="content" v-if="accessToken">
        <!--未读信息-->
        <mu-list-item class="list-item" title="未读消息" v-if="userMsg.hasnot_read_messages" toggleNested :open="false">
          <mu-icon slot="left" value="visibility_off" />
          <mu-list-item class="list-item-content" v-for="item in userMsg.hasnot_read_messages" :key="item.id" slot="nested" :title="item.title"></mu-list-item>
          <span class="msg-num">{{ userMsg.hasnot_read_messages.length }}</span>
        </mu-list-item>
        <!--已读信息-->
        <mu-list-item class="list-item" title="已读消息" v-if="userMsg.has_read_messages" toggleNested :open="false">
          <mu-icon slot="left" value="visibility" />
          <mu-list-item class="list-item-content" v-for="item in userMsg.has_read_message" :key="item.id" slot="nested" :title="item.title">
            <span>来自<strong>{{ item.autor.loginname }}</strong></span>
            <span class="message-time">{{ item.reply.create_at | formatDate }}</span><br>
            <p class="message-content">{{ item.reply.content }}</p>
            <span class="message-title">帖子：《{{ item.topic.title }}》</span>
            <span class="message-ups">获{{ item.reply.ups.length }}个赞</span>
          </mu-list-item>
          <span class="msg-num">{{ userMsg.has_read_messages.length }}</span>
        </mu-list-item>
      </div>
      <div v-if="!accessToken" class="message-tip">
        <mu-raised-button to="/login" label="请先登录" class="demo-raised-button" primary/>
      </div>
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
        userMsg: {}
      }
    },
    created () {
      this.accessToken = localStorage.getItem('accessToken')
      this.getData()
    },
    methods: {
      getData () {
        axios.get('https://www.vue-js.com/api/v1/messages?accesstoken=' + this.accessToken).then((res) => {
          this.userMsg = res.data.data
          console.log(this.userMsg)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_base.scss';
  .wrapper {
    @include wrapper;
    .content {
      margin: 1rem 0 3rem 0;
      .list-item {
        text-align: left;
        margin-top: 1rem;
        .list-item-content {
          position: relative;
          border-bottom: 0.6rem solid #EFF2F7;
          margin: 0.6rem;
          .message-time {
            float: right;
          }
          .message-ups {
            float: right;
          }
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
        mu-list-item {
          color: red;
          background-color: red;
        }
      }
    }
  }

  .message-tip {
    text-align: center;
    font-size: 2.0rem;
    line-height: 100vh;
  }
</style>
