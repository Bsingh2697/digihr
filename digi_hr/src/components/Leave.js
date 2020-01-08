import React from "react";
import ReactDOM from "react-dom";
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
    message: 'Leave request Added Successfully',
    description:
      'You have to wait to approve the request',
  });
};

var empCode=getCookie1('empCode')

class Leave extends React.Component {
  
  constructor(props) {
    super(props)
   

    this.state = {
        leaveType:'',
        leaveReason:'',
        leaveDuration:'',
        startDate:'',
        endDate:'',
        managerComment:'',
        message:'',
        dbName:getCookie('dbName'),
     

        empCode:empCode
    }
    
}
handleSelectChange = (value) => {
  this.setState({leaveType:value})
  
  
  }
  handleSelect = (value) => {
    this.setState({leaveReason:value})
  }
  handleSelect1 = (value) => {
    this.setState({leaveDuration:value})
  }


handleSubmit = e => { 
     e.preventDefault();
    console.log(this.state)
    axios.post('https://digihr-api.appspot.com/api/leaveApplication/', this.state)
        .then(response => {
            console.log(response) 
            const { state = {} } = this.props.location;
            const { prevLocation } = state;
            this.setState(
                () => {
                    this.props.history.push(prevLocation || "/home/leavehistory");
                   
                    }   
            );
            var confirmation=response.data.confirmation

      })
        .catch(error => {
          console.log(error)
      })
      }
      onChange=(date,dateString) =>{
        this.setState({startDate:dateString})
        console.log(this.state.dependendDob)
      }
      onChange1=(date,dateString) =>{
        this.setState({endDate:dateString})
        console.log(this.state.dependendDob)
      }
  render() {
    const { startValue, endValue, endOpen  ,startDate,endDate } = this.state;
    const { getFieldDecorator  } = this.props.form;
    return (
      <div>
     
      {/* <Card style={{ width: 1200}}> */}
      <Divider className="divide">New Leave Request</Divider>
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
        <Form.Item style={{fontWeight:600}} label="Select Leave Reason">
          {getFieldDecorator("leaveDuration", {
            rules: [{  message: " select your Leave Reason!" }]
          })(
            <Select 
              placeholder="Select a option and change input text above"
              onChange={this.handleSelect1}
            >
              <Option value="HalfDay">Half Day</Option>
              <Option value="FullDay">Full Day</Option>
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
      <Form.Item style={{fontWeight:600}}  label="Message">
      {getFieldDecorator('Comment', {
        rules: [{ Required:true, message: 'Please input your message!' }],
     })(<Input name="message" value={message} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Message"    onChange={this.changeHandler}  />)}
       </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit" onClick={() => openNotificationWithIcon('success')}>
            Submit
          </Button>
        </Form.Item>
          </Form>
      </Card>
     
      </div>
    );
  }
}

export default withRouter(Form.create()(Leave))
