import "antd/dist/antd.css";
import { Form, Select, Input, Button } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {Card} from 'antd'
import { Divider } from 'antd';
import React, { Component } from 'react'
const { Option } = Select;




export class Popup extends Component {
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onSubmit={this.handleSubmit}
          >
                <Form.Item label="Link Name">
              {getFieldDecorator('link_name', {
                rules: [{ message: 'Please input link name!' }],
              })(<Input addonBefore="https:/" addonAfter=".com" />)}
            </Form.Item>
    
            <Form.Item label="Link URL">
              {getFieldDecorator('link_url', {
                rules: [{ message: 'Please input link URL !' }],
              })(<Input addonBefore="https:/" addonAfter=".com"  />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Go
              </Button>
            </Form.Item>
            </Form>
                
            </div>
        )
    }
}

export default Form.create()(Popup)