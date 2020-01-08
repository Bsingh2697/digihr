import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Divider , Avatar, Card } from 'antd';
import { Modal, Button ,Icon ,Tooltip } from 'antd';
import './Listemployee.css'
import getCookie from '../components/Getcookie'
import './Modal.css'
import axios from 'axios'
import createCookie from '../components/createCookie'
import getCookie1 from '../components/Getcookie1';

const ButtonGroup=Button.Group
var dbName=getCookie('dbName')
var empCode=getCookie('empCode')

var firstName , lastName , designation , mobile
export class Modalview extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts: [],
            firstName:'',
            lastName:'',
            designation:'',
            mobile:'',
            empCode:getCookie('empCode'),
            dbName:getCookie('dbName'),
            
            
        }
    }
    componentDidMount(){
      axios.get('https:/digihr-api.appspot.com/api/get/employee/byId/',
      {
        params:{
          employeeCode:getCookie('employeeCode'),
          dbName:dbName
        }
    })
    .then(response => {
      console.log(response)
       firstName = response.data.emp_data[0].firstName;
       lastName = response.data.emp_data[0].lastName;
       designation = response.data.emp_data[0].designation;
       mobile = response.data.emp_data[0].mobile;
      console.log(response.data.emp_data)
      this.setState({posts:response.data.emp_data})
       
       console.log(response.data.emp_data)
       this.setState({
        firstName:firstName,
        lastName:lastName,
        designation:designation,
        mobile:mobile 
       })
    })
  .catch(error => {
    console.log(error)
  })  
  }
    
    
    render() {
        const {posts}=this.state
        return (
            <div >
              <Card className="card5" >
            <Avatar size={74} className="avatar5" icon="user" ></Avatar>
             {
             posts.map(post =>
            <div>
             <h className="details5">{post.firstName} {post.lastName}</h>
             <h className="what5">{post.designation}</h>
             <h className="what6"><Icon type="mobile" theme="twoTone" />{post.mobile}</h>
             </div>
           )
        }
             {/* <ButtonGroup >
                           <Tooltip title="Call">
                               
                               <Icon type="phone" theme="twoTone"  style={{marginLeft:40 , fontSize:50}}/> 
                              
                           </Tooltip>
                           <Tooltip title="Message">
                               
                               <Icon type="message" theme="twoTone"  style={{marginLeft:90 , fontSize:50}}/> 
                              
                           </Tooltip>
                           <Tooltip title="Contacts">
                               
                               <Icon type="contacts" theme="twoTone"   style={{marginLeft:110 , fontSize:50}}/> 
                              
                           </Tooltip>
                           
                           
                                                      
                           </ButtonGroup> */}
                           </Card>
             
            </div>
        )
    }
}

export default Modalview
