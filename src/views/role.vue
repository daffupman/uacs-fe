<template>
  <a-form layout="inline" :model="roleSearchForm" @finish="handleFinish" @finishFailed="handleFinishFailed">
    <a-form-item label="角色名称">
      <a-input v-model:value="roleSearchForm.name"/>
    </a-form-item>
    <a-form-item>
      <a-button type="primary">
        <template #icon><SearchOutlined /></template>查询
      </a-button>
    </a-form-item>
    <a-form-item style="float: right">
      <a-button type="default" size="large" @click="saveOrUpdate()">新增角色</a-button>
    </a-form-item>
  </a-form>
  <br/>
  <a-table :columns="columns" :data-source="data" class="ant-table-striped" size="middle" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)" bordered :pagination="pagination">
    <template #action="{ record }">
      <span>
        <a @click="saveOrUpdate(record)">编辑</a>
        <a-divider type="vertical" />
        <router-link :to="'/detail/role?id=' + record.id">详情</router-link>
        <a-divider type="vertical" />
        <a-popconfirm title="确认删除？" ok-text="是" cancel-text="否" @confirm="confirm" @cancel="cancel">
        <a @click="del()">删除</a>
        </a-popconfirm>
      </span>
    </template>
  </a-table>
  <a-modal title="角色" v-model:visible="modalVisible" :confirm-loading="modalLoading" @ok="handleModalOk">
    <a-form :model="roleForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="角色名称">
        <a-input v-model:value="roleForm.name" />
      </a-form-item>
      <a-form-item label="角色类型">
        <a-input v-model:value="roleForm.type" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { Tool } from '@/util/tool';

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

  const data = [
    {
      id: '1',
      name: '超级管理员',
      type: '管理员角色',
      createBy: 'zhengjin.wang'
    },
    {
      id: '2',
      name: '小组负责人',
      type: '普通角色',
      createBy: 'zhengjin.wang'
    },
  ];

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
        type: ''
      });

      const pagination = {
        total: 200,
        current: current.value,
        pageSize: pageSize.value,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      };

      const modalVisible = ref(false);
      const modalLoading = ref(false);

      const handleFinish = (values: FormState) => {
        console.log(values, roleSearchForm);
      };
      const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
        console.log(errors);
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        console.log(current, pageSize);
      };

      const saveOrUpdate = (record?: any) => {
        modalLoading.value = true;
        modalVisible.value = true;

        if (record !== undefined) {
          roleForm.value = Tool.copy(record)
        } else {
          roleForm.value = {
            id: '',
            name: '',
            type: ''
          }
        }

        modalLoading.value = false;
      }

      const handleModalOk = () => {
        modalLoading.value = true;
        modalVisible.value = false;
        modalLoading.value = false;
      }

      const info = () => {
        console.log('详情')
      }

      const del = () => {
        console.log('删除')
      }

      return {
        data,
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
        del
      };
    },
    components: {
      SearchOutlined
    },
  })
</script>

<style scoped>

</style>