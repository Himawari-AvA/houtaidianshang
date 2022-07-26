/*
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 17:42:39
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-26 15:23:55
 * @FilePath: \houtaidianshang\src\api\product\sku.js
 * @Description:
 *
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved.
 */
//sku模块
import request from '@/utils/request';
//sku列表的接口
///admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' });

//上架
///admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' });

//下架
///admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' });

//获取SKU详情的接口
///admin/product/getSkuById/{skuId}  get
export const reqSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' });
