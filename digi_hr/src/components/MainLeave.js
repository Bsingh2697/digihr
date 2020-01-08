import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Tabs ,Icon , Card } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import Leave from './Leave'
import LeaveHistory from './LeaveHistory'
import Testtable from './Testtable'


const { TabPane } = Tabs;
const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
      )}
    </Sticky>
  );
 

export class MainLeave extends Component {
    render() {
        return (
            <div> 
               
            <StickyContainer style={{marginTop:-20}}>
            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          
              <TabPane tab="New Leave Request" key="1" style={{ height: 800 }}>
                <Leave/>
              </TabPane>
              <TabPane tab="Leave History" key="2" style={{ height: 800 }}>
             
              <Testtable/>
              </TabPane>
            </Tabs>
          </StickyContainer>
        
          </div>
        )
    }
}

export default MainLeave
