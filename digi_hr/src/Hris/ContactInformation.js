import {Card ,Form ,Radio ,Input , Button, Select ,Divider ,Icon ,notification} from 'antd'
import React, { Component } from 'react'
import './Contactinformation.css'
import axios from 'axios'
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'

const {Option} = Select;
const ButtonGroup = Button.Group;
var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var addressType , whenAvailable , addressLine1 , addressLine2 , country , state, city , pinCode
export class ContactInformation extends Component {
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        addressType: '', 
        whenAvailable: '',
        addressLine1: '',
        addressLine2:'',
        country:'',
        state:'',
        city:'' ,
        pinCode:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/employee/contact/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
    addressType = response.data.emp_data[0].addressType;
     whenAvailable = response.data.emp_data[0].whenAvailable;
     addressLine1 = response.data.emp_data[0].addressLine1;
     addressLine2 = response.data.emp_data[0].addressLine2;
     country = response.data.emp_data[0].country;
     state = response.data.emp_data[0].state ;
     city = response.data.emp_data[0].city;
     pinCode=response.data.emp_data[0].pinCode
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      addressType:addressType,
      whenAvailable:whenAvailable,
      addressLine1:addressLine1,
      addressLine2:addressLine2,
      country:country,
      state:state,
      city:city,
      pinCode:pinCode 
     })
  })
.catch(error => {
  console.log(error)
})  
}
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/update/contact/  ', this.state)
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
        const { startValue, endValue, endOpen , posts } = this.state;
        const { getFieldDecorator } = this.props.form;
        return ( 
            <div >
         
          
            <Divider className="divide" >Contact Information</Divider>
            <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
           
            <Form 
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              onSubmit={this.handleSubmit}
            >
              {posts.map(post =>
          <Form.Item style={{fontWeight:600}}label="Address Type">
                {getFieldDecorator('addresstype', {
                  rules: [{ message: 'Please input your address type!' }],
                })(<Input name="addressType" value={addressType} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "addressType"    onChange={this.changeHandler} />)}
              </Form.Item>
              )}
              {posts.map(post =>
              <Form.Item style={{fontWeight:600}}label="When Available">
                {getFieldDecorator('available', {
                  rules: [{ message: 'Please input when available!' }],
                })(<Input  name="whenAvailable" value={whenAvailable} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="whenAvailable"    onChange={this.changeHandler}  />)}
              </Form.Item>
              )}
              {posts.map(post =>
              <Form.Item style={{fontWeight:600}} label="Address Line1">
                {getFieldDecorator('addressline1', {
                  rules: [{ message: 'Please input address line1 !' }],
                })(<Input  name="addressLine1" value={addressLine1} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="addressLine1"    onChange={this.changeHandler}  />)}
              </Form.Item>
              )}
              {posts.map(post =>
           
 
              <Form.Item style={{fontWeight:600}} label="Address Line2">
                {getFieldDecorator('addressline2', {
                  rules: [{  message: 'Please input employee type!' }],
                })(<Input  name="addressLine2" value={addressLine2} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="addressLine2"   onChange={this.changeHandler}  />)}
              </Form.Item>
           )}
           {posts.map(post =>
              <Form.Item style={{fontWeight:600}} label="Counrty">
                {getFieldDecorator('country', {
                  rules: [{  message: 'Please input your country!' }],
                })(<Input  name="country" value={country} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="country"   onChange={this.changeHandler}  />)}
              </Form.Item>
              )}
              {posts.map(post =>
              <Form.Item style={{fontWeight:600}} label="State">
                {getFieldDecorator('state', {
                  rules: [{  message: 'Please input your state!' }],
                })(<Input  name="state" value={state} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="state"   onChange={this.changeHandler}  />)}
              </Form.Item>
              )}
              {posts.map(post =>
              <Form.Item style={{fontWeight:600}} label="City">
                {getFieldDecorator('city', {
                  rules: [{  message: 'Please input your city!' }],
                })(<Input  name="city" value={city} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="city"   onChange={this.changeHandler}  />)}
              </Form.Item>
              )}
              {posts.map(post =>
              <Form.Item style={{fontWeight:600}} label="Pin Code">
                {getFieldDecorator('pincode', {
                  rules: [{  message: 'Please input your pin code!' }],
                })(<Input  name="pinCode" value={pinCode} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="pinCode"    onChange={this.changeHandler}  />)}
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

export default Form.create()(ContactInformation)
