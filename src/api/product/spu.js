/*
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 17:42:38
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-24 20:27:57
 * @FilePath: \houtaidianshang\src\api\product\spu.js
 * @Description:
 *
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved.
 */
import request from '@/utils/request';

// 获取SPU列表数据的接口
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } });
