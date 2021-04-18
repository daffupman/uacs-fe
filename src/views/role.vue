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
      <a-button type="default" size="large">新增角色</a-button>
    </a-form-item>
  </a-form>
  <br/>
  <a-table :columns="columns" :data-source="data" class="ant-table-striped" size="middle" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)" bordered :pagination="pagination">
    <template #customTitle>
      <span>角色名称</span>
    </template>
    <template #tags="{ text: tags }">
      <span>
        <a-tag v-for="tag in tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
    </template>
    <template #action="{ record }">
      <span>
        <a>详情</a>
        <a-divider type="vertical" />
        <a>删除</a>
        <a-divider type="vertical" />
      </span>
    </template>
  </a-table>
<!--  <a-pagination show-size-changer v-model:current="current" v-model:pageSize="pageSize" :total="500" @showSizeChange="onShowSizeChange"/>-->
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
      dataIndex: 'name',
      key: 'name',
      slots: { title: 'customTitle', customRender: 'name' },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      slots: { customRender: 'tags' },
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  export default defineComponent({
    name: "role",
    setup() {

      const pageSize = ref(10);
      const current = ref(1);

      const roleSearchForm: UnwrapRef<FormState> = reactive({
        name: ''
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