import 'antd/dist/antd.css';
import { Card, Col, Row ,Drawer,Button,Radio,Icon } from 'antd';
import { Tabs, Divider} from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import React, { Component } from 'react'
import Timer from '../components/Timer'
import './Home.css'

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);

export class Attendence extends Component {
    render() {
        return (
            <div>
                 
                <Divider className='homeHeadings' style={{fontSize:25}}>Attendence</Divider>
                 <StickyContainer style={{marginTop:-8}}>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
      <TabPane tab={<Icon type="check-square" theme="twoTone" />} key="1" style={{ height: 200  }}>
        <Timer/>
      </TabPane>
      <TabPane tab={<Icon type="code" theme="twoTone" />} key="2">
         {/* <Showattendence/>  */}
      </TabPane>
      
    </Tabs>
  </StickyContainer>
            

            </div>
        )
    }
}

export default Attendence
