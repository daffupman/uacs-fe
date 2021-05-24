<template>
  <a-layout-header style="background: #001529; padding: 0; color: #fffef9">
    <a-layout-content style="margin: 0 32px">
      <a-popconfirm title="确认退出登录？" ok-text="是" cancel-text="否" @confirm="logout">
        <a class="login-menu" v-show="user.id">
          <span>退出登录</span>
        </a>
      </a-popconfirm>
      <a class="login-menu" v-show="user.id" @click="showLoginModal">
        <span>欢迎 [ {{user.name}} ]</span>
      </a>
      <a class="login-menu" v-show="!user.id" @click="showLoginModal">
        <span>登录</span>
      </a>
    </a-layout-content>
    <a-modal title="登录" v-model:visible="loginModalVisible" :confirm-loading="loginModalLoading" @ok="login">
      <a-form :model="loginForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="登录名">
          <a-input v-model:value="loginForm.account"/>
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model:value="loginForm.password" type="password"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout-header>
</template>

<script lang="ts">
import {defineComponent, ref, computed, reactive} from 'vue';
import { message } from 'ant-design-vue';
import store from "@/store";
import axios from 'axios';

export default defineComponent({
  name: "the-header",
  setup: function () {

    const user = computed(() => store.state.user);

    const loginUser = ref({
      id: '',
      name: ''
    })
    const loginModalVisible = ref(false);
    const loginModalLoading = ref(false);
    const loginForm = reactive({
      account: '',
      password: '',
      type: 'ap'
    })

    const showLoginModal = () => {
      loginModalVisible.value = true;
    };

    const login = () => {
      loginModalLoading.value = true;
      axios.post('http://localhost:20011/uacs/v1/passport/sign-in', loginForm).then(resp => {
        const data = resp.data;
        if (data.ok) {
          store.commit("setUser", {id: data.data.id, name: data.data.name})
          store.commit('setBearerToken', 'Bearer ' + data.data.accessToken)
          message.success("登录成功！")
          loginModalVisible.value = false;
          location.reload();
        } else {
          message.error(data.msg)
        }
        loginModalLoading.value = false;
      }).catch(err => {
        console.log(err)
      })
    };

    const logout = () => {
      const response = {
        ok: true,
        msg: ''
      };
      if (response.ok) {
        message.success("退出登录成功！");
        store.commit("setUser", {});
        location.reload();
      } else {
        message.error(response.msg);
      }
    };

    return {
      loginModalVisible,
      loginModalLoading,
      loginUser,
      user,
      loginForm,

      login,
      logout,
      showLoginModal,
    }
  },
})
</script>

<style scoped>
  .login-menu {
    float: right;
    color: white;
    padding-left: 20px;
  }
</style>
