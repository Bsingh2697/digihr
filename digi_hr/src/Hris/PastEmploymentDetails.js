import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon ,notification } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'
import axios from 'axios'

import React, { Component } from 'react'

const { Option } = Select;
const ButtonGroup = Button.Group

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')

var title , companyName , empcode, startDate , endDate , empType ,role

export class PastEmploymentDetails extends Component {
    
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        title: '',
        companyName: '',
        startDate:'',
        endDate:'',
        empType:'',
        role:'' ,
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/get/job/info/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
      title = response.data.emp_data[0].title;
      companyName = response.data.emp_data[0].companyName;
    //  empcode = response.data.emp_data.empcode;
     startDate = response.data.emp_data[0].startDate;
     endDate = response.data.emp_data[0].endDate;
     empType = response.data.emp_data[0].empType ;
     role = response.data.emp_data[0].role;
     
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      title:title,
      companyName:companyName,
      // empcode:empcode,
      startDate:startDate,
      endDate:endDate,
      empType:empType,
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
  axios.post('https://digihr-api.appspot.com/api/update/jobInfo/', this.state)
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
              this.props.history.push(prevLocation || "/Hris/pastemployment");
              }
            
         
      );
}


changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
handleSelect = (value) => {
  this.setState({title:value})
}
onChange=(date,dateString) =>{
  this.setState({startDate:dateString})
}
onChange1=(date,dateString) =>{
  this.setState({endDate:dateString})
}



handleReset = () => {
        this.props.form.resetFields();
        
};
openNotificationWithIcon = type => {
  notification[type]({
    message: 'Personal Details Added Successfully',
    description:
      'You Have to Wait for the approval to update.',
  });
};


      
      render() {
         const { startValue, endValue, endOpen , posts } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
          <div>
         
          
          <Divider style={{marginTop:-25}} className="divide" >Personal Information</Divider>
          <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
         
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onSubmit={this.handleSubmit}
          >
          {posts.map(post =>
    
    <Form.Item style={{fontWeight:600}} label="Job Title">
      {getFieldDecorator('companyname', {
        rules: [{ message: 'Please input your Company Name !' }],
      })(<Input name="title" value={title} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "title"    onChange={this.changeHandler}  />)}
    </Form.Item>
            )}
            {posts.map(post =>
    
            <Form.Item style={{fontWeight:600}} label="Company Name">
              {getFieldDecorator('companyname', {
                rules: [{ message: 'Please input your Company Name !' }],
              })(<Input name="companyName" value={companyName} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Company Name"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>

            <Form.Item style={{fontWeight:600 ,marginLeft:-5}} label="Start Date">
          <DatePicker style={{marginLeft:-180}}
            showTime
            format="DD/MM/YYYY "
            placeholder="Start Date"
            onOpenChange={this.onChange}
          />
          </Form.Item>
            )}
            {posts.map(post =>
          <Form.Item style={{fontWeight:600 ,marginLeft:-5}} label="End Date">
          <DatePicker style={{marginLeft:-180}}
            showTime
            format="DD/MM/YYYY "
            placeholder="End Date"
            onChange={this.onChange1}
          />
          </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Employee Type">
              {getFieldDecorator('employye type', {
                rules: [{  message: 'Please input your employee type!' }],
              })(<Input name="empType" value={empType} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Employee Type"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Role">
              {getFieldDecorator('role', {
                rules: [{  message: 'Please input your role!' }],
              })(<Input name="role" value={role} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Role"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
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
    

export default Form.create()(PastEmploymentDetails)
