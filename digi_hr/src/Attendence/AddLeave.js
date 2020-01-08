import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Select, Input, Button } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';

const { Option } = Select;



class AddLeave extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
 
    });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
     
      
      <Divider className="divide" >Add Leave</Divider>
      <Card style={{ width: 700 ,fontWeight:400,marginLeft:150}}>
     
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item style={{fontWeight:600}}  label="Name">
          {getFieldDecorator("Leave Types", {
            rules: [{ message: "select your Leave types" }]
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="Others">Others</Option>
            </Select>
          )}
        </Form.Item>
  
        <Form.Item style={{fontWeight:600}} label="Leave Types">
          {getFieldDecorator("Leave Reason", {
            rules: [{required:true , message: " select your Leave Types!" }]
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="CL">CL</Option>
              <Option value="EL">EL</Option>
              <Option value="SL">SL</Option>
              <Option value="COMPENSATORY LEAVE">COMPENSATORY LEAVE</Option>
            </Select>
          )}
        </Form.Item>
      <Form.Item style={{marginLeft:-10 , fontWeight:600}} label="Start Date">
      <DatePicker style={{marginLeft:-180}}
        disabledDate={this.disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        
        value={startValue}
        placeholder="Start"
        onChange={this.onStartChange}
        onOpenChange={this.handleStartOpenChange}
      />
      </Form.Item>
      <Form.Item style={{marginLeft:-10 , fontWeight:600}} label = "End Date">
      <DatePicker style={{marginLeft:-180}}
        disabledDate={this.disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={endValue}
        placeholder="End"
        onChange={this.onEndChange}
        open={endOpen}
        onOpenChange={this.handleEndOpenChange}
      />
      </Form.Item>
        <Form.Item style={{fontWeight:600}}  label="Reason">
          {getFieldDecorator('Reason', {
            rules: [{  message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item style={{fontWeight:600}}  label="Duration">
          {getFieldDecorator('Duration', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item style={{fontWeight:600}}  label="Manager Comment">
          {getFieldDecorator('Comment', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item style={{fontWeight:600}}  label="Message">
          {getFieldDecorator('Message', {
            rules: [{ message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
          </Form>
      </Card>
    
      </div>
    );
  }
}
export default Form.create()(AddLeave)