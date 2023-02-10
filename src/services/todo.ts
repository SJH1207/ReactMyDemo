import request from "umi-request";

// 获取TodoLists
export const getTodoLists =async ()=>{
    return request('/api/todolists')
}

// 添加TodoLists
export const add =async (data)=>{
    // console.log(data);
    const url='/api/todo' 
    const option={
        data
    } 
    return request.post(url,option)
}

// 修改TodoLists状态
export const edit =async (data)=>{
    console.log(data);
    const url='/api/edit' 
    const option={
        data
    } 
    return request.put(url,option)
}