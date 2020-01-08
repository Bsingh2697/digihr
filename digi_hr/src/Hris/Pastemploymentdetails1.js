import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon ,Popconfirm} from "antd";
import {Link} from 'react-router-dom'
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

export class Pastemploymentdetails1 extends Component {
        
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
        empCode:'',
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
    empcode = response.data.emp_data.empcode;
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
      empcode:empcode,
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
    render() {
        const {posts} =this.state
        return (
            <div>
                  
          
          <Divider style={{marginTop:-25}} className="divide" >Personal Information</Divider>
          <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
         
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
           
          >
          {posts.map(post =>
    
    <Form.Item style={{fontWeight:600}} label="Job Title">
     <h5 className="post">{post.title} </h5>
    </Form.Item>
            )}
            {posts.map(post =>
    
            <Form.Item style={{fontWeight:600}} label="Company Name">
            <h5 className="post">{post.companyName}</h5>
            </Form.Item>
            )}
            
            {posts.map(post =>

            <Form.Item style={{fontWeight:600 ,marginLeft:-5}} label="Start Date">
          <h5 className="post">{post.startDate}</h5>
          </Form.Item>
            )}
            {posts.map(post =>
          <Form.Item style={{fontWeight:600 ,marginLeft:-5}} label="End Date">
          <h5 className="post">{post.endDate}</h5> 
          </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Employee Type">
              <h5 className="post">{post.empType} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Role">
              <h5 className="post">{post.role} </h5>
            </Form.Item>
            )}
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
         <ButtonGroup>
         <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/Pastemploymentdetails">Yes</Link>} cancelText="No">
        <Link to="/Hris/Pastemploymentdetails">Edit</Link>
         </Popconfirm> 
         </ButtonGroup>
         </Form.Item>
           
              </Form>
          </Card>
          
                
            </div>
        )
    }
}

export default Pastemploymentdetails1
