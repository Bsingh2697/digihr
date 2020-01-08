import "antd/dist/antd.css";
import { Form, Select, Input, Button, Icon ,Popconfirm } from "antd";
import {Link} from 'react-router-dom'
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


export class FamilyDetails1 extends Component {
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
    
    render() {
        const {posts} =this.state
        return (
            <div>
                
      
      <Divider style={{marginTop:-10}} className="divide">Family Information</Divider>
      <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
     
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
       
      >
        {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Dependent Name">
            <h5 className="post">{post.dependentName} </h5>
        </Form.Item>
        )}
        {posts.map(post =>

        <Form.Item style={{fontWeight:600}} label="Relation">
      <h5 className="post">{post.dependendRelation} </h5>
        </Form.Item>
        )}
        {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Gender">
           <h5 className="post">{post.dependendGendor} </h5>
        </Form.Item>
        )}
       {posts.map(post =>
      <Form.Item style={{marginLeft:-5 , fontWeight:600}} label="Date of Birth">
         <h5 className="post"> {post.dependendDob}</h5>
      </Form.Item>
       )}
      
        {posts.map(post =>
     
        <Form.Item style={{fontWeight:600}} label="Marital Status">
          <h5 className="post"> {post.dependendMaritalStatus}   </h5>
        </Form.Item>
        )}
        {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Blood Group">
          <h5 className="post"> {post.dependendBloodGroup} </h5>
        </Form.Item>
        )}
        {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Address">
          <h5 className="post"> {post.dependendAddress} </h5>
        </Form.Item>
        )}
        {posts.map(post =>
        <Form.Item style={{fontWeight:600}} label="Mobile">
         <h5 className="post">{post.dependendMobile} </h5>
        </Form.Item>
        )}
       <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
         <ButtonGroup>
         <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/Familydetails">Yes</Link>} cancelText="No">
        <Link to="/Hris/Familydetails">Edit</Link>
         </Popconfirm> 
         </ButtonGroup>
         </Form.Item>
        
          </Form>
      </Card>
     
      </div>
  
        )
    }
}

export default FamilyDetails1
