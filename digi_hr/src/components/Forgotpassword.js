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
import log from './log.png';
require('./createCookie1')

const FormItem=Form.Item;


export class Forgotpassword extends Component {
    render() {
        return (
            <div>
                 <div className="login-bg">
        <img src={log} className="img1"></img>
     <h1 className="head4">Log&nbsp;in</h1>
     <p className="head3">Digi HR is the digital transformation of HR services and processes through the use of social, mobile, analytics and cloud (SMAC) technologies. Digital HR represents a sea change in both the approach and execution, although it takes place on a continuum as organizations progress</p>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('employee_code', {
            rules: [{ required: true, message: 'Please input employee code!' }],
          })(
            <Input name="empCode" value={empCode}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Employee code" onChange={this.changeHandler}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input name="password" 
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password" onChange={this.changeHandler}
            />,
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox style={{marginLeft:-38}}>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="default" htmlType="submit" onSubmit={this.handleSubmit} loading={this.state.iconLoading} onClick={this.enterIconLoading} className="login-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form> 
            </div>
            </div>
        )
    }
}

export default Forgotpassword
