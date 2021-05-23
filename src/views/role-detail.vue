<template>
  <a-card :title="detail.name">
    <template #extra>{{detail.type}}</template>
    <p>{{detail.desc}}</p>
  </a-card>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import axios from "axios";
import {message} from "ant-design-vue";

export default defineComponent({
  name: "roleDetail",
  setup () {
    const detail = ref({
      id: '',
      name: '',
      desc: '',
      type: ''
    })
    const route = useRoute();

    onMounted(() => {
      console.log(route.query)
      axios.get('http://localhost:20010/uacs/role/' + route.query.id).then(response => {
        const resp = response.data;
        if (resp.ok) {
          detail.value = resp.data
          console.log(detail.value)
        } else {
          message.error(resp.msg)
        }
      })
    })

    return {
      detail
    }
  }
})
</script>

<style scoped>

</style>
