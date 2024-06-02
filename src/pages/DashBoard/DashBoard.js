import React from 'react'
import Date from '../../components/Date/Date'
import AreaCard from '../../components/AreaCard/AreaCard'
import { Col, Row } from 'antd'
import BasicArea from '../../components/BasicArea/BasicArea'
import PieChartArea from '../../components/PieChart/PieChartArea'
import ChartBar from '../../components/ChartBar/ChartBar'
import DoubleLineChart from '../../components/DoubleLineChart/DoubleLineChart'
const DashBoard = () => {
  return (
    <div className='p-1'>
      <Row gutter={[16, 16]}>,
        <Col span={24}>
          <Date />
        </Col>
        <Col span={24}>
          <AreaCard />
        </Col>
        <Col xxl={15} xl={15} lg={15} md={24} sm={24} xs={24}>
          <BasicArea />
        </Col>
        <Col xxl={9} xl={9} lg={9} md={24} sm={24} xs={24}>
          <PieChartArea />
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <ChartBar />
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <DoubleLineChart />
        </Col>
      </Row>
    </div>
  )
}

export default DashBoard
