<template>
  <a-form layout="inline" :model="permissionSearchForm" @finish="handleFinish" @finishFailed="handleFinishFailed">
    <a-form-item label="权限标识">
      <a-input v-model:value="permissionSearchForm.code"/>
    </a-form-item>
    <a-form-item label="权限描述">
      <a-input v-model:value="permissionSearchForm.desc"/>
    </a-form-item>
    <a-form-item label="权限类型">
      <a-input v-model:value="permissionSearchForm.type"/>
    </a-form-item>
    <a-form-item label="状态">
      <a-input v-model:value="permissionSearchForm.state"/>
    </a-form-item>
    <a-form-item>
      <a-button type="primary">
        <template #icon><SearchOutlined /></template>查询
      </a-button>
    </a-form-item>
    <a-form-item style="float: right">
      <a-button type="default" size="large">新增权限</a-button>
    </a-form-item>
  </a-form>
  <br/>
  <a-table :columns="columns" :data-source="data" class="ant-table-striped" size="middle" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)" bordered :pagination="pagination">
    <template #action="{ record }">
      <span>
        <a>详情</a>
        <a-divider type="vertical" />
        <a>删除</a>
        <a-divider type="vertical" />
      </span>
    </template>
  </a-table>
</template>

<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { SearchOutlined } from '@ant-design/icons-vue';

  interface FormState {
    code: string;
    desc: string;
    type: string;
    state: string;
  }

  const columns = [
    {
      dataIndex: 'code',
      key: 'code',
      title: '权限标识',
    },
    {
      dataIndex: 'desc',
      key: 'desc',
      title: '权限描述',
    },
    {
      dataIndex: 'type',
      key: 'type',
      title: '权限类型',
    },
    {
      dataIndex: 'state',
      key: 'state',
      title: '状态',
    },
    {
      dataIndex: 'createBy',
      key: 'createBy',
      title: '创建人',
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
      code: 'user:insert',
      desc: '新增用户',
      type: '功能权限',
      state: '正常',
      createBy: 'zhengjin.wang',
    },
    {
      id: '2',
      code: 'user:update',
      desc: '修改用户',
      type: '功能权限',
      state: '正常',
      createBy: 'zhengjin.wang',
    },
    {
      id: '3',
      code: 'user:select',
      desc: '查询用户',
      type: '功能权限',
      state: '正常',
      createBy: 'zhengjin.wang',
    },
  ];

  export default defineComponent({
    name: "permission",
    setup() {

      const pageSize = ref(10);
      const current = ref(1);

      const permissionSearchForm: UnwrapRef<FormState> = reactive({
        code: '',
        desc: '',
        type: '',
        state: '',
        createBy: ''
      });

      const pagination = {
        total: 200,
        current: current.value,
        pageSize: pageSize.value,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      };

      const handleFinish = (values: FormState) => {
        console.log(values, permissionSearchForm);
      };
      const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
        console.log(errors);
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        console.log(current, pageSize);
      };

      return {
        data,
        columns,

        permissionSearchForm,
        pageSize,
        current,
        pagination,

        handleFinish,
        handleFinishFailed,
        onShowSizeChange,
      };
    },
    components: {
      SearchOutlined
    },
  })
</script>

<style scoped>

</style>