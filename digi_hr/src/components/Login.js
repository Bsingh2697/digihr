import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Login.css';
import axios from 'axios';
import createCookie1 from './createCookie1'
import getCookie1 from './Getcookie1'
import getCookie from './Getcookie'
import cookieExists1 from './Cookieexists1'
import App from '../App'
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import log from './log.jpg';
require('./createCookie1')

const FormItem=Form.Item;

var value
var success

class Login extends React.Component {

  handleLogin1 = () => {
    const { state = {} } = this.props.location;
    const { prevLocation } = state;
  
    this.setState(
        {
            loggedIn: cookieExists1('id'),
        },
        () => {
            this.props.history.push(prevLocation || "/Home");
        },
    );
  };  
   
  constructor(props) {
    super(props)
   

    this.state = {
        empCode: '',
        password:'',
        iconLoading:false,
        dbName:getCookie('dbName')
    }
}
enterIconLoading = () => {
  this.setState({ iconLoading: true });
  setTimeout(() => {
      this.setState({ iconLoading: false });
  }, 3000);
};

handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
    axios.post('https://digihr-api.appspot.com/api/post/user/login/', this.state)
        .then(response => {
            console.log(response)
            var success1=response.data.success
            if(response.status === 200 && success1 === 1){
              var id = (response.data.login_data[0].id)
              var empCode = (response.data.login_data[0].empCode)
              var password = (response.data.login_data[0].password)
              var today = new Date()
              createCookie1('id', id, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()));
              createCookie1('empCode', empCode, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()));
              createCookie1('password', password, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()));
              if (cookieExists1('id'))
              this.handleLogin1()
  
      }
      else
          message.error(response.data.message)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.reportInTime)
        console.log(this.state.date) 
}

changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
}


  render() {
    const {empCode , password} = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <img src={log} className="img1"/>
      <div className="login-bg" style={{filter:'brightness(10%)'}}></div>
     <p className="head3">Digi HR is the digital transformation of HR services and processes through the use of social, mobile, analytics and cloud (SMAC) technologies. Digital HR represents a sea change in both the approach and execution, although it takes place on a continuum as organizations progress</p>
      <Form onSubmit={this.handleSubmit} className="login-form" style={{left:'45% !important'}}>
        <p className='loginHead'>Digi HR</p>
        <Form.Item>
          {getFieldDecorator('employee_code', {
            rules: [{ required: true, message: 'Please input employee code!' }],
          })(
            <Input name="empCode" value={empCode}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder=" Employee code" onChange={this.changeHandler}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })( 
            <Input.Password name="password" value={password}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder=" Password" onChange={this.changeHandler}
            />,
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox style={{width:'100%', textAlign:'center'}}>Remember me</Checkbox>)}
          <Button style={{border:'none'}} type="default" htmlType="submit" onSubmit={this.handleSubmit} loading={this.state.iconLoading} onClick={this.enterIconLoading} className="login-form-button">
            Submit
          </Button>
          <a className="login-form-forgot" href="">
            Forgot username/password
          </a>
        </Form.Item>
      </Form>
      <div className="footer">
          <a className="footer-data">About&nbsp;us</a>
          <a className="footer-data">Contact&nbsp;us</a>
          <a className="footer-data">Terms&nbsp;&#38;&nbsp;Conditions</a>
      </div>
   </React.Fragment>
    );
  }
}

export default Form.create()(Login)