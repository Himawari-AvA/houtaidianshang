/*
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 17:42:32
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-24 00:22:23
 * @FilePath: \houtaidianshang\src\api\product\tradeMark.js
 * @Description:
 *
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved.
 */
//获取品牌列表接口

import request from '@/utils/request';

export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });

// 处理添加品牌
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 带了ID,代表是修改

  if (tradeMark.id) {
    return request({ url: `/admin/product/baseTrademark/update`, method: 'put', data: tradeMark });
  } else {
    return request({ url: `/admin/product/baseTrademark/save`, method: 'post', data: tradeMark });
  }
};
