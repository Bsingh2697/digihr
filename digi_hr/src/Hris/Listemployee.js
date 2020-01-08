import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Divider , Avatar, Card } from 'antd';
import { Modal, Button ,Icon ,Tooltip } from 'antd';
import {Link} from 'react-router-dom'
import './Listemployee.css'
import getCookie from '../components/Getcookie'
import axios from 'axios'
import createCookie from '../components/createCookie'
import getCookie1 from '../components/Getcookie1';
import Modalview from './Modal'

const ButtonGroup=Button.Group
var dbName=getCookie('dbName')
var empCode=getCookie1('empCode')
var firstName , lastName , designation , mobile

export function Show (e) {
  var today=new Date()
  createCookie('employeeCode', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))
  axios.get('https:/digihr-api.appspot.com/api/get/employee/byId/',
      {
          params: {
              employeeCode: e,
              dbName:dbName
              
          }
        })
        .then(response => console.log(response.data));
      }
        
      

 


export class Listemployee extends Component {
  constructor(props) {
    super(props)

    this.state = {
        posts: [],
        basics:[],
        department:'',  
        id:'' ,
        name:'',
        dbName:getCookie('dbName'),
        loading: false,
        visible: false,
        
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/get/employee/list/',
  {
    params:{
      dbName:dbName,
      empCode:empCode
    }
  })
  .then(response => {
    
    console.log(response)
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
  })
  .catch(error => {
    console.log(error)
    
})
axios.get('https:/digihr-api.appspot.com/api/get/employee/byId/',
{
    params: {
        empCode: getCookie('employeeCode'),
        dbName:dbName
         
    }
  })
  .then(response => {
    console.log(response)
     firstName = response.data.emp_data.firstName;
     lastName = response.data.emp_data.lastName;
     designation = response.data.emp_data.designation;
     mobile = response.data.emp_data.mobile;
    console.log(response.data.emp_data)
    this.setState({basics:response.data.emp_data})
     
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
// window.location.reload()
}

    render() {
        const { visible, loading ,posts , basics} = this.state;
        return (
            <div>
                <Divider className="divide">List of Emplyee</Divider>
                <div>
                        <table className="tablediv3">
                            <thead className="theaddiv3">
                              
                                <tr>
                                    <th className="bold3">Emplyee Name</th> 
                                    <th className="bold3">Designation</th>
                                    <th className="bold3">Details</th> 
                                      
                                </tr>
                                
                            </thead>
                            {
                    posts.map(post =>
                            
                            
                                        <tr
                                            type="text"
                                            
                                            >
                                       <th className="thdiv1" style={{fontWeight:400 , fontSize:20}} >{post.firstName} {post.lastName}</th>
                                       <th className="thdiv1" style={{fontWeight:400 , fontSize:20}} >{post.designation}</th>
                                       <th className="thdiv1">
                                       <ButtonGroup>
                        <Tooltip title="See Details"> 
                        <Link to ="/Hris/modal">  
                            <Button icon="schedule"  className="butt1" type="submit" onClick={(event) => Show(post.employeeCode)}/>
                            </Link>
                        </Tooltip>
                                                    
                        </ButtonGroup>


                                       </th>                 
                                        </tr>
                    )} 
                        </table>
                        </div>
            </div>
        )
    }
}

export default Listemployee
