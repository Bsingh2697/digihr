import 'antd/dist/antd.css';
import { Tabs, Icon } from 'antd';
import React , {Component} from 'react'
import { StickyContainer, Sticky } from 'react-sticky';
import ContactInformation from './ContactInformation'
import EmergencyContact from './EmergencyContact'
import Contactinformation1 from './Contactinformation1'
import EmergencyContact1 from './EmergencyContact1'

const { TabPane } = Tabs;
const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
      )}
    </Sticky>
  );

export class ContactDetails extends Component {
  render() {
    return (
      <StickyContainer style={{marginTop:-20}}>
      <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
        <TabPane tab="Conatct Information" key="1" style={{ height: 800 }}>
       <Contactinformation1/>
        </TabPane>
        <TabPane tab="Emergency Contact" key="2" style={{ height: 800 }}>
        <EmergencyContact1/>
        </TabPane>
      </Tabs>
    </StickyContainer>
    )
  }
}

export default ContactDetails
