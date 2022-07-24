<!--
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 16:42:31
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-24 13:45:59
 * @FilePath: \houtaidianshang\src\views\product\tradeMark\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="showDialog"> 添加 </el-button>
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      :page-count="7"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 弹出对话框 -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdataTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tradeMark',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      //对话框显示与隐藏
      dialogFormVisible: false,

      // 手机品牌信息
      tmForm: {
        tmName: '',
        logoUrl: '',
      },

      //表单验证规则
      rules: {
        // 品牌名称验证规则
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2-10个字符', trigger: 'change' },
        ],
        // 品牌LOGO验证规则
        logoUrl: [{ required: true, message: '请选择品牌的图片' }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取品牌列表
    async getPageList() {
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      } else {
        console.log(result);
      }
    },

    handleCurrentChange(pager) {
      this.page = pager;
      this.getPageList();
    },
    handleSizeChange(limiter) {
      this.limit = limiter;
      this.getPageList();
    },

    showDialog() {
      this.dialogFormVisible = true;
      // 清除数据
      this.tmForm = { tmName: '', logoUrl: '' };
    },
    // 修改一个品牌
    // row:当前用户选中的这个品牌的信息
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      // 将已有的品牌信息赋值给tmForm
      this.tmForm = { ...row };
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 添加/修改品牌的 添加按钮
    addOrUpdataTradeMark() {
      // 验证字段通过
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
          if (result.code == 200) {
            this.$message({
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
            });
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log('验证失败');
          return false;
        }
      });
    },
    // 删除品牌信息
    deleteTradeMark(row) {
      // 弹框
      this.$confirm(`你确定删除${row.tmName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          } else {
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
