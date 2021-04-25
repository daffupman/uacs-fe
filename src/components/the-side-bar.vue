<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo"/>
    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="uacs" style="background-color: #001529">
        <span style="font-family: 'Impact',serif; font-weight: bolder; padding-left: 22px; font-size: 36px;">
          <router-link to="/"><span style="color: #009ad6">UACS</span></router-link>
        </span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
            <span>
              <AuditOutlined />
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
              <VerifiedOutlined />
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
              <ApartmentOutlined />
              <span>层级管理</span>
            </span>
        </template>
        <a-menu-item key="3">
          <router-link to="/hierarchy">层级列表</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <template #title>
            <span>
              <user-outlined/>
              <span>用户管理</span>
            </span>
        </template>
        <a-menu-item key="4">
          <router-link to="/user">用户列表</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { VerifiedOutlined, UserOutlined, ApartmentOutlined, AuditOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: "the-side-bar",
  components: {
    UserOutlined,
    ApartmentOutlined,
    VerifiedOutlined,
    AuditOutlined
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['uacs']),
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