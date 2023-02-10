import { fetchDashboard } from '@/services/dashboard';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React, { useEffect,useState } from 'react';

const Dashboard = () => {
  // 定义组件状态，状态改变，会引起组件重新渲染
  let [data,setData]=useState({})

  useEffect(async () => {
    // 发送请求获取数据
      const resData=await fetchDashboard()
      console.log('resData',resData);
      // 得到数据后，更新组件状态
      setData(resData)
      
  }, []);

  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数"
              value={data.users_count}
              precision={0}
              valueStyle={{ color: 'skyblue' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数"
              value={data.goods_count}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数"
              value={data.order_count}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
