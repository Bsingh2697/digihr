import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Card, Divider ,Row , Col ,Button ,Form, Switch, Tooltip ,Icon ,message } from 'antd';
import {BrowserRouter as Rouetr , Router} from 'react-router-dom'
import {Link ,Route ,withRouter } from 'react-router-dom'
import './LeaveHistory.css'
//import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon} from 'mdbreact'
import axios from 'axios'
import getCookie1 from './Getcookie1'
import createCookie from './createCookie'
import employeedetails from './Employeedetails'
import getCookie from './Getcookie'
import { Positiondetails } from '../Hris/Positiondetails';
import deleteCookies from './deleteCookies'

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
const ButtonGroup=Button.Group

export function Edit(e) { 
    
    var today=new Date()
    createCookie('taskId', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))
    createCookie('status', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))

    window.helloComponent.handleEdit(e);
}
// export function Edit1(e) { 
    
//     var today=new Date()
//     window.helloComponent.handleEdit(e);
// }
export function Delete(e) { 
    
    var today=new Date()
    createCookie('taskId', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))
    createCookie('status', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))

    window.helloComponent.handleDelete(e);
}
// export function Delete1(e) { 
    
//     var today=new Date()
//     createCookie('status', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))
//     window.helloComponent.handleDelete(e);
// }

var name,empCode,startDate,endDate,leaveType,leaveReason,leaveDuration,mobile,email , status

export class Testtable extends Component {
    constructor(props) {
        super(props)
    window.helloComponent=this
        this.state = {
            posts:[],
            leaveType: '', 
            leaveReason:'',
            leaveDuration:'',
            startDate:'',
            endDate:'',
            status:'',
            taskId:getCookie('taskId'),
            empCode:getCookie1('empCode'),
            dbName:getCookie('dbName'),

        }
    }
     
    componentDidMount(){
      axios.get('https://digihr-api.appspot.com/api/employee/leave/data/',
      {
          params:{
              empCode:getCookie1('empCode'),
              dbName:getCookie('dbName')
          }
      })
      .then(response => {
        console.log(response)
         startDate = response.data.emp_data.startDate;
         endDate = response.data.emp_data.endDate;
         leaveType=response.data.emp_data.leaveType;
         leaveReason=response.data.emp_data.leaveReason;
         leaveDuration=response.data.emp_data.leaveDuration;
         status=response.data.emp_data.status;
        console.log(response.data.emp_data)
        this.setState({posts:response.data.emp_data})
         
         console.log(response.data.emp_data)
         this.setState({
         startDate:startDate,
         endDate:endDate,
         leaveType:leaveType,
         leaveReason:leaveReason,
         leaveDuration:leaveDuration , 
         status:status,
         })
      })
    .catch(error => {
      console.log(error)
    })  
    }

    
    handleEdit = e => {
      console.log(this.state)
      if(getCookie('status')==='Pending'){
       axios.post('https://digihr-api.appspot.com/api/delete/emp/leave/', this.state)
        .then(response => {
          console.log(response)
        })
         .catch(error => {
             console.log(error)
      })
    
    }
    else if(getCookie('status')==='Approved'){
        message.error('You Cant Delete this task')
    }
    // else{
    //     message.error('You Cant Delete This Task')
    // }
 }
 handleDelete = e => {
    console.log(this.state)
    if(getCookie('status')==='Pending'){
       
        const { state = {} } = this.props.location;
        const { prevLocation } = state;
        this.setState(
            () => {
                this.props.history.push(prevLocation || "/home/resubmit");
            },
        ); 
        console.log('honey')
  
  }
  else if(getCookie('status')==='Approved'){
      message.error('You Cant Edit This Task')
  }
}
    
    render() {
        const {posts} =this.state
        return (
            <div>
            <Divider>Leave History</Divider>    
   <div>
                     <table className="tablediv1">
                         <thead className="theaddiv1">
                             <tr>
                                 <th className="bold1">START DATE</th>
                                 <th className="bold1">END DATE</th>
                                 <th className="bold1">LEAVE TYPE</th>
                                 <th className="bold1">LEAVE REASON</th>
                                 <th className="bold1">LEAVE DURATION</th>
                                 <th className="bold1">STATUS</th>
                                 <th className="bold1">OPERATION</th>
                                
                             </tr>
                             
                         </thead>
                             {posts.map(post =>
                             <tr
                                         type="text"
                                         
                                         >
                                         <th className="thdiv1">{post.startDate}</th>
                                         <th className="thdiv1">{post.endDate}</th>
                                         <th className="thdiv1">{post.leaveType}</th>
                                         <th className="thdiv1">{post.leaveReason}</th>
                                         <th  className="thdiv1">{post.leaveDuration}</th>
                                         <th className="thdiv1">{post.status}</th>
                                         <th className="thdiv1">
                                         <ButtonGroup className="buttbutt">
                     <Tooltip title="Edit"> 
                         <Button   className="butt1"  onClick={(event) => { Delete(post.taskId) ; Delete(post.status);}} >       
                         <Icon type="edit"  theme="filled" />
                         </Button> 
                     </Tooltip>
                     <Tooltip title="Delete">
                         <Button   className="butt1"  onClick={(event) => { Edit(post.taskId); Edit(post.status)
                            ; }} >    
                         <Icon type="delete"  theme="filled" />

                         </Button> 
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

export default withRouter(Testtable)
