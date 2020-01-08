import "antd/dist/antd.css";
import { Form, Select, Input, Button ,Row , Col ,Icon} from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import React ,{Comment} from 'react';
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'
import axios from 'axios'

const { Option } = Select;

 class AddOD extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        posts:[],
        name: '',
        reportInTime: '',
        reportOutTime: '',
        remark:'',
        date:getCookie('date'),
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}
handleSubmit = e => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://digihr-api.appspot.com/api/regularise/attendance/', this.state)
      .then(response => {
          console.log(response)
          const { state = {} } = this.props.location;
          const { prevLocation } = state;
          this.setState(
              () => {
                  this.props.history.push(prevLocation || "/home/task");
                  window.location.reload()
                  
                }
           
            
          );
      })
      .catch(error => {
          console.log(error)
      })
}
changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
onChange=(time,timeString) =>{
  this.setState({reportInTime:timeString})
  console.log(this.state.dependendDob)
}
onChange1=(time,timeString) =>{
  this.setState({reportOutTime:timeString})
  console.log(this.state.dependendDob)
}

    render() {
        const { startValue, endValue, endOpen , name , remark } = this.state;
        const { getFieldDecorator } = this.props.form;
        return ( 
          <div className="no">
     
         
          <Divider style={{marginLeft:-10, fontStyle:"blue"}} className="divide">Leave Attendence</Divider>
          <Card className="yes">
         
          <Form className="no"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onSubmit={this.handleSubmit}
          >
  
            <Row gutter={10}>
            <Col span={12}>
             <Form.Item style={{marginLeft:170 , fontWeight:600}}  label="Report in">
          <DatePicker style={{marginLeft:10}}
            disabledDate={this.disabledStartDate}
            showTime
            format="HH:mm:ss"
            placeholder="Reportin Time"
            onChange={this.onChange}
          />
          </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item style={{marginLeft:28 , fontWeight:600}}  label = "Report Out">
          <DatePicker style={{marginLeft:-80}}
            disabledDate={this.disabledEndDate}
            showTime
            format="HH:mm:ss"
            placeholder="Reportout Time"
            onChange={this.onChange1}
          />
          </Form.Item>
            </Col>
          </Row>
            <Form.Item style={{fontWeight:600}}  label="Remark">
              {getFieldDecorator('Comment', {
                rules: [{  message: 'Please input your note!' }],
              })(<Input name="remark" value={remark} prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Remark"    onChange={this.changeHandler}  />)}
              </Form.Item>
            <Form.Item wrapperCol={{ span: 11, offset: 7 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
              </Form>
          </Card>
         
          </div>
        )
    }
}

export default Form.create()(AddOD)
