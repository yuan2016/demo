import axios from 'axios'

const user = {
  state: {
    name: '',
    sex: '',
    department: '',
    roles: '',
    table: '',
    phone: ''
  },
  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_DEPARTMENT: (state, department) => {
      state.department = department
    },
    SET_SEX: (state, sex) => {
      state.sex = sex
    },
    SET_TABLE: (state, table) => {
      state.table = table
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    CLEAR_TABLE: (state) => {
      state.table = ''
    }
  },
  actions: {
    setRoles: ({commit}, roles) => {
      commit('SET_ROLES', roles)
    },
    setInfo: ({commit}, info) => {
      commit('SET_NAME', info.user_name)
      commit('SET_DEPARTMENT', info.department)
      commit('SET_SEX', info.user_sex)
      commit('SET_PHONE', info.user_mobile)
    },
    clearTable: ({commit}) => {
      commit('CLEAR_TABLE')
    },
    // 获取用户信息
    GetInfo ({commit, state}, email) {
      return axios.post('api/getLoginInfo', {
        email: email
      }).then(response => {
        const data = response.data[0]
        commit('SET_NAME', data.user_name)
        commit('SET_DEPARTMENT', data.department)
        commit('SET_SEX', data.user_sex)
        commit('SET_TABLE', data.available_table)
        commit('SET_PHONE', data.user_mobile)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

export default user
