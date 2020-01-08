import "antd/dist/antd.css";
import { Form, Select, Input, Button } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider , Icon } from 'antd';

import React, { Component } from 'react'
import getCookie1 from "../components/Getcookie1";
import getCookie from "../components/Getcookie";
import axios from 'axios'

const { Option } = Select;

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var L1manager , L2manager , confirmationDueDate , confirmationStatus , dateofJoining , department , designation, employmentStatus ,employmentType,grade , 
hrManager , noticePeriod ,officialEmail , receivingData

export class Positiondetails extends Component {
    
  constructor(props) {
    super(props)

    this.state = {
        basics:[],
        L1manager: '',
        L2manager: '',
        confirmationDueDate:'',
        confirmationStatus: '',
        dateofJoining: '',
        department:'',
        designation:'',
        employmentStatus:'',
        employmentType:'',
        grade:'',
        hrManager:'',
        noticePeriod:'',
        officialEmail:'',
        receivingData:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/employee/information/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
     L1manager = response.data.emp_data.L1manager;
     L2manager = response.data.emp_data.L2manager;
     confirmationDueDate = response.data.emp_data.confirmationDueDate;
     confirmationStatus= response.data.emp_data.confirmationStatus;
     dateofJoining = response.data.emp_data.dateofJoining;
     department = response.data.emp_data.department;
     designation = response.data.emp_data.designation;
     employmentStatus = response.data.emp_data.employmentStatus;
     employmentType = response.data.emp_data.employmentType;
     grade = response.data.emp_data.grade;
     hrManager = response.data.emp_data.hrManager;
     noticePeriod = response.data.emp_data.noticePeriod;
     officialEmail = response.data.emp_data.officialEmail;
     receivingData = response.data.emp_data.receivingData;


    console.log(response.data.emp_data)
    this.setState({basics:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      L1manager:L1manager,
      L2manager:L2manager,
      confirmationDueDate:confirmationDueDate,
      confirmationStatus:confirmationStatus,
      dateofJoining:dateofJoining,
      department:department,
      designation:designation,
      employmentStatus:employmentStatus,
      employmentType:employmentType,
      grade:grade,
      hrManager:hrManager,
      noticePeriod:noticePeriod,
      officialEmail:officialEmail,
      receivingData:receivingData  
     })
  })
.catch(error => {
  console.log(error)
})  
}
      render() {
        const {basics }=this.state
        const { getFieldDecorator } = this.props.form;
        return (
          <div>
          
          
          <Divider style={{marginTop:-24}} className="divide">Position Information</Divider>
          <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
         
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onSubmit={this.handleSubmit}
          >
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Employee Code">
            <h5 className="post"> {post.empCode}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Date of Joining">
               <h5 className="post">{post.dateofJoining}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Official Email">
               <h5 className="post"> {post.officialEmail}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Grade">
             <h5 className="post"> {post.grade}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Designation">
               <h5 className="post">{post.designation}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="L1 Manager">
             <h5 className="post">{post.L1manager} </h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="L2 Manager">
             <h5 className="post">{post.L2manager}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Employment Status">
          <h5 className="post">{post.employmentStatus}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="HR Manager">
             <h5 className="post">{post.hrManager}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Notice Period">
              <h5 className="post">{post.noticePeriod}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Employment Type">
               <h5 className="post">{post.employmentType}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Conformation Due Date">
               <h5 className="post">{post.confirmationDueDate}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Conformation Status">
              <h5 className="post">{post.confirmationStatus}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Receiving Data">
              <h5 className="post">{post.receivingData}</h5>
            </Form.Item>
            )}
            {basics.map(post =>
            <Form.Item  style={{fontWeight:600}} label="Department">
              <h5 className="post">{post.department} </h5>
            </Form.Item>
            )}

              </Form>
          </Card>
        
          </div>
         
    
        )
    }
}

export default Form.create()(Positiondetails)
