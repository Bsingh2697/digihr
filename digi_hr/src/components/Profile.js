import 'antd/dist/antd.css';
import {BrowserRouter , Link ,Switch ,Router} from 'react-router-dom'
import { Drawer, List, Avatar, Divider, Col, Row, Card ,Button , notification } from 'antd';
import React, { Component } from 'react'
import './Profile.css'
import getCookie1 from './Getcookie1' ;
import cookieExists1 from './Cookieexists1' ;
import deleteCookies from './deleteCookies';
import getCookie from './Getcookie'
import axios from 'axios'


 

var empCode=getCookie('empCode')  
var dbName=getCookie('dbName')
var fullName , gender , city ,country , dob , company , department , designation ,email , mobile
const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };
  
  const DescriptionItem = ({ title, content }) => (
    <div
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
      }}
    >
      <p
        style={{
          marginRight: 8,
          display: 'inline-block',
          color: 'rgba(0,0,0,0.85)',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={(event) =>{deleteCookies(); notification.close(key);} }>
      
        <a  href="/"> Confirm</a>
      </Button>
    );
    notification.open({
      message: 'Alert',
      description:
        'Want To Log Out ?',
      btn,
      key,
      
    });
  }; 
  



export class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/employee/profile/info/',
  {
      params:{
          empCode:empCode,
          dbName:dbName
      }
  })
  .then(response => {
    console.log(response)
    fullName = response.data.emp_data[0].fullName;
     gender = response.data.emp_data[0].gender;
     city = response.data.emp_data[0].city;
     country = response.data.emp_data[0].country;
     dob = response.data.emp_data[0].dob;
     company = response.data.emp_data[0].company;
     department=response.data.emp_data[0].department;
     designation=response.data.emp_data[0].designation;
     email=response.data.emp_data[0].email;
     mobile=response.data.emp_data[0].mobile
    console.log(response.data.emp_data)
    this.setState({posts:response.data.emp_data})
     
     console.log(response.data.emp_data)
     this.setState({
      fullName:fullName,
      empCode:empCode,
      gender:gender,
      city:city,
      country:country,
      dob:dob,
     company:company,
     department:department,
     designation:designation,
     email:email,
     mobile:mobile
     })
  })
.catch(error => {
  console.log(error)
})  
}


    state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleFile(e){
    let file = e.target.files[0]
    this.setState({file:file})
}

handleUpload(e){
    let file_cont = this.state.file
    let formdata=new FormData()

    formdata.append('file', file_cont)
    axios({
        url: 'https://digihr-api.appspot.com/api/profile/upload/',
        method: "POST",
        data: formdata,
        headers: {                
            'Content-Type': undefined ,
            "Accept":"*/*"
        }
        
    })
    .then((res)=>{
        console.log(res)
    })    
}


  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
  
    render() {
      if(cookieExists1('id'))
      {
        return (
           
            <div  style={{marginRight:'3vw'}} >
            <span style={{backgroundColor:'#745c97', padding:'10px 15px 15px 15px', borderRadius:'25px'}}>
             <Avatar style={{ backgroundColor: '#87d068' }} icon="user" onClick={this.showDrawer}>
               
          /></Avatar><span style={{color:'black',fontFamily:'Arial',fontSize:'12px', fontWeight:'500',top:'50%'}}>&nbsp;Logged-in</span></span>
          <span className="get">{getCookie1('name')}</span>
        <Drawer
          width={540}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}>
          <p style={{ ...pStyle, marginBottom: 24 , fontSize:30 , color:'#755aea' }}>User Profile</p>
          <Divider />
                <h2 className="head">Upload Photo</h2>
                <input type="file" multiple name="file" onChange={(e) => this.handleFile(e)} />
            <button type="button" onClick={(e) => this.handleUpload(e)}>Upload</button>
                
                <Divider />
            
          
          <p style={pStyle}>Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem  title="Full Name" content={fullName} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Gender" content= {gender}/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content={city} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content={country} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content={dob} />
            </Col>
          
          </Row>
          <Divider />
          <p style={pStyle} className="profile">Company</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="ComanyName" content={company} />
            </Col>
          
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Designation" content={designation}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="Department" content={department} />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle} className="profile">Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem style={{fontSize:30}} title="Email" content={email} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content={mobile} />
            </Col>
          </Row>
        
          <Button type="primary"  onClick={openNotification}>
          
      Log Out

      </Button>
     
        </Drawer>
            </div>
            
           
        )
            }
            else
            return(
               <div>
                   You are not allowed to view this page
               </div> 
              
        )
    }
}

export default Profile
