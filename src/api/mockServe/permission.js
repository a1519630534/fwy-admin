import Mock from 'mockjs'
let adminInfo = [
  {
    id: Mock.Random.guid(),username: 'admin', password: 'admin',phone:'11111111111'
  },
  {
    id: Mock.Random.guid(),username: 'admin1', password: 'admin1',phone:'11111111111'
  }
]

let vipInfo = [
  {
    id: Mock.Random.guid(),username: 'xiaoxiao', password: 'xiaoxiao',phone:'22222222222'
  }
]




// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}



let List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.now(),
      sex: Mock.Random.integer(0, 1),
    })
  )
}


export default {

  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应

    for (let i = 0; i < adminInfo.length; i++) {


      if (username === adminInfo[i].username && password === adminInfo[i].password) {
        
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home.vue',
                rolo: 'mm'
              },
              {
                path: '/mall',
                name: 'mall',
                label: '用户管理',
                icon: 'video-play',
                url: 'Mall.vue'
              },
              {
                path: '/user',
                name: 'user',
                label: '书籍管理',
                icon: 'user',
                url: 'User.vue'
              },
              
            ],
            routes: 'mm',
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
        
      }
      else if (username === vipInfo[i].username && password === vipInfo[i].password) {

        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home.vue'
              },
              {
                path: '/user',
                name: 'user',
                label: '书籍管理',
                icon: 'video-play',
                url: 'Mall.vue'
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      }
      else {
        return {
          code : 999
        }
      }

      
    }






  },



  /**
   * 获取ADMIN列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
   getUserList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    // console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = adminInfo.filter(user => {
      if (name && user.username.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },


  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    console.log(11111111111);
    const { username, password, phone} = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    adminInfo.unshift({
      id: Mock.Random.guid(),
      username:username,
      password:password,
      phone:phone
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } 
    else if(id === adminInfo[0].id){
      
      return {
        
        code: -999,
        message: '不能删除最高管理员账户'
      }

    }
    else {
      adminInfo = adminInfo.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const {  username, password, phone,id } = JSON.parse(config.body)
    adminInfo.some(u => {
      if (u.id === id) {
        u.username = username
        u.password = password
        u.phone = phone
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  },



  
  getVipUserList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    // console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = vipInfo.filter(user => {
      if (name && user.username.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },


  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createVipUser: config => {
    console.log(11111111111);
    const { username, password, phone} = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    vipInfo.unshift({
      id: Mock.Random.guid(),
      username:username,
      password:password,
      phone:phone
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteVipUser: config => {
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } 
    else if(id === vipInfo[0].id){
      
      return {
        
        code: -999,
        message: '不能删除最高管理员账户'
      }

    }
    else {
      vipInfo = vipInfo.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },

  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateVipUser: config => {
    const {  username, password, phone,id } = JSON.parse(config.body)
    vipInfo.some(u => {
      if (u.id === id) {
        u.username = username
        u.password = password
        u.phone = phone
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  },


  
}
