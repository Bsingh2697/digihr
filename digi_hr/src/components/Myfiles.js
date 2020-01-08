import 'antd/dist/antd.css';
import { Tabs, Divider, Card } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';

import React, { Component } from 'react'
const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);

 class Myfiles extends Component {
    render() {
        return (
            <Card style={{width:300 ,height:300 ,marginLeft:800 , marginTop:40}}> 
            <div >
                <Divider>My Files</Divider>
                 <StickyContainer>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
      <TabPane tab="Org Files" key="1" style={{ height: 200  }}>
        No Data Found
      </TabPane>
      <TabPane tab="Emp Files" key="2">
        No Data Found
      </TabPane>
      
    </Tabs>
  </StickyContainer>
                
            </div>
            </Card>
        )
    }
}

export default Myfiles
