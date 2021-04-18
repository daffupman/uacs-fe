<template>
  <a-form layout="inline" :model="roleSearchForm" @finish="handleFinish" @finishFailed="handleFinishFailed">
    <a-form-item label="层级名称">
      <a-input v-model:value="roleSearchForm.name"/>
    </a-form-item>
    <a-form-item>
      <a-button type="primary">
        <template #icon><SearchOutlined /></template>查询
      </a-button>
    </a-form-item>
    <a-form-item style="float: right">
      <a-button type="default" size="large">新增层级</a-button>
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
  }

  const columns = [
    {
      title: '层级名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '顺序',
      dataIndex: 'seq',
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
      name: '玄武湖相亲角',
      seq: '11',
      createBy: 'zhengjin.wang'
    },
    {
      id: '2',
      name: '雨花台码农市场',
      seq: '12',
      createBy: 'zhengjin.wang'
    },
  ];

  export default defineComponent({
    name: "hierarchy",
    setup() {

      const pageSize = ref(10);
      const current = ref(1);

      const roleSearchForm: UnwrapRef<FormState> = reactive({
        name: ''
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
        console.log(values, roleSearchForm);
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

        roleSearchForm,
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