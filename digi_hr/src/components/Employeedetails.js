import { Button , Input , Form, Divider ,Row, Col ,Card ,Icon} from 'antd'
import React, { Component } from 'react'
import getCookie1 from './Getcookie1'
import axios from 'axios'
import getCookie from './Getcookie'
import {withRouter} from 'react-router-dom'
import './Employeedetails.css'
import Button1 from './Button1'
import Button2 from './Button2';

const ButtonGroup=Button.Group

 

var taskCode=getCookie('taskCode')  
var dbName=getCookie('dbName')
var firstName,lastName,empCode,startDate,endDate,LeaveType,reason,duration,mobile,personalEmail,message, designation
export class Employeedetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        firstName: '',
        lastName:'',
        LeaveType: '',
        leaveReason:'',
        leaveDuration:'',
        empCode: '',
        mobile:'',
        email:'',
        taskCode:getCookie('taskCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/anotherShowTaskDetails/',
  {
      params:{
          taskCode:taskCode,
          dbName:dbName
      }
  })
  .then(response => {
    console.log(response)
     firstName = response.data.taskDetails.firstName;
     lastName=response.data.taskDetails.lastName;
     empCode = response.data.taskDetails.empCode;
     personalEmail = response.data.taskDetails.personalEmail;
    //  mobile = response.data.member_data.mobile;
     startDate = response.data.taskDetails.startDate;
     endDate = response.data.taskDetails.endDate;
     LeaveType=response.data.taskDetails.LeaveType;
     reason=response.data.taskDetails.reason;
     duration=response.data.taskDetails.duration;
     message=response.data.taskDetails.message;
     designation=response.data.taskDetails.designation
    console.log(response.data.taskDetails)
    this.setState({posts:response.data.taskDetails})
     
     console.log(response.data.taskDetails)
     this.setState({
      firstName:firstName,
      lastName:lastName,
      empCode:empCode,
      personalEmail:personalEmail,
     designation:designation,
     startDate:startDate,
     endDate:endDate,
     LeaveType:LeaveType,
     reason:reason,
     duration:duration ,
      message:message,
      designation:designation
     })
  })
.catch(error => {
  console.log(error)
})  
}
handleClick=()=>{
 const { state = {} } = this.props.location;
  const { prevLocation } = state;
  this.setState(
      () => {
          this.props.history.push(prevLocation || "/home/resubmit");
      },
  );
}

handleWithdraw=e =>{
  axios.get('https:/digihr-api.appspot.com/api/withdraw/leave/',
  {
      params: {
          taskCode: getCookie('taskCode'),
          dbName:getCookie('dbName')
          
      }
  })
  .then(response => console.log(response.data));
  const { state = {} } = this.props.location;
  const { prevLocation } = state;
  this.setState(
      () => {
          this.props.history.push(prevLocation || "/home/leavehistory");
          window.location.reload()
      },
  );
 
}


    
    render() {
        const {Details , posts ,empNote ,manComment} =this.state
        return (
            <div>
                <Card>
                <Divider className="divide"> Employee Details</Divider>
                <Card>
                <Form labelCol={{ span: 9 }} wrapperCol={{ span: 14 }}
                onSubmit={this.handleSubmit}
              > 
                <Row gutter={16}>
      <Col span={12}>
     
      <Form.Item label="Full Name" style={{fontWeight:600 }} >
      <h5 className="htag">{firstName} {lastName}</h5> 
      
              </Form.Item>
      
      </Col>
      <Col span={12}>
    
      <Form.Item style={{fontWeight:600}} label="Employee Code" >
        
      <h5 className="htag">{empCode} </h5>
       </Form.Item> 
  
    </Col>
     
    </Row>
    <Row gutter={16}>
      <Col span={12}>
      
      <Form.Item style={{fontWeight:600}} label="Leave type" >
      <h5 className="htag"> {LeaveType}</h5>
      </Form.Item>
       
      </Col>
      <Col span={12}>
     
      <Form.Item style={{fontWeight:600}} label="Leave Reason" >
      <h5 className="htag">{reason}</h5>
       </Form.Item>
   
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
     
      <Form.Item style={{fontWeight:600}} label="Leave Duration" >
      <h5 className="htag">{duration}</h5>
       </Form.Item>
   
      </Col>
      <Col span={12}>
      
      <Form.Item style={{fontWeight:600}} label="Company Name" >
      <h5 className="htag">{designation}  </h5>
       </Form.Item>
      
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        {/* {posts.map(post =>
      <Form.Item style={{fontWeight:600}} label="Contact No." >
      <h5 className="htag"> {post.mobile}</h5> 
      </Form.Item>
        )} */}
      </Col>
      <Col span={12}>
     
      <Form.Item style={{fontWeight:600}} label="Email" >
       <h5 className="htag">{personalEmail}</h5> 
      </Form.Item>
        
      </Col>
     
    </Row>
    <Row gutter={16}>
      <Col span={12}>
      
      <Form.Item style={{fontWeight:600}} label="Start Date" >
      <h5 className="htag" > {startDate}</h5>  
       </Form.Item>
      
      </Col>
      <Col span={12}>
       
      <Form.Item style={{fontWeight:600}} label="End Date" >
      <h5 className="htag">{endDate}  </h5> 
      </Form.Item>
     
      
      </Col>
     
    </Row>
    <Row gutter={16}>
      <Col span={12}>
      <Form.Item style={{fontWeight:600}} label="Emp Note" >
      <Input name="empNote" value={empNote} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Employee Note"   onChange={this.changeHandler} />
       </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item style={{fontWeight:600}} label="Manager's Comment">
      <Input name="manComment" value={manComment} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Manager's Comment"   onChange={this.changeHandler} />
      </Form.Item>
      </Col>
     
    </Row>
    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
        <ButtonGroup>
      <Button type="primary" htmlType="submit" onClick={() =>  this.handleWithdraw()}>WITHDRAW</Button>
      <Button type="default" onClick={() =>  this.handleClick()}>SUBMIT</Button>
       </ButtonGroup>
               
              </Form.Item>
             

            </Form>
            </Card>
            </Card>
  
          </div>
        )
    }
}

export default Employeedetails
