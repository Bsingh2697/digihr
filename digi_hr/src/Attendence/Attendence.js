import {BrowserRouter as Router, Link, Switch} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import 'antd/dist/antd.css';
import './Attendence.css'
import { Layout, Menu, Icon ,Row , Col } from 'antd';
import {Avatar} from 'antd';
import React , {Component} from 'react'
import ff from './ff.png'
import addLeave from './AddLeave'
import AddOD from './AddOD'
import Myattendence from './Myattendence'
import Myregularization from './Myregularization'
import logo from './logo.png'
import Profile from '../components/Profile'
import Punch from './Punch'
import Punchout from './Punchout';
import Test from './Test'
import Regularizeattendence from './Regularizeattendence'



const { Header, Content, Footer, Sider } = Layout;




export class Attendence extends Component {
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
            <Layout >
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
                        <Icon type="bulb" theme="filled" />
                            <span>Punch IN/OUT</span>
                             <Link to="/attendence/punch" /> 
                        </Menu.Item>                     
                        <Menu.Item key="2">
                        <Icon type="database" theme="filled" />
                            <span>My Regularization</span>
                            <Link to="/attendence/Myregulation" />
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Icon type="container" theme="filled" />
                            <span>My Attendence</span>
                            <Link to="/attendence/Myattendence" />
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
                       
            </Col>
            <Col span={8}>
            <div style={{width:"100%",textAlign:'right',marginTop:'5px'}}>
              <a href="#">
                <span style={{fontSize: "20px", }} class="glyphicon glyphicon-cog "><span style={{fontSize: "15px", fontFamily:'Courier New'}}>Settings</span></span>
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
                          <Route exact path="/attendence/addLeave" component={addLeave} />
                          <Route exact path="/attendence/Addod" component ={AddOD} />
                          <Route exact path="/attendence/Myregulation" component ={Myregularization}/>
                          <Route exact path="/attendence/Myattendence" component ={Myattendence} />
                          <Route exact path ="/attendence/punch" component={Punch} />
                          <Route exact path="/attendence/punchout" component={Punchout} />
                          <Route exact path="/attendence/test" component={Test} />
                          <Route exact path="/attendence/regularizeattendence" component={Regularizeattendence} />
                      </Switch>
                  
                    </Content>
                
                </Layout>
                </Layout>
          </Router>
        )
    }
}

export default Attendence


