import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router';
import router from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    roles: [],
    buttons: [],
    // 对比之后的得到的权限的路由数组
    resultAsyncRoutes: [],
    // 最终路由
    resultAllRoutes: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }

  SET_USERINFO(state, userInfo) {
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;

    // 服务器返回的菜单信息
    state.routes = userInfo.routes;
    // 服务器返回的角色信息
    state.buttons = userInfo.buttons;
    // 服务器返回的按钮权限信息
    state.roles = userInfo.roles;
  },
  // 最终计算出的异步路由
  SET_RESULTASYNCROUTES(state, asyncRoutes) {
    state.resultAsyncRoutes = asyncRoutes;
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes);
    router.addRoutes(state.resultAllRoutes);
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;
          commit('SET_USERINFO', data);

          commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes));

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit('RESET_STATE');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  },
};

const computedAsyncRoutes = (asyncRoutes, routes) => {
  // 过滤出能够使用的路由
  return asyncRoutes.filter((item) => {
    if (routes.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true;
    }
  });
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
