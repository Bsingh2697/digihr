import React, { Component } from 'react'
import { Button ,Divider ,notification ,Form ,Tooltip, Col , Row} from 'antd';
import axios from 'axios'
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'
import { Link, withRouter } from 'react-router-dom'
import punchin from './punchin.png';
import punchout from './punchout.png'

const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Error !',
      description:
        'You have to punch-Out first',
    });
  };

export class Punchout extends Component {
    constructor() {
        super();
        this.state = {
            reportOutTime:'',
            reportInTime:'',
            status:'',
            reportOutAddress:'',
            outAddrOutGeoFans:'',
            empCode:getCookie1('empCode'),
            dbName:getCookie('dbName'),
            confirmation:'2'

        };
    }
          handleSubmit=e =>{   
          e.preventDefault()
           console.log(this.state)
           axios.post('https://digihr-api.appspot.com/api/attendance/punchout/', this.state)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        const { state = {} } = this.props.location;
        const { prevLocation } = state;
        
        this.setState(
            () => {
                if(this.state.confirmation=='2'){
                this.props.history.push(prevLocation || "/attendence/punch");
                }
                else{
                    this.props.history.push(prevLocation || "/attendence/punchout");

                }
            },
        );
      }
      onChange=(time) =>{
        var tempDate = new Date();
            var date = (tempDate.getMonth()+1)+'/'+tempDate.getDate()+'/'+tempDate.getFullYear();
            var time = tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds();
          var dateTime = date+' '+time;
           this.setState({reportOutTime:time})
  
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
        onSubmit={this.handleSubmit}
      >
            <Row>
            <Col span={10}>
            <div>  
                <Tooltip title="punchin">  
                <Button className="punchin" onClick={() => openNotificationWithIcon('error')}><img className="image1" src={punchin}/></Button>
             </Tooltip>     
            </div>
                       
            </Col>
            
            <Col span={6}>
                <div>
                    <Tooltip title="punchout">
                    <Button className="punchout" onClick={this.onChange} htmlType="submit"><img className="image1" src={punchout}/></Button>
            </Tooltip>
            </div>
            </Col>
          </Row>
               
                <div className='date'>
               
               <h1> {this.state.punchOut}</h1>
            </div>
            </Form>
            </div>
        )
    }
}

export default withRouter(Punchout)
