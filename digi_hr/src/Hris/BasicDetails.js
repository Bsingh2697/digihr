import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import IDinformation from './IDinformation'
import Basicinformation from './Basicinformation'
import Basicinformation1 from './Basicinformation1'
import IDinformation1 from './IDinformation1'

import React, { Component } from 'react'


const { TabPane } = Tabs;
const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
      )}
    </Sticky>
  );
 
 
 class BasicDetails extends Component {


    render() {
        return (
          <div>
            <StickyContainer style={{marginTop:-20}}>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
      <TabPane className="divide" tab="Basic Information" key="1" style={{ height: 800 ,fontSize:300 }}>
          <Basicinformation1/>
        </TabPane>
      <TabPane tab="ID information" key="2" style={{ height: 800  }}>
        <IDinformation1/>  
      </TabPane>
    </Tabs>
  </StickyContainer>
 
  </div>
        )
        
    }
}

export default BasicDetails
