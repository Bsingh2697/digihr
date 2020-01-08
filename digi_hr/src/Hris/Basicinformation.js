import "antd/dist/antd.css";
import { Form, Select, Input, Button ,Icon ,notification} from "antd";
import { DatePicker ,message } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import axios from 'axios'
import React, { Component } from 'react'
import getCookie1 from "../components/Getcookie1";
import getCookie from '../components/Getcookie' 

const { Option } = Select;
const ButtonGroup = Button.Group;

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var name, title, mobile,email,role

export class Basicinformation extends Component {

  constructor(props) {
    super(props)

    this.state = {
        basics:[],
        title: '',
        firstName: '',
        lastName:'',
        empCode: '',
        role: '',
        mobile:'',
        email:'',
        name:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
    componentDidMount(){
      axios.get('https://digihr-api.appspot.com/api/show/basicDetails/',
      {
          params:{
              empCode: getCookie1('empCode'),
              dbName:getCookie('dbName')
          }
      })
      .then(response => {
        console.log(response)
        title = response.data.emp_data[0].title;
         name = response.data.emp_data[0].name;
         empCode = response.data.emp_data[0].empCode;
         email = response.data.emp_data[0].email;
         mobile = response.data.emp_data[0].mobile;
         role = response.data.emp_data[0].role;
        console.log(response.data.emp_data)
        this.setState({basics:response.data.emp_data})
         
         console.log(response.data.emp_data)
         this.setState({
          title:title,
          name:name,
          empCode:empCode,
          email:email,
          mobile:mobile,
         role:role   
         })
      })
    .catch(error => {
      console.log(error)
    })  
    }

handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/update/basicDetails/', this.state)
      .then(response => {
          console.log(response)
      })
      .catch(error => {
          console.log(error)
      })
      const { state = {} } = this.props.location;
      const { prevLocation } = state;
      this.setState(
          () => {
              this.props.history.push(prevLocation || "/Hris/Basicdetails");
              }
            
        
      );
     
}

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
handleSelectChange = (value) => {
  this.setState({title:value})
  
  
  }
  openNotificationWithIcon = type => {
    notification[type]({
      message: 'Basic Details Added Successfully',
      description:
        'You Have to Wait for the approval to update.',
    });
  };

   
      handleReset = () => {
        this.props.form.resetFields();
      };
    render() {
      const {basics} =this.state

        const { getFieldDecorator } = this.props.form;
        return (
            <div >
         
          
            <Divider className="divide" >Basic Information</Divider>
            <Card className="shadow-box"  style={{ width:700 ,fontWeight:400,marginLeft:180}}>
           
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              onSubmit={this.handleSubmit}
            >
  
  <Form.Item style={{fontWeight:600}} label="Title">
          {getFieldDecorator("title", {
            rules: [{  message: "select your title" }]
          })(
            <Select 
              placeholder="Tilte"
              onChange={this.handleSelectChange}
            >
              <Option  value="Mr">Mr.</Option>
              <Option value="Mrs">Mrs.</Option>
            </Select>
          )}
        </Form.Item>
   
            
              <Form.Item style={{fontWeight:600}}label=" Name">
                {getFieldDecorator('employee_name', {
                  rules: [{ message: 'Please input your name!' }],
                })(<Input  name="name" value={name} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name"   onChange={this.changeHandler}  />)}
              </Form.Item>   
              <Form.Item style={{fontWeight:600}} label="Employee Type">
                {getFieldDecorator('employee_type', {
                  rules: [{  message: 'Please input employee type!' }],
                })(<Input name="role" value={role} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Role"   onChange={this.changeHandler} />)}
              </Form.Item>

               <Form.Item style={{fontWeight:600}} label="Mobile Number">
                {getFieldDecorator('number', {
                  rules: [{  message: 'Please input your number!' }],
                })(<Input name="mobile" value={mobile} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Mobile"  onChange={this.changeHandler} />)}
              </Form.Item>
           
              <Form.Item style={{fontWeight:600}} label="Email">
                {getFieldDecorator('email', {
                  rules: [{  message: 'Please input your email!' }],
                })(<Input name="email" value={email} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Email"  onChange={this.changeHandler} />)}
              </Form.Item>
          
              <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <ButtonGroup>
      <Button type="primary" htmlType="submit" onClick={() =>  this.openNotificationWithIcon('success')}>Save</Button>
      <Button onClick={this.handleReset}>Clear</Button>
    </ButtonGroup>
               
              </Form.Item>
              
              
                </Form>
             
            </Card>
        
            </div>
           
        )
    }
}

export default Form.create()(Basicinformation)
