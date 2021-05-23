<template>
  <a-layout style="min-height: 100vh">
    <a-config-provider :locale="locale">
      <the-side-bar/>
      <a-layout>
        <the-header/>
        <a-layout-content style="margin: 0 32px">
          <div style="margin-top: 32px; padding: 24px; background: #fff; height: 100%;">
            <router-view/>
          </div>
        </a-layout-content>
        <the-footer/>
      </a-layout>
    </a-config-provider>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';
import theSideBar from'@/components/the-side-bar.vue';
import theHeader from'@/components/the-header.vue';
import theFooter from'@/components/the-footer.vue';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default defineComponent({
  name: 'app',
  components: {
    theSideBar,
    theHeader,
    theFooter
  },
  data() {
    return {
      locale: zhCN,
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
    };
  },
});
</script>
