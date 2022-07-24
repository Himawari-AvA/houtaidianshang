/*
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 17:42:38
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-24 19:32:36
 * @FilePath: \houtaidianshang\src\api\product\attr.js
 * @Description:
 *
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved.
 */
// 平台属性管理模块请求文件
import request from '@/utils/request';

// 获取一级分类数据接口
export const reqCategory1List = () => request({ url: `/admin/product/getCategory1`, method: 'get' });

// 获取二级分类数据接口
export const reqCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' });

// 获取三级分类数据接口
export const reqCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' });

// 获取平台属性
export const reqAttrList = ({ category1Id, category2Id, category3Id }) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' });

// 添加属性与属性值接口
export const reqAddOrUpdateAttr = (data) => request({ url: `/admin/product/saveAttrInfo`, method: 'post', data });
