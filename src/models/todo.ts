import { getTodoLists } from "@/services/todo"

export default {
    namespace: 'todo',

    state: {
        todoList: []
    },

    effects: {
        *getTodoList(_, { call, put }) {
            const resDate = yield call(getTodoLists)
            yield put({
                type: 'setTodoList',
                payload: resDate
            })
        }
    },

    reducers: {
        setTodoList(state, action) {
            return {
                ...state,
                todoList: action.payload
            }
        }
    }


}