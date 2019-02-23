import {
  baseUrl
} from '@/config/env'
import axios from 'axios'

import {
  getLocalStorage
} from '@/util/utils'
// export function findLogin(acode) {
//   return axios.get(`${baseUrl}/wechat/get_token?acode=${acode}&clientId=10000`)
// }

/**
 * 
 * @param {*} postData
 */
export function findLogin(postData) {
  var instance = axios.create({
    headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json'
      'Content-Type': 'multipart/form-data'
    }
  })
  return instance.post('/api/manage/login/form', postData)
}

/**
 * 获取菜单
 */
export function getMenu() {
  var beeToken = getLocalStorage('beeToken')
  var instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'beeToken': `${beeToken}`
    }
  })
  return instance.get(`/api/manage/menu`)
}

/**
 * 获取人员列表
 * @param {current,size} postData 
 */
export function getList(postData) {
  var beeToken = getLocalStorage('beeToken')
  var instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'beeToken': `${beeToken}`
    }
  })
  return instance.post('/api/manage/system/user/page', postData)
}