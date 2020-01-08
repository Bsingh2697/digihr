import "antd/dist/antd.css";
import { Form, Input, Button, Radio, Select ,Divider ,Icon ,notification} from "antd";
import { Card } from 'antd';
import React, { Component } from 'react';
import getCookie1 from '../components/Getcookie1'
import axios from 'axios'
import getCookie from '../components/Getcookie'

const {Option} =Select;
const ButtonGroup =Button.Group;
var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var contactName , relation, mobile , officeNo ,email , address

export class EmergencyContact extends Component {

constructor(props) {
    super(props)

    this.state = {
        posts:[],
        contactName: '',
        relation: '',
        officeNo: '',
        mobile:'',
        email:'',
        address:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/show/EmergencyContact/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
    contactName = response.data.emp_data[0].contactName;
     relation = response.data.emp_data[0].relation;
     officeNo = response.data.emp_data[0].officeNo;
     email = response.data.emp_data[0].email;
     mobile = response.data.emp_data[0].mobile;
     address = response.data.emp_data[0].address;
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      contactName:contactName,
      relation:relation,
      officeNo:officeNo,
      email:email,
      mobile:mobile,
      address:address   
     })
  })
.catch(error => {
  console.log(error)
})  
}
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/update/emergency/', this.state)
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
              this.props.history.push(prevLocation || "/Hris/Contactdetails");
              }
            
        
      );
}

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}

  handleReset = () => {
    this.props.form.resetFields();
  };
  openNotificationWithIcon = type => {
    notification[type]({
      message: 'Contact Details Added Successfully',
      description:
        'You Have to Wait for the approval to update.',
    });
  };
render() {
    const { startValue, endValue, endOpen ,posts } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
        <div >
     
      
        <Divider className="divide" >EmergencyContact</Divider>
        <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
       
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          onSubmit={this.handleSubmit}
        >
          {posts.map(post =>
        <Form.Item style={{fontWeight:600}}label="Contact Name">
            {getFieldDecorator('contactname', {
              rules: [{ message: 'Please input your contact name!' }],
            })(<Input name="contactName" value={contactName} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "contactName"   onChange={this.changeHandler} />)}
          </Form.Item>
          )}
          {posts.map(post =>
          <Form.Item style={{fontWeight:600}}label="Contact Relationship">
            {getFieldDecorator('relationship', {
              rules: [{ message: 'Please input contact relationship!' }],
            })(<Input  name="relation" value={relation} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "relation"    onChange={this.changeHandler} />)}
          </Form.Item>
          )}
          {posts.map(post =>
          <Form.Item style={{fontWeight:600}} label="Mobile Number">
            {getFieldDecorator('mobilenumber', {
              rules: [{ message: 'Please input mobile number !' }],
            })(<Input  name="mobile" value={mobile} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "mobile"    onChange={this.changeHandler} />)}
          </Form.Item>
          )}
       
          {posts.map(post =>
          <Form.Item style={{fontWeight:600}} label="Office Number">
            {getFieldDecorator('officenumber', {
              rules: [{  message: 'Please input office number!' }],
            })(<Input  name="officeNo" value={officeNo} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "officeNo"    onChange={this.changeHandler} />)}
          </Form.Item>
          )}
          {posts.map(post =>
          <Form.Item style={{fontWeight:600}} label="Email Id">
            {getFieldDecorator('emailid', {
              rules: [{  message: 'Please input your email id!' }],
            })(<Input  name="email" value={email} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "email"    onChange={this.changeHandler} />)}
          </Form.Item>
          )}
          {posts.map(post =>
          <Form.Item style={{fontWeight:600}} label="Contact Address">
            {getFieldDecorator('contactaddress', {
              rules: [{  message: 'Please input Contact Address!' }],
            })(<Input  name="address" value={address} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "address"    onChange={this.changeHandler} />)}
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

export default Form.create()(EmergencyContact)
