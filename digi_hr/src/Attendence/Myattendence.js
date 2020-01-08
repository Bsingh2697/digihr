import 'antd/dist/antd.css';
import { DatePicker, Card ,Form ,Drawer ,Tooltip} from 'antd';
import moment from 'moment';
import './Myattendence.css'
import React, { Component } from 'react'
import {Divider ,Button} from 'antd'
import View from './View'
import axios from 'axios'
import getCookie1 from '../components/Getcookie1';
import getCookie from '../components/Getcookie'
import createCookie from '../components/createCookie'

const {  RangePicker } = DatePicker;
const ButtonGroup=Button.Group

function onChange(date, dateString) {
  console.log(date, dateString);
}
var present ,WeekendOff , absent ,date4 ,date3
export class Myattendence extends Component {
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

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  constructor(props) {
    super(props)
    this.state = {
        posts:[],
        basics:[],
        startDate:'',
        endDate:'',
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName'),
        visible: false, placement: 'bottom'
    }
    
}  
handleSubmit = e => {
    e.preventDefault() 
    console.log(this.state)
    axios.post('https://digihr-api.appspot.com/api/employee/attendance/', this.state)
    .then(response => {
       console.log(response)
       var status1=response.data.attendance_data;
       var date1=response.data.attendance_data;
       present = response.data.present;
      absent = response.data.absent;
      WeekendOff = response.data.WeekendOff;
    console.log(response.data)
    const posts=response.data

    this.setState({
     present:present,
     absent:absent,
     WeekendOff:WeekendOff,
     

     })
    var i
      for (i in status1)
      {
        var status2=status1[i].status
        console.log(status2)
      }
      var date3=[]
      date3.length=date1.length
      for (i in date1)
      {
        var date2=date1[i].date
        date3[i]=date2
      }
      var date4=date3
      console.log(date4)
      this.setState({
        // date3:date3,
        posts:date4
      })

    })
  .catch(error => {
    console.log(error)
  })  
  }
onChange=(date,dateString) =>{
    this.setState({startDate:dateString})
    console.log(this.state.startDate)
  } 
  onChange1=(date,dateString) =>{
    this.setState({endDate:dateString})
   }
   handleEdit = e => {
     var today=new Date()
    createCookie('date', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))
    const { state = {} } = this.props.location;
    const { prevLocation } = state;
    this.setState(
        () => {
            this.props.history.push(prevLocation || "/attendence/addod");
        },
    );
}

 
    render() {
      const{posts ,date3} =this.state
        return (
            <div>
               <Divider className="divide">Period</Divider>
               <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onSubmit={this.handleSubmit}
      >
                <Card className="attendence">
        <h2 className="check" style={{fontSize:18 , fontWeight:650 , marginRight:24}}> Check Date :</h2>   
        <div></div>    
        <DatePicker 
      
        
      format="MM/DD/YYYY"
      placeholder="start"
        onChange={this.onChange}
    />
         <DatePicker 
      
        
      format="MM/DD/YYYY"
      placeholder="End"
        onChange={this.onChange1}
    /> 
      </Card>
      <Button type="primary" htmlType="submit" onClick={this.showDrawer} style={{marginTop:40 , marginLeft:-280}}> View</Button>
    

  </Form>
  <div>
 
        <Drawer
          height={550}
          title="Attendence Details"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
      
      
      <div>
                        <table className="tablediv1">
                            <thead className="theaddiv1">
                                <tr>
                                    <th className="bold1">Present Days</th>
                                    <th className="bold1">Absent Days</th>
                                    <th className="bold1">Half Days</th>
                                    <th className="bold1">Miss Punch Out</th>
                                    <th className="bold1">Leave</th>
                                    <th className="bold1">Holiday</th>
                                    <th className="bold1">Half Day Leave</th>
                                    <th className="bold1">Late Arrival</th>
                                    <th className="bold1">Early Exit</th>
                                   
                                   
                                </tr>
                                
                            </thead>
                          
                                  
                            
                                        <tr
                                            type="text"
                                            
                                            >
                                            <th className="thdiv1">{present}</th>
                                            <th className="thdiv1">{absent}</th>
                                            <th className="thdiv1">2</th>
                                            <th className="thdiv1">3</th>
                                            <th  className="thdiv1">1</th>
                                            <th  className="thdiv1">{WeekendOff}</th>
                                            <th  className="thdiv1">5</th>
                                            <th  className="thdiv1">2</th>
                                            <th  className="thdiv1">3</th>
                                            
                                           
                                        </tr>
                                  
                        </table>
                        </div>
                        <div >
                        <table className="tablediv2">
                            <thead className="theaddiv2">
                                <tr>
                                    <th className="bold2">PRESENT/ABSENT DATE</th>
                                    <th className="bold2">Operation</th>
                                </tr>
                                
                            </thead>
                            {posts.map(post =>
                                        <tr
                                            type="text"
                                            
                                            >
                                            <th className="thdiv2">{post}</th>
                                            <th className="thdiv1">
                                               
                                            <ButtonGroup>
                        <Tooltip title="Regularize">
                          
                            <Button icon="bulb"  className="butt1" type="submit" onClick={() => {this.handleEdit(post)}}/>
                          
                        </Tooltip>
                                                   
                        </ButtonGroup>             
                              </th> 
                            </tr>     
                            )}  
                        </table>          
                        
      </div>
       </Drawer> 
                
            </div>
                        </div>
      
        )
    }
}

export default Myattendence
