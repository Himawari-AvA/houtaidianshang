<!--
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 16:42:41
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-24 23:53:51
 * @FilePath: \houtaidianshang\src\views\product\Spu\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 有三部分进行切换 -->

      <!-- 展示SPU列表 -->
      <div>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table border style="width: 100%" :data="records">
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width"> </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width"> </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu"></hint-button>
              <hint-button type="success" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表"></hint-button>
              <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,-> ,sizes,total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 三级列表课操作性
      show: true,
      page: 1,
      limit: 3,
      records: [],
      total: 0,
    };
  },

  methods: {
    // 三级联动的自定义事件 可以把子组件的ID数据传递给父组件
    getCategoryId({ categoryId, level }) {
      // 获取1 2 3级的ID
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = '';
        this.category3Id = '';
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = '';
      } else {
        this.category3Id = categoryId;
        // 发请求获取SPU列表数据并进行展示
        this.getSpuList();
      }
    },
    // 获取spu列表数据
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },

    // 点击分页器页码的回调
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },

    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
  },
};
</script>

<style scoped></style>
