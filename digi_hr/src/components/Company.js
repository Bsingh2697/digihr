import React, { Component } from 'react'
//import $ from 'jquery'
import Typed from 'react-typed';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,  Switch} from 'react-router-dom'
import {Link ,Route} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import './Company.css'
import {Form ,Input ,Icon, Button ,message ,Alert} from 'antd'
import axios from 'axios';
import createCookie from './createCookie'
import getCookie from './Getcookie'
import cookieExists from './Cookieexists'
import App from '../App'
import logo from './logo.png'
import log from './log.jpg'
import deleCookies from './deleteCookies' 
require('./createCookie')


const FormItem=Form.Item;
 

var value
var success
var type

function myFunction(){
type =setTimeout(showPage , 1650)
console.log("dlskdlsld")

}
function showPage(){
  document.getElementById("loader").style.display ="none";
  document.getElementById("myDiv").style.display ="block" ;
}

class LoginForm extends Component {

 

constructor(props) {
  super(props)

  this.state = {
     companyName: '' ,
     iconLoading:false
     
  
  }
}
  componentDidMount = (e) => {
    myFunction()
}
enterIconLoading = () => {
  this.setState({ iconLoading: true });
  setTimeout(() => {
      this.setState({ iconLoading: false });
  }, 3000);
};

handleLogin = () => {
  const { state = {} } = this.props.location;
  const { prevLocation } = state;

  this.setState(
      {
          loggedIn: cookieExists('id'),
      },
      () => {
          this.props.history.push(prevLocation || "/Login");
      },
  );
}; 
 
 


handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/company/', this.state)
      .then(response => {
          console.log(response)
          var success=response.data.success
          if(response.status === 200 && success === 1){
            var id = (response.data.datasets[0].id)
            var name = (response.data.datasets[0].companyName)
            var dbName=(response.data.datasets[0].dbName)
            var today = new Date()
            createCookie('id', id, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()));
            createCookie('companyName', name, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()));
            createCookie('dbName', dbName, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()));
            if (cookieExists('id'))
            this.handleLogin() &&
            message.loading('Action in progress..', 0)
    }
    else
  
      message.error(response.data.message)
    
   

               
            
          
            
    
      })
      .catch(error => {
          console.log(error)
      })
}

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}



    render() {
      const{companyName} =this.state;
        const { getFieldDecorator } = this.props.form;
        return (
          <div style={{}}>
          <div className="typed"  id="loader" >
            <div> <img className="log" src={logo} ></img></div>
           
          <Typed className="nav"
              strings={[
                  'We Create Experience']}
                  typeSpeed={40}
                  loop={true}
                  loopCount={Infinity}>
                  
              </Typed> 
              </div>
              
          <div style={{display:'none'}} id="myDiv" className="landing-main-div animate-bottom"></div>
          
          <div  className="login-bg1" style={{width:"100%"}}>

          <img className="img" src={log}></img>
          <div className='FormBox'>
          <Form onSubmit={this.handleSubmit} className="login-formC">
          <p className="head6">Verify&nbsp;Your&nbsp;Company</p>
        <Form.Item >
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: 'Please input your company name!' }],
          })(
            <Input style={{width:"90%"}} name="companyName" value={companyName}
              prefix={<Icon type="right-circle"   style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder=" Company name" onChange={this.changeHandler}
            />,
          )}
        </Form.Item>
            <Form.Item style={{textAlign:'center'}}>
            <Button style={{width:"93%", marginLeft:'10px'}} type="default" htmlType="submit" onSubmit={this.handleSubmit} loading={this.state.iconLoading} onClick={this.enterIconLoading}  className="login-form-button">
           Submit
          </Button>
            </Form.Item>
          </Form>
          </div>
          <p className="head5">Digital HR is the digital transformation of HR services and processes through the use of social, mobile, analytics and cloud (SMAC) technologies. Digital HR represents a sea change in both the approach and execution, although it takes place on a continuum as organizations progress</p>
          </div>
          <div className="footer">
            <a className="footer-data">About&nbsp;us</a>
            <a className="footer-data">Contact&nbsp;us</a>
            <a className="footer-data">Terms&nbsp;&#38;&nbsp;Conditions</a>
         </div>
          </div>
        
          
   )
  }
}

export default withRouter (Form.create()(LoginForm))