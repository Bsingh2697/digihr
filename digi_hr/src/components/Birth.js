import 'antd/dist/antd.css';
import { Card, Divider } from 'antd';
import {  Col, Row ,Drawer,Button,Radio,Icon ,message , Input, Modal ,Form} from 'antd';
import { Tabs} from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
//import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon} from 'mdbreact'
import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import getCookie from './Getcookie'
import createCookie1 from './createCookie1'
import axios from 'axios'
import './Birth.css'
import getCookie1 from './Getcookie1';

var dbName=getCookie('dbName')
var empId=getCookie1('empId')
var type1

function myFunction1(){
type1 =setTimeout(showPage , 1650)
console.log("dlskdlsld")
}
function showPage(){
    document.getElementById("lead").style.display ="none";
    

  }

export class Birth extends Component {
  

  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
 

  state ={
    Birthday : [] , 
    dbName:getCookie('dbName'),
     message: '',
     empId:getCookie1('empId'),
     empCode:getCookie1('empCode')
    
    

  }

  componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/birthday/' ,
  {
    params:{
      dbName:dbName
    }
  })
  .then(Response => {
    var today=new Date()
    var empId=(Response.data.birthday_data.empId)
    createCookie1('empId', empId, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))
    console.log(Response)
    const Birthday = Response.data.birthday_data;
    this.setState({ Birthday:Response.data.birthday_data });
    
  })
  myFunction1()
};
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/post/user/login/', this.state)
      .then(response => {
          console.log(response)
      })
      .catch(error => {
        console.log(error)
    })
    }

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
  

    render() {
      const { visible, loading  , Birthday} = this.state;
      const { getFieldDecorator } = this.props.form;
        return (
          <div>
            
            <div className="loader9"  id="lead" >
                <Loader className="nav9"
         type="Circles"
         color="#00BFFF"
         height="90"
         width="40"
         z-index="99999" 
      />  
          </div>
                        
          
            <div style={{fontSize:'16px' , marginTop:71, marginLeft:-15}} >
         {
           Birthday.length ?
           Birthday.map(Birth =>
            <div className="birth" onClick={this.showModal}> Happy Birthday {Birth.name}</div>
            
            ):
         
         <span style={{color:'#1b2a49', fontSize:'14px'}}> <Icon type="team" /> No Buddies Found</span> 
         
        
           }
           </div>
         
          
          <Modal
          visible={visible}
          title="Wish him/her"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Back
            </Button>,
            <Button key="submit" type="primary"  loading={loading} onClick={this.handleOk} onSubmit={this.handleSubmit}>
              Send
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
        <Form.Item label=" Add Note">
          {getFieldDecorator('message', {
            rules: [{  message: 'Please input your note!' }],
          })(<Input name="message" value={message} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Send a message"   onChange={this.changeHandler}/>)}
        </Form.Item>
        </Form>
        </Modal>
        </div>
        )
    }
}

export default Form.create()(Birth)
