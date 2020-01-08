import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon ,Popconfirm } from "antd";
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
var course,education, institute , university , isubject,cgpa, start, end

export class EducationDetails1 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts:[],
            course: '',
            education: '',
            institute: '',
            university:'',
            isubject:'',
            cgpa:'',
            start:'' ,
            end:'',
            empCode:getCookie1('empCode'),
            dbName:getCookie('dbName')
        }
    }
    componentDidMount(){
      axios.get('https://digihr-api.appspot.com/api/get/course/info/',
      {
          params:{
              empCode: getCookie1('empCode'),
              dbName:getCookie('dbName')
          }
      })
      .then(response => {
        console.log(response)
        course = response.data.emp_data.course;
         education = response.data.emp_data[0].education;
         institute = response.data.emp_data[0].institute;
         university = response.data.emp_data[0].university;
         isubject = response.data.emp_data[0].isubject;
         cgpa = response.data.emp_data[0].cgpa ;
         start = response.data.emp_data[0].start;
         end=response.data.emp_data[0].end
        console.log(response.data.emp_data)
        this.setState({posts:response.data.emp_data})
         
         console.log(response.data.emp_data)
         this.setState({
          course:course,
          institute:institute,
          university:university,
          isubject:isubject,
          cgpa:cgpa,
          start:start,
          end:end, 
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
                 
         
          <Divider >Education Information</Divider>
          <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
         
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            {posts.map(post =>
                <Form.Item style={{fontWeight:600}} label="Course">
                 <h5 className="post">{post.course}</h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Education Level">
               <h5 className="post"> {post.education}</h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Institute Name">
                <h5 className="post"> {post.institute}</h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Board University">
                <h5 className="post">{post.university} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Subject of Specialize">
                <h5 className="post"> {post.isubject} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="CGPA/Percentage">
                 <h5 className="post">{post.cgpa}</h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{marginLeft:-5 ,fontWeight:600}} label="Start Date">
             <h5 className="post">{post.start}</h5>
          </Form.Item>
            )}
            {posts.map(post =>
          <Form.Item style={{marginLeft:-5 ,fontWeight:600}} label="End Date">
             <h5 className="post">{post.end}</h5>
          </Form.Item>
            )}
           <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
         <ButtonGroup>
         <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/Educationdetails">Yes</Link>} cancelText="No">
        <Link to="/Hris/Educationdetails">Edit</Link>
         </Popconfirm> 
         </ButtonGroup>
         </Form.Item>
        
            
              </Form>
          </Card>
    
            </div>
        )
    }
}

export default EducationDetails1
