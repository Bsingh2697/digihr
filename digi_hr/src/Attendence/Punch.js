import React, { Component } from 'react'
import { Button ,Divider, notification , Form , Row , Col, Tooltip } from 'antd';
import axios from 'axios'
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'
import Punchout from './Punchout'
import { Link, withRouter } from 'react-router-dom'
import punchin from './punchin.png'
import punchout from './punchout.png'
import './punch.css'
 

const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Error !',
      description:
        'You have to punch-In first',
    });
  };

export class Punch extends Component { 
    constructor() {
        super();
        this.state = {
            reportInTime:'',
            date:'',
            status:'',
            reportInAddress:'',
            inAddrInGeoFans:'',
            empCode:getCookie1('empCode'),
            dbName:getCookie('dbName'),
            confirmation:'1'

        };
    }
         handleSubmit=e =>{   
            e.preventDefault()
           console.log(this.state)
           axios.post('https://digihr-api.appspot.com/api/attendance/punchin/', this.state)
                .then(response => {
                    console.log(response)
                })
                .catch(error => { 
                    console.log(error)
                })
        console.log(this.state.reportInTime)
        console.log(this.state.date)
        const { state = {} } = this.props.location;
        const { prevLocation } = state;
        this.setState(
            () => {
                if(this.state.confirmation=='1'){
                this.props.history.push(prevLocation || "/attendence/punchout");
                }
                else{
                    this.props.history.push(prevLocation || "/attendence/punchin");

                }
            },
        );
      }
      onChange=(time) =>{
        var tempDate = new Date();
            var date = (tempDate.getMonth()+1)+'/'+tempDate.getDate()+'/'+tempDate.getFullYear();
            var time = tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds();
          var dateTime = date+' '+time;
           this.setState({reportInTime:time})
           this.setState({date:date})
  
        } 
        
        

    render() {
        return (
            <div>
                  <Divider></Divider>
                  
        
                  <p className="divider">Punch In - Punch Out</p>
                  <Divider />
                  <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onSubmit={this.handleSubmit}>
          <Row>
            <Col span={10}>
            <div>  
                <Tooltip title="punchin">  
             <Button className="punchin" onClick={this.onChange}  htmlType="submit"><img className="image1"  src={punchin} /></Button>
             </Tooltip>     
            </div>
                       
            </Col>
            
            <Col span={6}>
                <div>
                    <Tooltip title="punchout">
            <Button onClick={() => openNotificationWithIcon('error')} className="punchout"><img className="image1" src={punchout} /></Button>
            </Tooltip>
            </div>
            </Col>
          </Row>
               
            </Form>
            
            </div>
        )
    }
}

export default withRouter(Punch)
