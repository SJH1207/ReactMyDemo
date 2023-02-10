import request from "umi-request";

/**
 * 获取oss上传凭证签名
 * @returns 
 */
export function ossConfig(){
    return request('/api/auth/oss/token')
}