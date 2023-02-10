import request from "umi-request";

/**
 * 获取分类列表---非禁用的
 */
export async function getCategory(){
    return request('/api/admin/category')
}


