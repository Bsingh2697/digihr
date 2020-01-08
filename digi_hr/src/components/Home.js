import React ,{Component} from 'react';
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import {Link , Router} from 'react-router-dom'
// import { Card, Col, Row , Modal , Button ,Input , Form} from 'antd';
import { Col, Row, Icon, Modal, Button, Input, Form} from 'antd';
import {  Divider } from 'antd';
//import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon} from 'mdbreact'
import './Home.css'
import Calender from './Calender'
import Carousel from './Carousel'
import LoginForm from './Company';
import Birth from './Birth'
import Task from './Task'
import NewJoin from './NewJoin'
import Drawercard from './Drawercard'
import Myfiles from './Myfiles'
import getCookie from './Getcookie'
import Holidays from './Holidays'
import { LayoutContext } from 'antd/lib/layout/layout';
import Homes from './Homes'
//import Task2 from './Task2.js'
import Homess from './Homess'
import axios from 'axios';
import createCookie1 from './createCookie1';
import createCookie from './createCookie'
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Department from './Department'
import { StickyContainer, Sticky } from 'react-sticky';



 class Home extends Component {
  Handleok=() =>{
    const { state = {} } = this.props.location;
    const { prevLocation } = state;
    this.setState(
        () => {
            this.props.history.push(prevLocation || "/home/task");
        },
    );
   }

    render() {
     
        return (
            <div style={{width:'100%', height:'100%', padding:'10px', borderRadius:'10px', backgroundImage:'linear-gradient(#745c97,#f5b0cb)'}}>
            <div className='mdc-card mdc-card--outlined'>
            <Row gutter={16}>
              <Col span={6}>
                <div className="mdc-card__media--square">
                <Card   className=" zoom">
                
                <div  >
            <Divider className='homeHeadings' style={{fontSize:24}}>My Task <MDBIcon icon="bell" size="1x" className="cyan-text pr-3" /></Divider>
          {/* <Task2/>      */}
         
            <Button  type="link" block style={{marginLeft:-20, marginTop:-950}} onClick={() =>  this.Handleok()}>
             <Icon type="solution" />View More Task  
            </Button>
           
             </div>
             
            
                </Card> 
                </div> 
             
              </Col>
              <Col span={6}>
                  <Card  className="zoom">
      <Divider className='homeHeadings' style={{fontSize:24}}>Birthday<MDBIcon icon="birthday-cake" size="1x" className="green-text pr-3" style={{marginLeft:10}} /></Divider>

                <Birth/>

              </Card>
              </Col>
              <Col span={6}>
              <Card  className="zoom">
              <Divider className='homeHeadings' style={{fontSize:24}}> New Joiners</Divider>
                <NewJoin/>
                </Card>  
              </Col>

              <Col span={6}>
              <Card  className="zoom" >
                <Divider className='homeHeadings' style={{fontSize:24 }}><span style={{width:'100%',textAlign:'center'}}>Department&nbsp;Members</span></Divider>
                <Department/>
                 <StickyContainer></StickyContainer>
                </Card  >  
              </Col>
            </Row>
            <Homes/>
            <Homess/>
          </div>
          </div>
        
        )
    }
}

export default withRouter( Form.create()(Home))
