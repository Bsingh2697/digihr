import 'antd/dist/antd.css';
import { Card, Divider ,Row , Col ,Button ,Form, Switch, Tooltip ,Icon } from 'antd';
import {BrowserRouter as Rouetr , Router} from 'react-router-dom'
import {Link ,Route ,withRouter} from 'react-router-dom'
import './Task.css'
//import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon} from 'mdbreact'
import axios from 'axios'
import getCookie1 from './Getcookie1'
import createCookie from './createCookie'
import employeedetails from './Employeedetails'
import getCookie from './Getcookie'
import './Task.css'
import React, { Component } from 'react'
var role

var empCode=getCookie1('empCode')
// var taskId = getCookie1('taskCode')
var dbName=getCookie('dbName')
const ButtonGroup=Button.Group
 
export function Update (e) {
    var today=new Date()
    createCookie('taskCode', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))
    
    axios.get('https:/digihr-api.appspot.com/api/anotherShowTaskDetails/',
        {
            params: {
                taskCode: e,
                dbName:dbName
                
            }
        })
        .then(response => console.log(response.data));
       
}
        

   




class Task extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts: [],
            name:'',
            
            status:''
            
        }
    }
    componentDidMount(){
        axios.get('https://digihr-api.appspot.com/api/show/task/details/',
        
        {
            params:{
                empCode:empCode,
                 
                dbName:dbName
              
            }
        })
        .then(response => {
    
            console.log(response)
            this.setState({posts:response.data.leaveRequest_data})
          })    
    }
    handleSelect =() =>{
        axios.get('https://digihr-api.appspot.com/api/user/role/',
      {
          params:{
              empCode: getCookie1('empCode'),
              dbName:getCookie('dbName')
          }
      })
      .then(response => {
        console.log(response)
        role=response.data.role_data
        console.log(role)
        const { state = {} } = this.props.location;
      const { prevLocation } = state;
      this.setState(
          () => {
              if(role==='user'){
              this.props.history.push(prevLocation || "/home/employeedetails");
              }
              else if(role==='L2'){
                  this.props.history.push(prevLocation || "/home/employeedetails1");  
              }

            }
       
        
      );
   
      })
    .catch(error => {
      console.log(error)
    }) 
    
    }

    render() {
        const { posts , empCode , taskCode, status,name} =this.state
        return (
            
         <Card>
           <Divider style={{marginTop:-20}}>Task Details</Divider> 
      
<div>
     <table className="tablediv1" >
         <thead className="theaddiv1" >
             <tr>
                <th className="bold1">EMPCODE</th>
                <th className="bold1">TASKID</th>
                  <th className="bold1">STATUS</th>
                  <th className="bold1">TYPE</th>
                 <th className="bold1">DETAILS</th>
            </tr>
        </thead>
                 {
                    posts.map(post =>
                     
                        <tr
                        key={post.component_name}>
                        <th className="thdiv1"  >{post.empCode}</th>
                        <th className="thdiv1" >{post.taskCode}</th>
                        <th className="thdiv1" >{post.statusDetails}</th>
                        <th className="thdiv1">{post.taskType}</th>
                        <th className="thdiv1" >
                         <ButtonGroup>
                        <Tooltip title="See Details">
                      
                            <Button icon="schedule"  className="butt1" type="submit" onClick={() => { Update(post.taskCode) ; this.handleSelect(); }}/>
                     
                        </Tooltip>
                                                    
                        </ButtonGroup>
                         </th>
                                                           
                    
                             </tr>
                            
                          ) 
                                            
                          }
             </table>
                           
            </div>
                 <br/>
          </Card> 
        )
    }
}

export default withRouter(Task)

          
