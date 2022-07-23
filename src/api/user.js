/*
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-23 13:29:43
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-23 15:31:27
 * @FilePath: \houtaidianshang\src\api\user.js
 * @Description:
 *
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved.
 */
import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/admin/acl/index/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/admin/acl/index/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/admin/acl/index/logout",
    method: "post",
  });
}
