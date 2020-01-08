import React ,{Component} from 'react';
import ReactDOM from 'react-dom'
import './Homess.css'
import 'antd/dist/antd.css';
import { Col, Row ,Drawer,Button,Radio,Icon } from 'antd';
import Attendence from './Attendence';
import Calender from './Calender';
import Card from '@material-ui/core/Card'

export class Homess extends Component {
    render() {
        return (
            <div  style={{marginTop:30}}>
             {/* <Row gutter={16}>
              <Col span={6}>
                <Card className="zoom3">
                <Calender/>
                </Card> 
              </Col>
              <Col span={6}>
                <Card className="zoom4">
              <Attendence/>
                </Card> 
              </Col>
             
            
            </Row>
              */}
            
          </div>
          
        )
    }
}

export default Homess
