import React, { useCallback, useEffect, useState } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Menu, message, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { getTodoLists } from '@/services/todo';
import { connect } from 'umi';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
    localStorage.removeItem('access_token')
    message.success('退出成功')
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props, { menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');


  // // 方法1：发送请求获得数据
  // const [data, setData] = React.useState(0)
  // useEffect(async () => {
  //   // 获取todolists数据
  //   const todoList = await getTodoLists()
  //   // 筛选数据
  //   const todoNum = todoList.filter(item => item.status === 0).length
  //   console.log(todoNum);
  //   // 修改状态
  //   setData(todoNum)
  // }, [])
  // console.log('data', data);




  // 方法2：使用model获得数据
  // console.log('props:', props.dispatch);
  const { dispatch } = props;
  useEffect(() => {
    dispatch({
      type: 'todo/getTodoList'
    }).then(() => {
      // console.log('@@', props);
      console.log('props:', props.dispatch);
    });
  }, [])
  const todoNum = props.todo.todoList.filter(item => item.status === 0).length





  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;

      if (key === 'todocopy') {
        history.push('/todocopy')
        return
      }

      message.loading('退出中.....',1)
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (

    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="todocopy">
        <LogoutOutlined />
        待办事项
        <Badge count={todoNum} offset={[10, 0]}></Badge>
      </Menu.Item>

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>
          {currentUser.name}
          <Badge count={todoNum} dot={true}></Badge>
        </span>
      </span>
    </HeaderDropdown>
  );
};

// export default AvatarDropdown;
export default connect(({ todo }) => ({ todo }))(AvatarDropdown);


