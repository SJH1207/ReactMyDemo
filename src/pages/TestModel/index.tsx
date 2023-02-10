import React, { useEffect } from 'react';
import { connect } from 'umi';

const TestModle = (props: any) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'todo/getTodoList',
    }).then(() => {
      console.log('@@', props);
    });
  }, []);

  let list1 = [
    { id: 1, title: 'TodoList列表', status: 1 },
    { id: 2, title: 'TodoList添加', status: 2 },
    { id: 3, title: 'TodoList编辑', status: 0 },
    { id: 4, title: 'TodoList查看', status: 0 },
    { id: 5, title: 'TodoList总结', status: 2 },
    { id: 6, title: 'TodoList修改状态', status: 0 },
  ];
  const item = {
    id: list1.length + 1,
    title: 'aaa',
    status: 0,
  };
    list1 = [item, ...list1];
  console.log('list',[...list1]);

  return (
    <div>
      TestModle
      {props.todo.todoList.map((item, index) => {
        return <p key={index}>{JSON.stringify(item)}</p>;
      })}
    </div>
  );
};

export default connect(({ todo }) => ({ todo }))(TestModle);
