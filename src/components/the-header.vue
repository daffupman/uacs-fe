<template>
  <a-layout-header style="background: #001529; padding: 0; color: #fffef9">
    <a-layout-content style="margin: 0 32px">
      <a-popconfirm title="确认退出登录？" ok-text="是" cancel-text="否" @confirm="logout">
        <a class="login-menu" v-show="user.id">
          <span>退出登录</span>
        </a>
      </a-popconfirm>
      <a class="login-menu" v-show="user.id" @click="showLoginModal">
        <span>欢迎【{{user.name}}】</span>
      </a>
      <a class="login-menu" v-show="!user.id" @click="showLoginModal">
        <span>登录</span>
      </a>
    </a-layout-content>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "the-header",
  setup () {
    const user = {
      id: 'a001',
      name: 'daff'
    }
    return {
      user
    }
  },
})
</script>

<style scoped>
  .login-menu {
    float: right;
    color: white;
    padding-left: 10px;
  }
</style>