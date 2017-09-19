const getters = {
  roles: state => state.user.roles,
  sidebar: state => state.app.sidebar,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  mark: state => state.permission.mark,
  email: state => state.user.email,
  table: state => state.user.table,
  name: state => state.user.name
}
export default getters
