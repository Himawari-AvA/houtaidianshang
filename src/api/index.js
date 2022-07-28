/*
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 17:48:11
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-27 21:31:55
 * @FilePath: \houtaidianshang\src\api\index.js
 * @Description:
 *
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved.
 */
//统一暴露接口函数
import * as trademark from './product/tradeMark';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from './product/sku';

// 权限相关接口
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission';

export default {
  trademark,
  attr,
  spu,
  sku,
  user,
  role,
  permission,
};
