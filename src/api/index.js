import http from '../utils/request'



//请求首页数据
export const getData = ()=>{
    ///返回一个promise对象
    return http.get('/home/getData')
}
    //返回用户列表
export const getUser = (params)=>{

    return http.get('/user/getUser',params)
}



//添加
export const addUser = (data)=>{

    return http.post('/user/add',data)
}

//删除
export const delUser = (data)=>{

    return http.post('/user/del',data)
}

//修改
export const updUser = (data)=>{

    return http.post('/user/upd',data)
}

export const getMenu = (data)=>{

    return http.post('/permission/getMenu/',data)
}

//管理员用户

export const getAdminUser = (params)=>{

    return http.get('/permission/getAdminUser',params)
}

export const addAdmin= (data)=>{
    return http.post('/permission/add',data)
}
export const updAdmin= (data)=>{
    return http.post('/permission/upd',data)
}
export const delAdmin= (data)=>{
    return http.post('/permission/del',data)
}

//VIP用户
export const getVipUser = (params)=>{

    return http.get('/permission/getVipUser',params)
}

export const addVip= (data)=>{
    return http.post('/permission/addVip',data)
}
export const updVip= (data)=>{
    return http.post('/permission/updVip',data)
}
export const delVip= (data)=>{
    return http.post('/permission/delVip',data)
}