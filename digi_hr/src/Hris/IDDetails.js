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
const ButtonGroup = Button.Group;

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var idType , doissue , issuingAuthority ,poIssue, noDocument, number

export class IDDetails extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        idType: '',
        doissue: '',
        issuingAuthority: '',
        poIssue:'',
        noDocument:'',
        number:'',
        
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/get/id/info/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
    idType = response.data.emp_data[0].idType;
    doissue = response.data.emp_data[0].doissue;
     issuingAuthority = response.data.emp_data[0].issuingAuthority;
     poIssue = response.data.emp_data[0].poIssue;
     noDocument = response.data.emp_data[0].noDocument;
     number=response.data.emp_data[0].number;
     
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      idType:idType,
      doissue:doissue,
      issuingAuthority:issuingAuthority,
      poIssue:poIssue,
      noDocument:noDocument,
      number:number
     })
  })
.catch(error => {
  console.log(error)
})  
}
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/update/empid/', this.state)
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
              this.props.history.push(prevLocation || "/Hris/Iddetailss");
              }
            
         
      );
}

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
onChange=(date,dateString) =>{
  this.setState({doissue:dateString})
}
 
  handleStartOpenChange = (value) =>{
    this.setState({doIssue:value})
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
  const { startValue, endValue, endOpen ,posts } = this.state;
  const { getFieldDecorator } = this.props.form;
   return (
     <div>
       <Divider style={{marginTop:-10}} className="divide">ID Information</Divider>
         <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onSubmit={this.handleSubmit}
          >
            {posts.map(post =>
                <Form.Item style={{fontWeight:600}} label="ID Type">
              {getFieldDecorator('id_type', {
                rules: [{ message: 'Please input your id type!' }],
              })(<Input name="idType" value={idType} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "ID Type"   onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Number">
              {getFieldDecorator('number', {
                rules: [{ message: 'Please input your number !' }],
              })(<Input name="number" value={number} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Number"   onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{marginLeft:-5 , fontWeight:600}} label="Date of Issue">
          <DatePicker style={{marginLeft:-180}}
           
            showTime
            format="YYYY-MM-DD "
            placeholder="Date of Issue"
            onChange={this.onChange}
            
          />
          </Form.Item>  
            )} 
            {posts.map(post =>  
            <Form.Item style={{fontWeight:600}} label="Place of Issue">
              {getFieldDecorator('place', {
                rules: [{  message: 'Please input your place!' }],
              })(<Input name="poIssue" value={poIssue} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Place Of Issue"    onChange={this.changeHandler} />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Issuing Authority">
              {getFieldDecorator('issuing_authority', {
                rules: [{  message: 'Please input your authority!' }],
              })(<Input name="issuingAuthority" value={issuingAuthority} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Issuing Authority"   onChange={this.changeHandler}t />)}
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Name on Document">
              {getFieldDecorator('name', {
                rules: [{ message: 'Please input your name!' }],
              })(<Input name="noDocument" value={noDocument} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Name On Document"   onChange={this.changeHandler} />)}
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
    

export default Form.create()(IDDetails)
