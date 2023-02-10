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
 * 获取订单列表
 */
export async function getOrder(params){
    // console.log(params);
    return request('/api/admin/orders',{params})
}

// /**
//  * 禁用或启用商品
//  */
// export async function lockUsers(uid){
//     return request.patch(`/api/admin/users/${uid}/lock`)
// }

// /**
//  * 新增商品
//  */
// export async function addUsers(data){
//     return request.post('/api/admin/users',{data})
// }

// /**
//  * 商品详细信息
//  */
// export async function showUser(editId){
//     return request(`/api/admin/users/${editId}`)
// }

// /**
//  * 更新商品
//  */
// export async function updataUser(editId,data){
//     return request.put(`/api/admin/users/${editId}`,{data})
// }

