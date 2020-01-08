import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon ,notification } from "antd";
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

export class EducationDetails extends Component {
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
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/update/course/', this.state)
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
              this.props.history.push(prevLocation || "/Hris/educationdetailss");
              }
            
         
      );
}

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
onChange=(date,dateString) =>{
  this.setState({start:dateString})
}
onChange1=(date,dateString) =>{
  this.setState({end:dateString})
}


handleReset = () => {
        this.props.form.resetFields();
       
 };
 openNotificationWithIcon = type => {
  notification[type]({
    message: 'Family Details Added Successfully',
    description:
      'You Have to Wait for the approval to update.',
  });
};
    
      render() {
        const { startValue, endValue, endOpen , posts } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
          <div>
         
         
          <Divider className="divide" >Education Information</Divider>
          <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
         
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onSubmit={this.handleSubmit}
          >
            {posts.map(post =>
                <Form.Item style={{fontWeight:600}} label="Course">
              {getFieldDecorator('course  name', {
                rules: [{ message: 'Please input your course!' }],
              })(<Input name="course" value={course} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Course"    onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Education Level">
              {getFieldDecorator('Education', {
                rules: [{ message: 'Please input your education level !' }],
              })(<Input name="education" value={education} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Education"    onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Institute Name">
              {getFieldDecorator('institute', {
                rules: [{ message: 'Please input your institute name !' }],
              })(<Input name="institute" value={institute} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Institute"    onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Board University">
              {getFieldDecorator('university', {
                rules: [{ message: 'Please input your university !' }],
              })(<Input name="university" value={university} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "University"    onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Subject of Specialize">
              {getFieldDecorator('isubject', {
                rules: [{ message: 'Please input your subject name !' }],
              })(<Input name="isubject" value={isubject} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "ISubject"    onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="CGPA/Percentage">
              {getFieldDecorator('cgpa', {
                rules: [{ message: 'Please input your cgpa or percentage !' }],
              })(<Input name="cgpa" value={cgpa} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "CGPA"    onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{marginLeft:-5 ,fontWeight:600}} label="Start Date">
          <DatePicker style={{marginLeft:-180}}
            disabledDate={this.disabledStartDate}
            showTime
            format="YYYY-MM-DD "
            placeholder="start Date"
            onChange={this.onChange}
          />
          </Form.Item>
            )}
            {posts.map(post =>
          <Form.Item style={{marginLeft:-5 ,fontWeight:600}} label="End Date">
          <DatePicker style={{marginLeft:-180}}
            disabledDate={this.disabledStartDate}
            showTime
            format="YYYY-MM-DD "
            placeholder="End Date"
            onChange={this.onChange1}
          />
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

export default Form.create()(EducationDetails)
