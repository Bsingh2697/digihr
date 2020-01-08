import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Switch} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import 'antd/dist/antd.css';

import { Layout, Menu, Icon ,Dropdown ,Row , Col, Modal } from 'antd';
import './Hris.css'
import FamilyDetails from './FamilyDetails'
import ContactDetails from './ContactDetails'
import MyUploader from './Images'
import BasicDetails from './BasicDetails'
import Positiondetails from './Positiondetails'
import PastEmploymentDetails from './PastEmploymentDetails'
import EducationDetails from './EducationDetails'
import BankDetails from './BankDetails'
import IDDetails from './IDDetails'
import Listemployee from './Listemployee';
import logo from './logo.png'
import Profile from '../components/Profile'
import  Basicinformation  from './Basicinformation';
import Modalview from './Modal';
import  IDinformation  from './IDinformation';
import ContactInformation  from './ContactInformation';
import  EmergencyContact  from './EmergencyContact';
import FamilyDetails1 from './FamilyDetails1';
import Pastemploymentdetails1 from './Pastemploymentdetails1'
import EducationDetails1 from './EducationDetails1'
import BankDetails1 from './BankDetails1'
import IDDetails1 from './IDDetails1'
import classes from '../components/Layout.module.css';

const { Header, Sider ,Content } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
 
  render() {
    return (
      <Router>
     <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{background:'#ffffff'}}>
                <div className="logo2" style={{backgroundImage:'linear-gradient(#745c97,#f5b0cb)', height:"75px", width:"1360px",textAlign:'left'}}>
                             <a href="/home" >
                             <img style={{display:'inline', float:'left', marginLeft:'45px'}} className="logo-img" src={logo}/>
                             </a>
                             <span style={{display:'inline', float:'right', marginTop:'30px', marginRight:'20px'}}>
                               <Profile/>
                             </span>
                    </div>
                    
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className="navtext" style={{ height: '100%' }}>
                        <Menu.Item key="1">
                        <Icon type="mail" theme="filled" />
                            <span>My Document</span>
                            <Link to="/Hris" />
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span className={classes.hoverTravel} style={{color: 'rgba(255, 255, 255, 0.65)'}}>
                                   <Icon type="hdd" theme="filled" />
                                    <span>My Details</span>
                           
                                </span>
                            }
                        >
                            <Menu.Item key="2"><span style={{fontSize:'12px'}}>Basic Details </span><Link to ="/Hris/Basicdetails" /> </Menu.Item>    
                            <Menu.Item key="3"><span style={{fontSize:'12px'}}>Position Details</span> <Link to="/Hris/Positiondetails"/></Menu.Item>
                            <Menu.Item key="4"><span style={{fontSize:'12px'}}>Contact Details</span><Link to="/Hris/ContactDetails" /> </Menu.Item>
                            <Menu.Item key="5"><span style={{fontSize:'12px'}}>Family Details</span><Link to="/Hris/familydetailsedit" /> </Menu.Item>
                        </SubMenu>
                      
                        <SubMenu
                            key="sub2"
                            title={
                                <span className={classes.hoverTravel} style={{color: 'rgba(255, 255, 255, 0.65)'}}>
                                    <Icon type="credit-card" theme="filled" />
                                    <span>Employment Details</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6"><span style={{fontSize:'12px'}}>Past Employment Details</span><Link to="/Hris/pastemployment" /></Menu.Item>
                            <Menu.Item key="7"><span style={{fontSize:'12px'}}>EducationDetails</span><Link to="/Hris/educationdetailss" /></Menu.Item>
                            <Menu.Item key="8"><span style={{fontSize:'12px'}}>Bank Details</span><Link to="/Hris/bankdetailss" /></Menu.Item>
                            <Menu.Item key="9"><span style={{fontSize:'12px'}}>ID Details</span><Link to="/Hris/Iddetailss"/></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="10">
                        <Icon type="idcard" theme="filled" />
                            <span>List Employees</span>
                            <Link to ="/Hris/listemployee" />
                        </Menu.Item>
                     
                    </Menu>
                    
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    <Row>
            {/* <Col span={10}>
            <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                       
            </Col> */}
            {/* <Col span={8}>
            <div style={{width:"100%",textAlign:'right',marginTop:'5px'}}>
              <a href="#">
                <span style={{fontSize: "20px", color:''}} class="glyphicon glyphicon-cog "><span style={{fontSize: "15px", fontFamily:"Courier New"}}>Settings</span></span>
              </a>
              </div>
            </Col>
            <Col span={6}>
            
             <Profile/> 
            </Col> */}
          </Row>
                     
                       
                        <Menu mode="horizontal" className="topnav">
                                <Menu.Item key="user">
                                   
                                </Menu.Item>
                            
                           
                           
                        </Menu>
                    </Header>
                    <Content
                        style={{
                            margin: '12px 12px',
                            padding: 24,
                            background: '#fff',
                            minHeight: '56vw',
               
                        }} 
                    >

                        <Switch>
                             <Route exact path="/Hris/Basicdetails" component={BasicDetails} />  
                               <Route exact path="/Hris/basicinformation" component={Basicinformation} /> 
                             <Route exact path="/Hris/Positiondetails" component={Positiondetails} />
                             <Route exact path="/Hris/Contactdetails" component={ContactDetails} />
                             <Route exact path="/Hris/Familydetails" component={FamilyDetails} />
                             <Route exact path="/Hris/Pastemploymentdetails" component={PastEmploymentDetails} />
                             <Route exact path="/Hris/Educationdetails" component={EducationDetails} />
                             <Route exact path="/Hris/Bankdetails" component={BankDetails} />
                             <Route exact path="/Hris/Iddetails" component={IDDetails} />
                             <Route exact path="/Hris/listemployee" component={Listemployee} />
                             <Route exact path="/Hris/modal" component={Modalview} />
                             <Route exact path="/Hris/idinformation" component={IDinformation} />
                             <Route exact path="/Hris/contactinformation" component={ContactInformation} />
                             <Route exact path="/Hris/emergencycontact" component={EmergencyContact} />
                             <Route exact path="/Hris/familydetailsedit" component={FamilyDetails1} />
                             <Route exact path="/Hris/pastemployment" component={Pastemploymentdetails1} />
                             <Route exact path="/Hris/educationdetailss" component={EducationDetails1} />
                             <Route exact path="/Hris/bankdetailss" component={BankDetails1} />
                             <Route exact path="/Hris/Iddetailss" component={IDDetails1} />
                             
                        </Switch> 
                  
                    </Content>
                
                </Layout>
            </Layout>
            </Router>
        
        
      

    );
  }
}
export default SiderDemo