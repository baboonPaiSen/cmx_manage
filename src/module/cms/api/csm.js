import http from './../../../base/api/public'
/*JSON转查询条件工具*/
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;



export const  page_list = (page,size,pageInfo) =>{
  /*JSON转查询条件*/
  /*请求服务端页面查询接口*/
  return http.requestQuickGet(apiUrl+"/cms/page/list/"+page+"/"+size+"?pageAliase="+pageInfo.pageAliase)

}
export const  page_add = (pageFrom) =>{

  return  http.requestPost(apiUrl+"/cms/page/",pageFrom)

}

export const  queryPage = (pageId)=>{

  return http.requestQuickGet(apiUrl+"/cms/page/"+pageId)
}

export const  page_edit = (pageId,cmsPage)=>{
  return http.requestPut(apiUrl+"/cms/page/"+pageId,cmsPage)
}

export const  queryTemplate = (pageId)=>{


  return http.requestQuickGet(apiUrl+"/cms/template/"+pageId)
}

export const  deletePage = (pageId)=>{

  return http.requestDelete(apiUrl+"/cms/page/"+pageId)
}
export const  publishPage = (pageId)=>{

  return http.requestPost(apiUrl+"/cms/template/"+pageId)
}
