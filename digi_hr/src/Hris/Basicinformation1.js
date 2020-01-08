import React, { Component } from 'react'
import "antd/dist/antd.css";
import { Form, Select, Input, Button ,Icon ,notification ,Popconfirm} from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom'
import {Card} from 'antd'
import { Divider } from 'antd';
import './Basicinformation1.css'
import axios from 'axios'
import getCookie1 from "../components/Getcookie1";
import getCookie from '../components/Getcookie'

const { Option } = Select;
const ButtonGroup = Button.Group;

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var name, title, mobile,email,role
const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};



export class Basicinformation1 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            basics:[],
            title: '',
            firstName: '',
            lastName:'',
            empCode: '',
            role: '',
            mobile:'',
            email:'',
            name:'',
            empCode:getCookie1('empCode'),
            dbName:getCookie('dbName')
        }
       
    }
    
    componentDidMount(){
      axios.get('https://digihr-api.appspot.com/api/show/basicDetails/',
      {
          params:{
              empCode: getCookie1('empCode'),
              dbName:getCookie('dbName')
          }
      })
      .then(response => {
        console.log(response)
        title = response.data.emp_data[0].title;
         name = response.data.emp_data[0].name;
         empCode = response.data.emp_data[0].empCode;
         email = response.data.emp_data[0].email;
         mobile = response.data.emp_data[0].mobile;
         role = response.data.emp_data[0].role;
        console.log(response.data.emp_data)
        this.setState({basics:response.data.emp_data})
         
         console.log(response.data.emp_data)
         this.setState({
          title:title,
          name:name,
          empCode:empCode,
          email:email,
          mobile:mobile, 
         role:role   
         })
      })
    .catch(error => {
      console.log(error)
    }) 
    
    }
    
    render() {
        const {basics} =this.state
        return (
            <div>
            <Card className="shadow-box"  style={{ width:700 ,fontWeight:400,marginLeft:180}}>
           
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
             
            >
              {basics.map(post =>
                      <Form.Item style={{fontWeight:600 , }}label="Title">
                    <h5 className="post" > {post.title}</h5>
               </Form.Item>
              )}
              {basics.map(post =>
              <Form.Item style={{fontWeight:600}}label=" Name">
              <h5 className="post"> {post.name}</h5>
              </Form.Item>
              )}
              {basics.map(post =>
              <Form.Item style={{fontWeight:600}} label="Employee Code">
              <h5 className="post"> {post.empCode}</h5>
              </Form.Item>
              )}
              {basics.map(post =>
              <Form.Item style={{fontWeight:600}} label="Employee Type">
                <h5 className="post"> {post.role}</h5>
              </Form.Item>
           )}
           {basics.map(post=>
              <Form.Item style={{fontWeight:600}} label="Mobile Number">
              <h5 className="post"> {post.mobile}</h5>             
               </Form.Item>
              )}
              {basics.map(post =>
              <Form.Item style={{fontWeight:600}} label="Email">
           <h5 className="post"> {post.email}</h5>
              </Form.Item>
              )}
              <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <ButtonGroup>
            
   <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/basicinformation">Yes</Link>} cancelText="No">
    <Link to="/Hris/basicinformation">Edit</Link>
  </Popconfirm>

      
    </ButtonGroup>
               
              </Form.Item>
              
              
                </Form>
             
            </Card>
            </div>
        )
    }
}

export default Basicinformation1
