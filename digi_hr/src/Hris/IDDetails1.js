import "antd/dist/antd.css";
import { Form, Select, Input, Button , Icon  ,Popconfirm} from "antd";
import {Link} from 'react-router-dom'
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'
import axios from 'axios'

import React, { Component } from 'react'

const { Option } = Select;
const ButtonGroup = Button.Group;

var empCode=getCookie1('empCode')
var dbName=getCookie('dbName')
var idType , doissue , issuingAuthority ,poIssue, noDocument, number

export class IDDetails1 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts:[],
            idType: '',
            doissue: '',
            issuingAuthority: '',
            poIssue:'',
            noDocument:'',
            number:'',
            
            empCode:getCookie1('empCode'),
            dbName:getCookie('dbName')
        }
    }
    componentDidMount(){
      axios.get('https://digihr-api.appspot.com/api/get/id/info/',
      {
          params:{
              empCode: getCookie1('empCode'),
              dbName:getCookie('dbName')
          }
      })
      .then(response => {
        console.log(response)
        idType = response.data.emp_data[0].idType;
        doissue = response.data.emp_data[0].doissue;
         issuingAuthority = response.data.emp_data[0].issuingAuthority;
         poIssue = response.data.emp_data[0].poIssue;
         noDocument = response.data.emp_data[0].noDocument;
         number=response.data.emp_data[0].number;
         
        console.log(response.data.emp_data)
        this.setState({posts:response.data.emp_data})
         
         console.log(response.data.emp_data)
         this.setState({
          idType:idType,
          doissue:doissue,
          issuingAuthority:issuingAuthority,
          poIssue:poIssue,
          noDocument:noDocument,
          number:number
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
               <Divider style={{marginTop:-10}} className="divide">ID Information</Divider>
          <Card className="shadow-box" style={{ width:700 ,fontWeight:400,marginLeft:180}}>
         
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
         
          >
            {posts.map(post =>
                <Form.Item style={{fontWeight:600}} label="ID Type">
             <h5 className="post"> {post.idType} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Number">
            <h5 className="post"> {post.number} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{marginLeft:-5 , fontWeight:600}} label="Date of Issue">
          <h5 className="post">{post.doissue}</h5>   
          </Form.Item>  
            )} 
            {posts.map(post =>  
            <Form.Item style={{fontWeight:600}} label="Place of Issue">
            <h5 className="post">{post.poIssue} </h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Issuing Authority">
         <h5 className="post"> {post.issuingAuthority}</h5>
            </Form.Item>
            )}
            {posts.map(post =>
            <Form.Item style={{fontWeight:600}} label="Name on Document">
             <h5 className="post">{post.noDocument}</h5>
            </Form.Item>
            )}
             <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
         <ButtonGroup>
         <Popconfirm title="Are you want to Edit？" okText={ <Link to="/Hris/Iddetails">Yes</Link>} cancelText="No">
        <Link to="/Hris/Iddetails">Edit</Link>
         </Popconfirm> 
         </ButtonGroup>
         </Form.Item>
        
         
              </Form>
          </Card> 
            </div>
        )
    }
}

export default IDDetails1
