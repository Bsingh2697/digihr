import React, { Component } from 'react'
import { Divider , Button , Form , Icon ,Input ,DatePicker ,AutoComplete ,message } from 'antd';
import getCookie1 from './Getcookie1';
import {Link , withRouter} from 'react-router-dom'
import getCookie from './Getcookie'
import axios from 'axios'


const ButtonGroup=Button.Group
const { TextArea } = Input;

function onSelect(value) {
  console.log('onSelect', value);
}


export class Addexpense extends Component {
  constructor(props) {
    super(props)
   

    this.state = {
        expense:'',
        travelStartDate:'',
        travelEndDate:'',
        expenseAmount:'',
        comment:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName'),

    }
    
}
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/add/expense/', this.state)
      .then(response => {
          console.log(response) 
          var status=response.status
          var success=response.data.success
          console.log(success)
          console.log(status)
          const { state = {} } = this.props.location;
      const { prevLocation } = state;
      this.setState(
          () => {
            if( status ===200 && success==='true'){
              this.props.history.push(prevLocation || "/home/viewexpense");
              
              
              }
              else{
                this.props.history.push(prevLocation || "/home/viewexpense");
                window.location.reload()

              }
            }
      ); 
      })
      .catch(error => {
          console.log(error)
      })
      
     
}
changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
onChange=(date, dateString)=>{
  this.setState({travelStartDate:dateString})
}
onChange1=(date, dateString)=>{
  this.setState({travelEndDate:dateString})
}
     
    render() {
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue, endOpen ,expense, expenseAmount,comment } = this.state;
        const { dataSource } = this.state;
        return (
            <div>
                <Divider className="divide">Add Expense</Divider>
                <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          onSubmit={this.handleSubmit}
        >
          
        <Form.Item style={{fontWeight:600}}label="Select Expense">
            {getFieldDecorator('expense', {
              rules: [{ required:true, message: 'Please input your expense!' }],
            })(<Input name="expense" value={expense} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Travel Expense"   onChange={this.changeHandler} />)}
          </Form.Item>
          
          <Form.Item style={{fontWeight:600}} label="Start Date">
          <DatePicker style={{marginLeft:-430}}
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD"
          placeholder="Start Date"
          onChange={this.onChange}
        />
      </Form.Item>
       
      <Form.Item style={{fontWeight:600}} label="End Date">
          <DatePicker style={{marginLeft:-430}}
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD"
          placeholder="End Date"
          onChange={this.onChange1}
        />
      </Form.Item>
        
          <Form.Item style={{fontWeight:600}}label="Enter Amount">
            {getFieldDecorator('Amount', {
              rules: [{ required:true, message: 'Please enter your amount!' }],
            })(<Input name="expenseAmount" value={expenseAmount}   prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Enter Amount"   onChange={this.changeHandler} />)}
          </Form.Item>
          <Form.Item style={{fontWeight:600}}label="Additional Comments">
            {getFieldDecorator('comments', {
              rules: [{ message: 'Please input your expense!' }],
            })(<Input name="comment" value={comment} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Travel Expense"   onChange={this.changeHandler} />)}
          </Form.Item>
          
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <ButtonGroup>
              <Button type="primary" htmlType="submit" onSubmit={this.handleSubmit}>Submit</Button>
 
          </ButtonGroup>
           
          </Form.Item>
    
      
            </Form>
                
            </div>
        )
    }
}

export default withRouter (Form.create()(Addexpense))
