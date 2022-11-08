import Mock from 'mockjs'
import homeApi from './mockServe/home'
import user from './mockServe/user'
import permission from './mockServe/permission'



//定义mock请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//用户列表的请求
Mock.mock(/api\/user\/getUser/,user.getUserList)



Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock('/api/user/upd','post',user.updateUser)

//管理员用户相关
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)

//增删改查
Mock.mock(/api\/permission\/getAdminUser/,permission.getUserList)
Mock.mock('/api/permission/add','post',permission.createUser)
Mock.mock('/api/permission/del','post',permission.deleteUser)
Mock.mock('/api/permission/upd','post',permission.updateUser)


//VIP用户相关
//增删改查
Mock.mock(/api\/permission\/getVipUser/,permission.getVipUserList)
Mock.mock('/api/permission/addVip','post',permission.createVipUser)
Mock.mock('/api/permission/delVip','post',permission.deleteVipUser)
Mock.mock('/api/permission/updVip','post',permission.updateVipUser)

