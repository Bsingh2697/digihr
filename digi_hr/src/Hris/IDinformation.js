import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon ,notification } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import getCookie from '../components/Getcookie'
import React, { Component } from 'react'
import getCookie1 from "../components/Getcookie1";
import axios from 'axios'

const {Option} = Select;
const ButtonGroup=Button.Group;

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var panNo, uanNo ,pfAccount , aadharNo , esiNo , voterId 

export class IDinformation extends Component {
 
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        panNo: '',
        uanNo: '',
        pfAccount:'',
        aadharNo: '',
        esiNo: '',
        voterId:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/show/IDInfo/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
     panNo = response.data.emp_data.panNo;
     uanNo = response.data.emp_data.uanNo;
     pfAccount = response.data.emp_data.pfAccount;
     voterId = response.data.emp_data.voterId;
     esiNo = response.data.emp_data.esiNo;
     aadharNo = response.data.emp_data.aadharNo;
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      panNo:panNo,
      uanNo:uanNo,
      aadharNo:aadharNo,
      esiNo:esiNo,
      voterId:voterId,
       pfAccount:pfAccount
     })
  })
.catch(error => {
  console.log(error)
})  
}
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/update/IDInfo/', this.state)
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


   

 handleReset = () => {
        this.props.form.resetFields();
 };
 openNotificationWithIcon = type => {
        notification[type]({
          message: 'ID Information Added Successfully',
          description:
            'You Have to Wait for the approval to update.',
 });
  };

    render() {
      const {posts }=this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
               <Divider className="divide">ID Information</Divider>
            <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
           
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              onSubmit={this.handleSubmit}
            >
             
                  <Form.Item style={{fontWeight:600}} label="PAN Number">
                {getFieldDecorator('pan_number', {
                  rules: [{ message: 'Please input number' }],
                })(<Input name="panNo" value={panNo} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Pan Number"   onChange={this.changeHandler} />)}
              </Form.Item>
           
              <Form.Item style={{fontWeight:600}} label="UAN Number">
                {getFieldDecorator('uan_number', {
                  rules: [{ message: 'Please input number!' }],
                })(<Input name="uanNo" value={uanNo} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Uan Number"   onChange={this.changeHandler} />)}
              </Form.Item>
              <Form.Item style={{fontWeight:600}} label="PF Account">
                {getFieldDecorator('pf_account', {
                  rules: [{ message: 'Please input your pf account!' }],
                })(<Input name="pfAccount" value={pfAccount} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "PF Account"    onChange={this.changeHandler} />)}
              </Form.Item>
 
              <Form.Item style={{fontWeight:600}} label="Aadhar Number">
                {getFieldDecorator('aadhar_number', {
                  rules: [{  message: 'Please input your number!' }],
                })(<Input name="aadharNo" value={aadharNo} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Aadhar Number"    onChange={this.changeHandler} />)}
              </Form.Item>
              <Form.Item style={{fontWeight:600}} label="ESI Number">
                {getFieldDecorator('esi_number', {
                  rules: [{  message: 'Please input your number!' }],
                })(<Input name="esiNo" value={esiNo} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Esi No"  onChange={this.changeHandler} />)}
              </Form.Item>
              <Form.Item style={{fontWeight:600}} label="Voter ID">
                {getFieldDecorator('voter_id', {
                  rules: [{  message: 'Please input your voter id!' }],
                })(<Input name="voterId" value={voterId} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Voter Id"  onChange={this.changeHandler} />)}
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

export default Form.create()(IDinformation) 
