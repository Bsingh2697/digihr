import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon ,notification } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import axios from 'axios'
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'

import React, { Component } from 'react'

const { Option } = Select;
const ButtonGroup=Button.Group;
var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var bankName , bankaccountNo , bankAccountType , branchName , branchAddress ,IFSCCode , accountHolderName ,reimbursementAccount , salaryAccount

export class BankDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        bankName: '',
        bankaccountNo: '',
        bankAccountType: '',
        branchName:'',
        branchAddress:'',
        IFSCCode:'',
        accountHolderName:'' ,
        reimbursementAccount:'',
        salaryAccount:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/get/bank/info/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
    bankName = response.data.emp_data[0].bankName;
    bankaccountNo = response.data.emp_data[0].bankaccountNo;
    bankAccountType = response.data.emp_data[0].bankAccountType;
     branchName = response.data.emp_data[0].branchName;
     branchAddress = response.data.emp_data[0].branchAddress;
     IFSCCode = response.data.emp_data[0].IFSCCode ;
     accountHolderName = response.data.emp_data[0].accountHolderName;
     reimbursementAccount=response.data.emp_data[0].reimbursementAccount;
     salaryAccount=response.data.emp_data[0].salaryAccount
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      bankName:bankName,
      bankaccountNo:bankaccountNo,
      bankAccountType:bankAccountType,
      branchName:branchName,
      branchAddress:branchAddress,
      IFSCCode:IFSCCode,
      accountHolderName:accountHolderName,
      reimbursementAccount:reimbursementAccount,
      salaryAccount:salaryAccount
     })
  })
.catch(error => {
  console.log(error)
})  
}
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/update/bankInfo/', this.state)
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
              this.props.history.push(prevLocation || "/Hris/bankdetailss");
              }
            
         
      );
}
openNotificationWithIcon = type => {
  notification[type]({
    message: 'Bank Details Added Successfully',
    description:
      'You Have to Wait for the approval to update.',
  });
};

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
handleSelect = (value) => {
  this.setState({bankAccountType:value})
}

      handleReset = () => {
        this.props.form.resetFields();
       
      };
    
      render() {
        const {posts} =this.state
        const { getFieldDecorator  } = this.props.form;
        return (
          <div>
         
         
          <Divider className="divide"  >Bank Information</Divider>
          <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
         
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onSubmit={this.handleSubmit}
          >
            {posts.map(post =>
                <Form.Item style={{fontWeight:600}} label="Bank Name">
              {getFieldDecorator('bank name', {
                rules: [{ message: 'Please input your bank name!' }],
              })(<Input name="bankName" value={bankName} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Bank Name"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Bank Account No">
              {getFieldDecorator('bank_account_no', {
                rules: [{ message: 'Please input your account no !' }],
              })(<Input name="bankaccountNo" value={bankaccountNo} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Bank Account No"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Account Type">
          {getFieldDecorator("Account Type", {
            rules: [{  message: " select your Account Type!" }]
          })(
            <Select
              placeholder="bank Account Type"
              onChange={this.handleSelect}
            >
              <Option value="current">current</Option>
              <Option value="savings">savings</Option>
            </Select>
          )}
        </Form.Item>
            )}
            {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Branch Name">
              {getFieldDecorator('branch_name', {
                rules: [{ message: 'Please input your branch name !' }],
              })(<Input name="branchName" value={branchName} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Branch Name"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Branch Address">
              {getFieldDecorator('branch_address', {
                rules: [{ message: 'Please input your branch address !' }],
              })(<Input name="branchAddress" value={branchAddress} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Branch Address"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="IFSC Code">
              {getFieldDecorator('IFSC_code', {
                rules: [{ message: 'Please input ifsc code !' }],
              })(<Input name="IFSCCode" value={IFSCCode} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "IFSC Code"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Account Holder Name">
              {getFieldDecorator('account_holder_name', {
                rules: [{ message: 'Please input holder name !' }],
               })(<Input name="accountHolderName" value={accountHolderName} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Account Holder Name"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Reimbursment Account">
              {getFieldDecorator('reimbursment_account', {
                rules: [{ message: 'Please input your account !' }],
              })(<Input name="reimbursementAccount" value={reimbursementAccount} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Reimbursement Account"    onChange={this.changeHandler}  />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Salary Account">
              {getFieldDecorator('salary_account', {
                rules: [{ message: 'Please input your account no !' }],
              })(<Input name="salaryAccount" value={salaryAccount} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Salary Account"    onChange={this.changeHandler}  />)}
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

export default Form.create()(BankDetails)
