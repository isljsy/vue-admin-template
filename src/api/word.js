import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/word/list',
    method: 'get',
    params
  })
}

export function getWord(params) {
  return request({
    url: 'api/word/:id',
    method: 'get',
    params
  })
}

export function updateBase(params) {
  return request({
    url: 'api/word/base',
    method: 'post',
    data: params
  })
}

export function updatePinyin(params) {
  return request({
    url: 'api/word/pinyin',
    method: 'post',
    data: params
  })
}

export function updateExplain(params) {
  return request({
    url: 'api/word/explain',
    method: 'post',
    data: params
  })
}