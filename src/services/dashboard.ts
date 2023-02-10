import request from "umi-request";

// 获得首页数据
export function fetchDashboard(){
    return request('/api/admin/index')
}