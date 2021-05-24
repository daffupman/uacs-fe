<template>
  <a-form layout="inline" :model="roleSearchForm" @finish="handleFinish" @finishFailed="handleFinishFailed">
    <a-form-item label="角色名称">
      <a-input v-model:value="roleSearchForm.name"/>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="query()">
        <template #icon><SearchOutlined /></template>查询
      </a-button>
    </a-form-item>
    <a-form-item style="float: right">
      <a-button type="default" size="large" @click="handleModalOk()">新增角色</a-button>
    </a-form-item>
  </a-form>
  <br/>
  <a-table :columns="columns" :data-source="columnData" class="ant-table-striped" size="middle" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)" bordered :pagination="pagination">
    <template #action="{ record }">
      <span>
        <a @click="handleModalOk(record)">编辑</a>
        <a-divider type="vertical" />
        <router-link :to="'/detail/role?id=' + record.id">详情</router-link>
        <a-divider type="vertical" />
        <a-popconfirm title="确认删除？" ok-text="是" cancel-text="否" @confirm="del(record.id)">
        <a>删除</a>
        </a-popconfirm>
      </span>
    </template>
  </a-table>
  <a-modal title="角色" v-model:visible="modalVisible" :confirm-loading="modalLoading" @ok="saveOrUpdate()">
    <a-form :model="roleForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="角色名称">
        <a-input v-model:value="roleForm.name" />
      </a-form-item>
      <a-form-item label="角色描述">
        <a-input v-model:value="roleForm.desc" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import axios from "axios";
  import {message} from "ant-design-vue";
import {Tool} from "@/util/tool";

  interface FormState {
    name: string;
    type: string;
  }

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '角色描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ];

  let columnData = ref([{}]);

  export default defineComponent({
    name: "role",
    setup() {

      const pageSize = ref(10);
      const current = ref(1);

      const roleSearchForm = ref({
        name: ''
      });

      const roleForm = ref({
        id: '',
        name: '',
        desc: ''
      });

      const pagination = ref({
        total: 0,
        current: current.value,
        pageSize: pageSize.value,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      });

      const modalVisible = ref(false);
      const modalLoading = ref(false);

      onMounted(() => {
        query()
      })

      const handleFinish = (values: FormState) => {
        console.log(values, roleSearchForm);
      };
      const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
        console.log(errors);
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        console.log(current, pageSize);
      };

      const saveOrUpdate = () => {
        modalLoading.value = true;
        modalVisible.value = true;

        axios.put('http://localhost:20010/uacs/role', {...roleForm.value}).then(resp => {
          const response = resp.data;
          if (response.ok) {
            message.success("新增角色成功！")
            modalVisible.value = false;
            query()
          } else {
            message.error(response.msg)
          }
          modalLoading.value = false;
        })
      }

      const handleModalOk = (record?: any) => {

        if (Tool.isNotEmpty(record)) {
          roleForm.value = Tool.copy(record)
        } else {
          roleForm.value = {
            id: '',
            name: '',
            desc: ''
          }
        }
        modalVisible.value = true;
      }

      const query = () => {
        const queryParams = "?name=" + roleSearchForm.value.name + "&pageNum=" + current.value + "&pageSize=" + pageSize.value
        axios.get('http://localhost:20010/uacs/role' + queryParams).then(resp => {
          const response = resp.data
          if (response.ok) {
            columnData.value = response.data.list
            pagination.value.total = response.data.total
          } else {
            message.error(response.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }

      const info = () => {
        console.log('详情')
      }

      const del = (id: string) => {
        console.log('删除')
        modalLoading.value = true
        axios.delete('http://localhost:20010/uacs/role/' + id).then(resp => {
          const response = resp.data;
          if (response.ok) {
            message.success('删除成功！')
            modalLoading.value = false
            query();
          } else {
            message.error(response.msg)
          }
        })
      }

      return {
        columnData,
        columns,

        roleSearchForm,
        roleForm,
        pageSize,
        current,
        pagination,
        modalVisible,
        modalLoading,

        handleFinish,
        handleFinishFailed,
        onShowSizeChange,
        saveOrUpdate,
        handleModalOk,
        info,
        del,
        query,
      };
    },
    components: {
      SearchOutlined
    },
  })
</script>

<style scoped>

</style>
