import React ,{Component} from 'react';
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import { Col, Row ,Drawer,Button,Radio,Icon ,message} from 'antd';
import { Tabs, Divider} from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
//import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon} from 'mdbreact'
import './Homes.css'
import Drawercard from './Drawercard'
import axios from 'axios';
import getCookie from './Getcookie'
import Department from './Department'
import Myfiles from './Myfiles'
import Holidays from './Holidays'
import Attendence from './Attendence';
import Calender from './Calender';
import getCookie1 from './Getcookie1'
import NewJoin from './NewJoin';
import Card from '@material-ui/core/Card'

    

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);

 class Homes extends Component {
 
        render() {
        return (
            <div  >
            <Row gutter={16}>
              <Col span={6}>
                <Card className="zoom2" >
                <Divider className='homeHeadings' style={{fontSize:25}}>Upcoming Holidays</Divider>
                        <Holidays/>
                </Card>
              </Col>
              <Col span={6}>
                <Card   className="zoom2">
                <Drawercard/> 
                </Card> 
              </Col>
              <Col span={6}>
                <Card   className="zoom2">
                <Calender/> 
                </Card> 
              </Col>
              <Col span={6}>
                <Card   className="zoom2">
                <Attendence/> 
                </Card> 
              </Col>
            </Row>
            
            
          </div>
          
        )
    }
}

export default Homes
