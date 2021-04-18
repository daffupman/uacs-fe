<template>
  <a-form layout="inline" :model="userSearchForm" @finish="handleFinish" @finishFailed="handleFinishFailed">
    <a-form-item label="用户名称">
      <a-input v-model:value="userSearchForm.name"/>
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model:value="userSearchForm.mobilePhoneNo"/>
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input v-model:value="userSearchForm.email"/>
    </a-form-item>
    <a-form-item>
      <a-button type="primary">
        <template #icon><SearchOutlined /></template>查询
      </a-button>
    </a-form-item>
    <a-form-item style="float: right">
      <a-button type="default" size="large">新增用户</a-button>
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
    name: string;
    mobilePhoneNo: string,
    email: string,
  }

  const columns = [
    {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '手机号',
      dataIndex: 'mobilePhoneNo',
      key: 'mobilePhoneNo',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
      name: 'zhengjin.wang',
      nickName: 'wangzhengjin',
      mobilePhoneNo: '18761699090',
      email: 'wzjin85@foxmail.com',
      status: '正常',
      createBy: 'zhengjin.wang'
    },
    {
      id: '2',
      name: 'yangyang.xie',
      nickName: 'xieyangyang',
      mobilePhoneNo: '18551405735',
      email: 'yangyang@qq.com',
      status: '正常',
      createBy: 'zhengjin.wang'
    },
  ];

  export default defineComponent({
    name: "user",
    setup() {

      const pageSize = ref(10);
      const current = ref(1);

      const userSearchForm: UnwrapRef<FormState> = reactive({
        name: '',
        nickName: '',
        mobilePhoneNo: '',
        email: '',
        status: '',
        createBy: ''
      });

      const pagination = {
        total: data.length,
        current: current.value,
        pageSize: pageSize.value,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total: number) => `共 ${total} 条数据`
      };

      const handleFinish = (values: FormState) => {
        console.log(values, userSearchForm);
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

        userSearchForm,
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