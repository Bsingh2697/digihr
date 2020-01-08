import 'antd/dist/antd.css';
import { Card, Col, Row , Icon} from 'antd';
import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd';
import {Divider} from 'antd'
import Seeregularize from './Seeregularize'

const { Option } = Select;
const {ButtonGroup}=Button.Group

export class Myregularization extends Component {
    
    render() {
        const {getFieldDecorator} =this.props.form
        return (
            <div>
                  <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    onSubmit={this.handleSubmit}
                  >
                <Divider className="divide">Leave Details</Divider>
                <Row>
            <Col span={12}>
            <Form.Item style={{fontWeight:600 , marginLeft:-10}}label="Regularization Code">
                {getFieldDecorator('addresstype', {
                  rules: [{ message: 'Please input your address type!' }],
                })(<Input  prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Regularization Code"    onChange={this.changeHandler} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item style={{fontWeight:600}}label="Application Date">
                {getFieldDecorator('addresstype', {
                  rules: [{ message: 'Please input your address type!' }],
                })(<Input  prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Application Date"    onChange={this.changeHandler} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item style={{fontWeight:600}}label="Stage">
                {getFieldDecorator('addresstype', {
                  rules: [{ message: 'Please input your address type!' }],
                })(<Input  prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder= "Stage"    onChange={this.changeHandler} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item style={{fontWeight:600}}label="Status">
                {getFieldDecorator('addresstype', {
                  rules: [{ message: 'Please input your address type!' }],
                })(<Input  prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="status"    onChange={this.changeHandler} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              
              <Button type="primary" style={{marginLeft:380}} >Submit</Button>
            </Form.Item>
            </Col>
            <Col span={12}>
             
            </Col>
          </Row>
            </Form>
           <Seeregularize/>
          </div>
        )
    }
}

export default Form.create()(Myregularization)
