import React, { Component } from 'react'
import "antd/dist/antd.css";
import { Form, Select, Input, message ,Icon } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import axios from 'axios'
import { Button, notification } from 'antd';
import { Divider } from 'antd';
import './Leave.css'
import getCookie1 from './Getcookie1'
import createCookie1 from './createCookie1'
import cookieExists1 from './Cookieexists1'
import getCookie from './Getcookie'
import { Link, withRouter } from 'react-router-dom'

const { Option } = Select;
const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Leave request Resubmitted Successfully',
    description:
      'You have to wait to approve the request',
  });
};

var empCode=getCookie1('empCode')
var taskCode=getCookie('taskCode')

export class Submit extends Component {
    constructor(props) {
        super(props)
       
    
        this.state = {
            leaveType:'',
            reason:'',
            duration:'',
            startDate:'',
            endDate:'',
            managerComment:'',
            message:'',
            dbName:getCookie('dbName'),
            taskCode:getCookie('taskCode'),
            taskId:getCookie('taskId')
}
        
}
handleSelectChange = (value) => {
 this.setState({leaveType:value})              
}
handleSelect = (value) => {
this.setState({reason:value})
}
changeHandler =(value) =>{
this.setState({duration:value})
}
onChange=(date,dateString) =>{
 this.setState({startDate:dateString})
 console.log(this.state.dependendDob)
}
onChange1=(date,dateString) =>{
 this.setState({endDate:dateString})
 console.log(this.state.dependendDob)
 }
 changeHandler1 = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
handleSubmit = e => { 
    e.preventDefault();
   console.log(this.state)
   axios.post('https://digihr-api.appspot.com/api/resubmit/leave/', this.state)
       .then(response => {
           console.log(response) 
           
           var confirmation=response.data.confirmation

     })
       .catch(error => {
         console.log(error)
     })
     }
      
    render() {
    const { startValue, endValue, endOpen  ,startDate,endDate ,leaveType,reason,duration,message ,managerComment } = this.state;
    const { getFieldDecorator  } = this.props.form;
        return (
            <div>
                 <Divider className="divide">Resubmit Leave Request</Divider>
      <Card className="leave">
     
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item style={{fontWeight:600}} label="Select Leave Types">
          {getFieldDecorator("leaveType", {
            rules: [{  message: "select your Leave types" }]
          })(
            <Select 
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option  value="CL">CL</Option>
              <Option value="EL">SL</Option>
              <Option value="SL">EL</Option>
              <Option value="COMPENSATORY LEAVE">COMPENSATORY LEAVE</Option>
            </Select>
          )}
        </Form.Item>
   
        <Form.Item style={{fontWeight:600}} label="Select Leave Reason">
          {getFieldDecorator("leaveReason", {
            rules: [{  message: " select your Leave Reason!" }]
          })(
            <Select 
              placeholder="Select a option and change input text above"
              onChange={this.handleSelect}
            >
              <Option value="Personal">Personal</Option>
              <Option value="Not well">Not well</Option>
              <Option value="Others">Others</Option>
            </Select>
          )}
        </Form.Item> 
         <Form.Item style={{fontWeight:600}} label="Select Leave Duration">
          {getFieldDecorator("leaveDuration", {
            rules: [{  message: "select your Leave Duration!" }]
          })(
            <Select 
              placeholder="Select a option and change input text above"
              onChange={this.changeHandler}
            >
              <Option value="Full Day">Full Day</Option>
              <Option value="Half Day">Half Day</Option>
            </Select>
          )}
        </Form.Item> 
      <Form.Item style={{marginLeft:-5 , fontWeight:600}} label="Start Date">
      <DatePicker style={{marginLeft:-180}}
        disabledDate={this.disabledStartDate}
        
        format="MM/DD/YYYY"
        placeholder="Start"
         onChange={this.onChange} 
      />
      </Form.Item>
      <Form.Item style={{marginLeft:-5 , fontWeight:600}} label="End Date">
      <DatePicker style={{marginLeft:-180}}
        disabledDate={this.disabledStartDate}
        
        format="MM/DD/YYYY"

        placeholder="end"
         onChange={this.onChange1} 
      />
      </Form.Item>
      <Form.Item style={{fontWeight:600}}  label="Manager Comment">
      {getFieldDecorator('Comment', {
        rules: [{ Required:true, message: 'Please input your message!' }],
     })(<Input name="managerComment" value={managerComment} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Message"    onChange={this.changeHandler1}  />)}
       </Form.Item>
      <Form.Item style={{fontWeight:600}}  label="Message">
      {getFieldDecorator('message', {
        rules: [{ Required:true, message: 'Please input your message!' }],
     })(<Input name="message" value={message} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Message"    onChange={this.changeHandler1}  />)}
       </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit" onClick={() => openNotificationWithIcon('success')}>
            Submit
          </Button>
        </Form.Item>
          </Form>
      </Card>
      </div>
        )
    }
}

export default Form.create()(Submit)
