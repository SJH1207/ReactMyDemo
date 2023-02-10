import request from "umi-request";

/**
 * 获取用户列表
 */
export async function getGoods(params){
    // console.log(params);
    return request('/api/admin/goods',{params})
}

/**
 * 上架和下架商品
 */
export async function isOn(goodsid){
    return request.patch(`/api/admin/goods/${goodsid}/on`)
}

/**
 * 推荐和不推荐商品
 */
export async function isRecommend(goodsid){
    return request.patch(`/api/admin/goods/${goodsid}/recommend`)
}

/**
 * 添加商品
 */
export async function addGoods(data){
    // console.log(data);
    return request.post('/api/admin/goods',{data})
}

/**
 * 商品详细信息
 */
export async function showGoods(editId){
    return request(`/api/admin/goods/${editId}?include=category,user,comments`)
}

/**
 * 更新商品
 */
export async function updataGoods(editId,data){
    return request.put(`/api/admin/goods/${editId}`,{data})
}

