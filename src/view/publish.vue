<template>
  <div class="wrapper">
    <mu-appbar title="发布帖子" class="header">
      <mu-icon-button @click="goBack" icon="arrow_back" slot="left" />
    </mu-appbar>
    <div class="main">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="edit" title="编辑" />
        <mu-tab value="preview" title="预览" />
      </mu-tabs>
      <div v-if="activeTab === 'edit'" class="edit">
        <!--标题-->
        <mu-text-field v-model="editorTitle" label="请写标题" fullWidth labelFloat/>
        <!--选择板块-->
        <mu-select-field class="choose" v-model="tab" label="请选择板块" fullWidth :errorText="errorText">
          <mu-menu-item value="ask" title="回答" />
          <mu-menu-item value="share" title="分享" />
          <mu-menu-item value="job" title="招聘" />
        </mu-select-field>
        <mu-text-field v-model="editorText" label="正文" hintText="建议使用 Markdown 语法" multiLine :rows="10" :rowsMax="12" :fullWidth="true" labelFocusClass="label-focus" underlineFocusClass="underline-focus" />
      </div>
      <!--预览-->
      <mu-flexbox-item v-html="markedText" v-if="activeTab === 'preview'"></mu-flexbox-item>
      <!--确认按钮-->
      <!--确认按钮-->
      <div class="publishBtn">
        <mu-raised-button @click="publish" label="发布" class="demo-raised-button" primary/>
      </div>
    </div>
    <!--未登陆提示-->
    <mu-dialog :open="!accessToken" title="温馨提示：">
      请先登录
      <mu-flat-button slot="actions" primary to="/" label="取消" />
      <mu-flat-button slot="actions" primary to="/login" label="确定" />
    </mu-dialog>
    <!--输入提示-->
    <mu-dialog :open="publish_chip" title="温馨提示：">
      {{ tipMsg }}
      <mu-flat-button label="确定" slot="actions" primary @click="close" />
    </mu-dialog>
  </div>
</template>

<script>
  import marked from 'marked'
  import axios from 'axios'
  export default {
    data () {
      return {
        accessToken: '',
        activeTab: 'edit',
        tab: 'ask',
        editorTitle: '',
        editorText: '',
        tipMsg: '',
        publish_chip: false
      }
    },
    created () {
      this.accessToken = localStorage.getItem('accessToken')
    },
    computed: {
      errorText () {
        return this.tab ? '' : '这是必选项'
      },
      markedText () {
        return marked(this.editorText)
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      goBack () {
        this.$router.go(-1)
        // 后退一步记录，等同于 history.back()
      },
      publish () {
        // 检测输入是否符合要求
        if (this.editorTitle.length < 10) {
          this.publish_chip = true
          this.tipMsg = '话题标题字数不能小于10个'
          if (this.chip) clearTimeout(this.chip)
          this.chip = setTimeout(() => {
            this.publish_chip = false
          }, 2000)
        } else if (this.editorText.length < 1) {
          this.publish_chip = true
          this.tipMsg = '文章内容不能为空'
          if (this.chip) clearTimeout(this.chip)
          this.chip = setTimeout(() => {
            this.publish_chip = false
          }, 2000)
        }
        // 使用markdown编辑器
        this.editorText = marked(this.editorText)
        // 发布上传
        axios.post('https://www.vue-js.com/api/v1/topics', {
          accesstoken: this.accessToken,
          title: this.editorTitle,
          tab: this.tab,
          content: this.editorText
        }).then(() => {
          this.publish_chip = true
          this.tipMsg = '发布成功'
          if (this.chip) clearTimeout(this.chip)
          this.chip = setTimeout(() => {
            this.publish_chip = false
            this.$router.push({
              path: '/'
            })
          }, 2000)
        }).catch(() => {
          this.publish_chip = true
          this.tipMsg = '发布失败'
          /* this.tipMsg = '发布失败'
          if (this.chip) clearTimeout(this.chip)
          this.chip = setTimeout(() => {
            this.publish_chip = false
          }, 2000) */
        })
      },
      close () {
        this.publish_chip = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_base.scss';
  .wrapper {
    @include wrapper;
    .edit {
      padding: 0.6rem;
    }
    .publishBtn {
      display: flex;
      justify-content: center;
      .demo-raised-button {
        position: fixed;
        bottom: 2rem;
      }
    }
  }
</style>
