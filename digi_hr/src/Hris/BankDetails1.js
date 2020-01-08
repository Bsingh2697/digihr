import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon ,Popconfirm } from "antd";
import {Link } from 'react-router-dom'
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


export class BankDetails1 extends Component {
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
    render() {
        const {posts} =this.state
        return (
            <div>
                 <Divider  >Bank Information</Divider>
          <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
         
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          
          >
            {posts.map(post =>
                <Form.Item style={{fontWeight:600}} label="Bank Name">
              <h5 className="post"> {post.bankName} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Bank Account No">
              <h5 className="post">{post.bankaccountNo}  </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Account Type">
          <h5 className="post">{post.bankAccountType} </h5> 
        </Form.Item>
            )}
            {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Branch Name">
           <h5 className="post">{post.branchName} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Branch Address">
             <h5 className="post">{post.branchAddress}</h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="IFSC Code">
              <h5 className="post">{post.IFSCCode} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Account Holder Name">
              <h5 className="post">{post.accountHolderName}</h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Reimbursment Account">
              <h5 className="post">{post.reimbursementAccount} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Salary Account">
             <h5 className="post">{post.salaryAccount}</h5>
            </Form.Item>
            )}
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
         <ButtonGroup>
         <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/Bankdetails">Yes</Link>} cancelText="No">
        <Link to="/Hris/Bankdetails">Edit</Link>
         </Popconfirm> 
         </ButtonGroup>
         </Form.Item>
              </Form>
          </Card>
        
            </div>
        )
    }
}

export default BankDetails1
