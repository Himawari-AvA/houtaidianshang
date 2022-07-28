/*
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-07-27 18:14:06
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-07-27 21:32:52
 * @FilePath: \houtaidianshang\src\store\modules\home.js
 * @Description:
 *
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved.
 */
import mockRequest from '@/utils/mockRequest';
const state = {
  list: {},
};
const mutations = {
  GETDATA(state, list) {
    state.list = list;
  },
};
const actions = {
  //发请求获取首页的mock数据
  async getData({ commit }) {
    // console.log('****************************');
    let result = await mockRequest.get('/home/list');
    // console.log(result);
    if (result.code == 20000) {
      commit('GETDATA', result.data);
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
