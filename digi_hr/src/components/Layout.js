import React ,{Component} from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Link, Switch} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import 'antd/dist/antd.css';
import './Navbar.css';
import {Breadcrumb,Layout, Menu, Icon, Card ,Divider ,Row , Col  ,Spin , Alert} from 'antd';
import { Avatar } from 'antd';
import Calender from './Calender'
import Carousel from './Carousel' 
import LoginForm from './Company';
import Birth from './Birth'
import Task from './Task'
import NewJoin from './NewJoin'
import { LayoutContext } from 'antd/lib/layout/layout';
import innohr from './innohr.png'
import ff from './ff.png'
import Leave from './Leave';
import Home from './Home'
import Profile from './Profile'
import logo from './logo.png'
import Travel from './Travel'
import Employeedetails from './Employeedetails';
import Testtable from './Testtable';
import MainLeave from './MainLeave'
import Addexpense from './Addexpense';
import getCookie1 from './Getcookie1';
import LeaveHistory from './LeaveHistory';
//import Viewexpense from './Viewexpense';
import Employeedetails1 from './Employeedetails1';
import Submit from './Submit';
import classes from './Layout.module.css';
import { withConfigConsumer } from 'antd/lib/config-provider/context';

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

import aliyunTheme from '@ant-design/aliyun-theme';

const { Header, Sider, Content ,Footer} = Layout;
const {SubMenu} =Menu;

class SiderDemo extends Component {
  state = {
    collapsed: false,
    
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
    
  render() {
    return (
      <Router>
        <Layout >
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{background:'#ffffff'}}>
                    <div className="logo2" style={{backgroundImage:'linear-gradient(#745c97,#f5b0cb)', height:"75px", width:"1360px",textAlign:'left'}}>
                             <a href="/home" >
                             <img style={{display:'inline', float:'left', marginLeft:'45px'}} className="logo-img" src={logo}/>
                             </a>
                             <span style={{display:'inline', float:'right', marginTop:'30px', marginRight:'20px'}}>
                               <Profile/>
                             </span>
                    </div>
                    
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className="navtext" style={{ height: '100%'}}> 
                        {/* HOME */}
                        <Menu.Item key="1">
                        <Icon type="home" theme="filled" />
                            <span style={{fontSize:'12px'}}>HOME</span>
                             <Link to="/home" /> 
                        </Menu.Item>        
                       {/* HRIS */}
                        <Menu.Item key="2">
                        <Icon type="hdd" theme="filled" />
                            <span style={{fontSize:'12px'}}>HRIS</span>
                            <a href="/Hris" />
                        </Menu.Item>
                        {/* ATTENDANCE */}
                        <Menu.Item key="3">
                        <Icon type="schedule" theme="filled" />
                            <span style={{fontSize:'12px'}}>ATTENDANCE</span>
                            <a href="/attendence/punch" />
                        </Menu.Item>
                        {/* LEAVE */}
                        <Menu.Item key="4">
                        <Icon type="edit" theme="filled" />
                            <span style={{fontSize:'12px'}}>LEAVE</span>
                            <Link to="/home/Leave" />
                        </Menu.Item>
                        {/* TRAVEL */}
                        <SubMenu
                            key="sub2"
                            title={
                                <div className={classes.hoverTravel} style={{color: 'rgba(255, 255, 255, 0.65)'}}>
                                    <Icon className="icon" type="shopping" theme="filled" />
                                    <span style={{fontSize:'12px'}}>TRAVEL</span>
                                </div>
                            }>
                            {/* Add Expense */}
                            <Menu.Item key="6"><span style={{fontSize:'10px'}}>Add Expense</span><Link to="/home/addexpense" /></Menu.Item>
                            {/* <Menu.Item key="7"><span>View Expense</span><Link to="/home/viewexpense" /></Menu.Item> */}
                        </SubMenu>
                    </Menu>
                    
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                       
          {/* <Row style={{backgroundImage: 'linear-gradient(#745c97,#f5b0cb)',width:'100%',textAlign:'right'}}>
            <Col span={4} className={classes.topMenu}>
                <Profile/>
            </Col>
          </Row> */}


                        {/* <Menu mode="horizontal" className="topnav">
                                <Menu.Item key="user">
                                <Row gutter={16} style={{width:'250px'}}>  
                                <Col span={10}>
                                  <div style={{width:"30%",textAlign:'left',marginRight:'25px',paddingLeft:'-50px'}}>
                                    <a href="#">
                                      <span style={{fontSize: "20px", color:''}} class="glyphicon glyphicon-cog "><span style={{fontSize: "15px", fontFamily:"Courier New"}}>Settings</span></span>
                                    </a>
                                    </div>
                                  </Col>
                                  <Col span={10}>
                                  <div style={{width:"30%",textAlign:'right',marginleft:'25px', marginBottom:'10px',paddingRight:'-50px'}}>
                                    <Profile/> 
                                  </div>  
                                  </Col>
                                  </Row>
                                </Menu.Item>
                        </Menu> */}

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
                        
                          <Route exact path="/Home" component={Home}/>   
                      
                         
                          <Route exact path="/home/Leave" component={MainLeave} />

                        
                         
                        <Route exact path="/home/Travel" component={Travel} />
                    
                        <Route exact path="/home/employeedetails" component={Employeedetails} />
                        <Route exact path="/home/task" exact component={Task} />
                        <Route exact path="/home/leavehistory" component={Testtable} />
                        <Route exact path="/home/addexpense" component={Addexpense}/>
                        <Route exact path="/home/testtable" component={LeaveHistory} />
                        {/* <Route exact path="/home/viewexpense" component={Viewexpense} /> */}
                        <Route exact path="/home/employeedetails1" component={Employeedetails1} />
                        <Route exact path="/home/resubmit" component={Submit} />
                        </Switch>    
                    </Content>
                
                </Layout>
                </Layout>
        </Router>
    );
  }
}

export default SiderDemo
          