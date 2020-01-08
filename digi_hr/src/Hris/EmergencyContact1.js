import "antd/dist/antd.css";
import { Form, Input, Button, Radio, Select ,Divider ,Icon ,Popconfirm} from "antd";
import {Link} from 'react-router-dom'
import { Card } from 'antd';
import React, { Component } from 'react';
import getCookie1 from '../components/Getcookie1'
import axios from 'axios'
import getCookie from '../components/Getcookie'

const {Option} =Select;
const ButtonGroup =Button.Group;
var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var contactName , relation, mobile , officeNo ,email , address

export class EmergencyContact1 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts:[],
            contactName: '',
            relation: '',
            officeNo: '',
            mobile:'',
            email:'',
            address:'',
            empCode:getCookie1('empCode'),
            dbName:getCookie('dbName')
        }
    }
    componentDidMount(){
      axios.get('https://digihr-api.appspot.com/api/show/EmergencyContact/',
      {
          params:{
              empCode: getCookie1('empCode'),
              dbName:getCookie('dbName')
          }
      })
      .then(response => {
        console.log(response)
        contactName = response.data.emp_data[0].contactName;
         relation = response.data.emp_data[0].relation;
         officeNo = response.data.emp_data[0].officeNo;
         email = response.data.emp_data[0].email;
         mobile = response.data.emp_data[0].mobile;
         address = response.data.emp_data[0].address;
        console.log(response.data.emp_data)
        this.setState({posts:response.data.emp_data})
         
         console.log(response.data.emp_data)
         this.setState({
          contactName:contactName,
          relation:relation,
          officeNo:officeNo,
          email:email,
          mobile:mobile,
          address:address   
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
                <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
       
       <Form
         labelCol={{ span: 6 }}
         wrapperCol={{ span: 14 }}
       >
         {posts.map(post =>
       <Form.Item style={{fontWeight:600}}label="Contact Name">
        <h5 className="post"> {post.contactName}</h5>
         </Form.Item>
         )}
         {posts.map(post =>
         <Form.Item style={{fontWeight:600}}label="Contact Relationship">
           <h5 className="post"> {post.relation} </h5>
         </Form.Item>
         )}
         {posts.map(post =>
         <Form.Item style={{fontWeight:600}} label="Mobile Number">
       <h5 className="post">{post.mobile} </h5>
         </Form.Item>
         )}
      
         {posts.map(post =>
         <Form.Item style={{fontWeight:600}} label="Office Number">
           <h5 className="post">{post.officeNo}</h5>
         </Form.Item>
         )}
         {posts.map(post =>
         <Form.Item style={{fontWeight:600}} label="Email Id">
         <h5 className="post"> {post.email}</h5>
         </Form.Item>
         )}
         {posts.map(post =>
         <Form.Item style={{fontWeight:600}} label="Contact Address">
         <h5 className="post"> {post.address}  </h5>
         </Form.Item>
         )}
           <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
         <ButtonGroup>
         <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/emergencycontact">Yes</Link>} cancelText="No">
        <Link to="/Hris/emergencycontact">Edit</Link>
         </Popconfirm> 
         </ButtonGroup>
         </Form.Item>

           </Form>
       </Card>
    
            </div>
        )
    }
}

export default EmergencyContact1
