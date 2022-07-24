<!--
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 16:42:54
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-24 19:59:50
 * @FilePath: \houtaidianshang\src\views\product\Attr\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
        <el-table :data="attrList" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150"> </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag type="success" v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id" style="margin: 0px 10px">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加、修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>

        <el-table border style="width: 100%; margin: 20px 0px" :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 切换span与input -->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row, $index)" style="display: block">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
                <!-- 气泡确认框 -->

                <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm='deleteAttrValue($index)'>
                  <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                </el-popconfirm>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled='attrInfo.attrValueList.length<1' >保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import cloneDeep from 'lodash/cloneDeep';
export default {
  name: 'Attr',

  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 接收服务器返回的属性数据
      attrList: [],
      // 控制table表格的显示与隐藏
      isShowTable: true,
      attrInfo: {
        attrName: '', //属性名
        attrValueList: [
          //属性值
          // {
          //   attrId: 0, //相应属性名的id
          //   valueName: '',
          // },
        ],
        categoryId: 0, //三级分类的ID
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 自定义事件回调
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = '';
        this.category3Id = '';
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = '';
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },

    // 确定三级分类之后，向服务器请求数据来展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList({ category1Id, category2Id, category3Id });
      if (result.code == 200) {
        this.attrList = result.data;
      } else {
      }
    },

    // 添加属性值回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true, //用于切换查看模式与编辑模式，并且每行互不干扰
      });

      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },

    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: '', //属性名
        attrValueList: [],
        categoryId: this.category3Id, //三级分类的ID
        categoryLevel: 3,
      };
    },

    // 修改某一个属性
    updateAttr(row) {
      this.isShowTable = false;
      // 将选中的属性赋值给attrInfo
      this.attrInfo = cloneDeep(row);
      // 深拷贝

      this.attrInfo.attrValueList.forEach((item) => {
        //响应式的添加数据
        this.$set(item, 'flag', false);
      });
    },

    toLook(row) {
      if (row.valueName.trim() == '') {
        this.$message('请输入一个正常的属性值');
        return;
      }
      // 不能有重复的属性
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });

      if (isRepeat) return;
      row.flag = false;
    },

    toEdit(row, index) {
      row.flag = true;

      // 点击属性名称自动聚焦
      //  点击span时切换为input 对于浏览器，页面重绘与重排是耗费时间的
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },

    // 气泡确认框的回调
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1)
    },

        // 保存按钮的回调函数
    async addOrUpdateAttr(){
        // 整理参数
        this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item =>{
          if(item.valueName!=''){
            // 删除flag属性
            delete item.flag;
            return true;
          }
        })
            // 向服务器发请求
        try {
          await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
          this.isShowTable = 'true';
          this.$message({type:'success',message:'保存成功'});
          this.getAttrList();
        } catch (error) {

        }

    }
  },
};
</script>

<style scoped></style>
