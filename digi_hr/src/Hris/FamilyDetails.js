import "antd/dist/antd.css";
import { Form, Select, Input, Button, Icon ,notification } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import axios from 'axios'

import React, { Component } from 'react'
import getCookie1 from '../components/Getcookie1';
import getCookie from '../components/Getcookie'

const { Option } = Select;
const ButtonGroup=Button.Group;

var empCode= getCookie1('empcode')
var dbName = getCookie('dbName')

var dependentName , dependendRelation , dependendGendor , dependendDob , dependendMaritalStatus, dependendBloodGroup , dependendAddress , dependendMobile

export class FamilyDetails extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        dependentName: '',
        dependendRelation: '',
        dependendGendor: '',
        dependendDob:'',
        dependendMaritalStatus:'',
        dependendBloodGroup:'',
        dependendAddress:'' ,
        dependendMobile:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}

componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/employee/dependend/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
    dependentName = response.data.emp_data[0].dependentName;
     dependendRelation = response.data.emp_data[0].dependendRelation;
     dependendGendor = response.data.emp_data[0].dependendGendor;
     dependendMaritalStatus = response.data.emp_data[0].dependendMaritalStatus;
     dependendBloodGroup = response.data.emp_data[0].dependendBloodGroup ;
      dependendDob=response.data.emp_data[0].dependendDob;
     dependendAddress = response.data.emp_data[0].dependendAddress;
     dependendMobile=response.data.emp_data[0].dependendMobile
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      dependentName:dependentName,
      dependendRelation:dependendRelation,
      dependendGendor:dependendGendor,
      dependendMaritalStatus:dependendMaritalStatus,
       dependendDob:dependendDob,
      dependendBloodGroup:dependendBloodGroup,
      dependendAddress:dependendAddress,
      dependendMobile:dependendMobile
     })
  })
.catch(error => {
  console.log(error)
})  
}

handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/update/dependendInfo/', this.state)
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
              this.props.history.push(prevLocation || "/Hris/familydetailsedit");
              }
            
         
      );
}
openNotificationWithIcon = type => {
  notification[type]({
    message: 'Family Details Added Successfully',
    description:
      'You Have to Wait for the approval to update.',
  });
};

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
onChange=(date,dateString) =>{
  this.setState({dependendDob:dateString})
  console.log(this.state.dependendDob)
}
handleSelect = (value) => {
  this.setState({dependendGendor:value})
}

  handleReset = () => {
    this.props.form.resetFields();
    
  };


  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
 
    });
  };
  render() {
    const { startValue, endValue, endOpen ,posts } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
     
      
      <Divider style={{marginTop:-10}} className="divide">Family Information</Divider>
      <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
     
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onSubmit={this.handleSubmit}
      >
        {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Dependent Name">
          {getFieldDecorator('dependent name', {
            rules: [{ message: 'Please input name!' }],
          })(<Input name="dependentName" value={dependentName} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "dependentName"    onChange={this.changeHandler}  />)}
        </Form.Item>
        )}
        {posts.map(post =>

        <Form.Item style={{fontWeight:600}} label="Relation">
          {getFieldDecorator('relation', {
            rules: [{ message: 'Please input !' }],
          })(<Input name="dependendRelation" value={dependendRelation} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Relation"    onChange={this.changeHandler}  />)}
        </Form.Item>
        )}
        {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Gender">
          {getFieldDecorator("gender", {
            rules: [{ message: " select Gender!" }]
          })(
            <Select
              placeholder="Gender"
              onChange={this.handleSelect}
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Both">Both</Option>
            </Select>
            
          )}
        </Form.Item>
        )}
       {posts.map(post =>
      <Form.Item style={{marginLeft:-5 , fontWeight:600}} label="Date of Birth">
        <DatePicker style={{marginLeft:-180}}
      
        
        format="YYYY-MM-DD"
        placeholder="Date of Birth"
          onChange={this.onChange}
      />
      </Form.Item>
       )}
      
        {posts.map(post =>
     
        <Form.Item style={{fontWeight:600}} label="Marital Status">
          {getFieldDecorator('Status', {
            rules: [{  message: 'Please input your status!' }],
          })(<Input name="dependendMaritalStatus" value={dependendMaritalStatus} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "MaritalStatus"    onChange={this.changeHandler}  />)}
        </Form.Item>
        )}
        {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Blood Group">
          {getFieldDecorator('Blood Group', {
            rules: [{message: 'Please input your note!' }],
          })(<Input name="dependendBloodGroup" value={dependendBloodGroup} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "BloodGroup"    onChange={this.changeHandler}  />)}
        </Form.Item>
        )}
        {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Address">
          {getFieldDecorator('Address', {
            rules: [{  message: 'Please input your address!' }],
          })(<Input name="dependendAddress" value={dependendAddress} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Address"    onChange={this.changeHandler}  />)}
        </Form.Item>
        )}
        {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Mobile">
          {getFieldDecorator('Mobile', {
            rules: [{ message: 'Please input mobile no!' }],
          })(<Input name="dependendMobile" value={dependendMobile} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "MobileNumber"    onChange={this.changeHandler}  />)}
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

export default Form.create()(FamilyDetails)
