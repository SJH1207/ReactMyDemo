import request from "umi-request";

/**
 * 关于request第二个参数options，常用的两个传参方式
 * 
 * 1.params传参，也就是query传参，多用于get请求，查询数据使用，类型是对象或者URLSearchParams
 * 2.data传参，也就是body传参，多用于表单提交数据，类型是any,推荐使用对象
 * 
 * @param params 
 * @returns 
 */


/** 
 * 获取分类列表
 */
export async function getSort(params){
    console.log('params',params);
    return request('/api/admin/category',{params})
}

// /**
//  * 禁用或启用分类
//  */
// export async function lockUsers(uid){
//     return request.patch(`/api/admin/users/${uid}/lock`)
// }

/**
 * 新增分类
 */
export async function addSort(data){
    console.log(data);
    return request.post('/api/admin/category',{data})
}

/**
 * 分类详细信息
 */
 export async function showSort(editId){
     console.log(editId);
     
    return request(`/api/admin/category/${editId}?include=category,user,comments`)
}

/**
 * 更新分类
 */
export async function updataSort(editId,data){
    console.log(data);
    return request.put(`/api/admin/category/${editId}`,{data})
}
