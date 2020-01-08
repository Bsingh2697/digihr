import React, { Component } from 'react'
import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon , Popconfirm } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import getCookie from '../components/Getcookie'
import getCookie1 from "../components/Getcookie1";
import axios from 'axios'
import {Link} from 'react-router-dom'
const {Option} = Select;
const ButtonGroup=Button.Group;

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var panNo, uanNo ,pfAccount , aadharNo , esiNo , voterId 


export class IDinformation1 extends Component {
    
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        panNo: '',
        uanNo: '',
        pfAccount:'',
        aadharNo: '',
        esiNo: '',
        voterId:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/show/IDInfo/',
  {
      params:{
          empCode: getCookie1('empCode'),
          dbName:getCookie('dbName')
      }
  })
  .then(response => {
    console.log(response)
     panNo = response.data.emp_data.panNo;
     uanNo = response.data.emp_data.uanNo;
     pfAccount = response.data.emp_data.pfAccount;
     voterId = response.data.emp_data.voterId;
     esiNo = response.data.emp_data.esiNo;
     aadharNo = response.data.emp_data.aadharNo;
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      panNo:panNo,
      uanNo:uanNo,
      aadharNo:aadharNo,
      esiNo:esiNo,
      voterId:voterId,
       pfAccount:pfAccount
     })
  })
.catch(error => {
  console.log(error)
})  
}
    render() {
    const {posts }=this.state
    return (
        <div>
             <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
           
           <Form
             labelCol={{ span: 6 }}
             wrapperCol={{ span: 14 }}
             onSubmit={this.handleSubmit}
           >
               {posts.map(post =>
                 <Form.Item style={{fontWeight:600}} label="PAN Number">
                  <h5 className="post"> {post.panNo}</h5>
             </Form.Item>
               )}
               {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="UAN Number">
               <h5 className="post"> {post.uanNo}</h5>
             </Form.Item>
             )}
             {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="PF Account">
            <h5 className="post"> {post.pfAccount}</h5>
             </Form.Item>
             )}
               {
                 posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="Aadhar Number">
                 <h5 className="post"> {post.aadharNo}</h5>
             </Form.Item>
                 )}
             {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="ESI Number">
               <h5 className="post"> {post.esiNo}</h5>
             </Form.Item>
             )}
             {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="Voter ID">
              <h5 className="post"> {voterId}</h5>
             </Form.Item>
             )}
                 <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <ButtonGroup>
            
        <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/idinformation">Yes</Link>} cancelText="No">
        <Link to="/Hris/idinformation">Edit</Link>
       </Popconfirm>

      
    </ButtonGroup>
               
        </Form.Item>
           
         </Form>
     </Card>
        
        </div>
        ) 
    }
}

export default IDinformation1
