<template>
  <a-card :title="detail.name">
    <p>{{detail.type}}</p>
  </a-card>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRoute } from "vue-router";

export default defineComponent({
  name: "roleDetail",
  setup () {
    const detail = {
      id: '1',
      name: '小组负责人',
      type: '普通角色'
    }
    const route = useRoute();

    onMounted(() => {
      console.log(route.query)
    })

    return {
      detail
    }
  }
})
</script>

<style scoped>

</style>