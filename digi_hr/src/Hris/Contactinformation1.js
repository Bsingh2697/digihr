import {Card ,Form ,Radio ,Input , Button, Select ,Divider ,Icon ,Popconfirm} from 'antd'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Contactinformation.css'
import axios from 'axios'
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'

const {Option} = Select;
const ButtonGroup = Button.Group;
var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var addressType , whenAvailable , addressLine1 , addressLine2 , country , state, city , pinCode

export class Contactinformation1 extends Component {
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
    render() {
    const { startValue, endValue, endOpen , posts } = this.state;
    return (
    <div>
     <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
           
           <Form 
             labelCol={{ span: 6 }}
             wrapperCol={{ span: 14 }}
           >
             {posts.map(post =>
         <Form.Item style={{fontWeight:600}}label="Address Type">
               <h5 className="post">  {post.addressType}</h5>
             </Form.Item>
             )}
             {posts.map(post =>
             <Form.Item style={{fontWeight:600}}label="When Available">
                <h5 className="post"> {post.whenAvailable}</h5>
             </Form.Item>
             )}
             {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="Address Line1">
               <h5 className="post"> {post.addressLine1}</h5>
             </Form.Item>
             )}
             {posts.map(post =>
          

             <Form.Item style={{fontWeight:600}} label="Address Line2">
                <h5 className="post"> {post.addressLine2}</h5>
             </Form.Item>
          )}
          {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="Counrty">
                <h5 className="post">{post.country}</h5>
             </Form.Item>
             )}
             {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="State">
               <h5 className="post"> {post.state}</h5>
             </Form.Item>
             )}
             {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="City">
                <h5 className="post"> {post.city} </h5>
             </Form.Item>
             )}
            {posts.map(post =>
             <Form.Item style={{fontWeight:600}} label="Pin Code">
             <h5 className="post">{post.pinCode}</h5>
             </Form.Item>
            )}
             <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
         <ButtonGroup>
         <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/contactinformation">Yes</Link>} cancelText="No">
        <Link to="/Hris/contactinformation">Edit</Link>
         </Popconfirm> 
         </ButtonGroup>
         </Form.Item>
        </Form>
           </Card>           
    </div>
        )
    }
}

export default Contactinformation1
