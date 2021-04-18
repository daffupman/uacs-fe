<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo"/>
    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
      <a-sub-menu key="sub1">
        <template #title>
            <span>
              <user-outlined/>
              <span>角色管理</span>
            </span>
        </template>
        <a-menu-item key="1">
          <router-link to="/role">角色列表</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
            <span>
              <team-outlined/>
              <span>权限管理</span>
            </span>
        </template>
        <a-menu-item key="2">
          <router-link to="/permission">权限列表</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
            <span>
              <team-outlined/>
              <span>层级管理</span>
            </span>
        </template>
        <a-menu-item key="3">层级列表</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <template #title>
            <span>
              <team-outlined/>
              <span>用户管理</span>
            </span>
        </template>
        <a-menu-item key="4">用户列表</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {TeamOutlined, UserOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: "the-side-bar",
  components: {
    UserOutlined,
    TeamOutlined,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
    };
  },
})
</script>

<style scoped>
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
</style>