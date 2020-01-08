import 'antd/dist/antd.css';
import { Calendar, Divider ,Card } from 'antd';
import './Calender.css'
import './Homes.css'

import React, { Component } from 'react'
function onPanelChange(value, mode) {
  console.log(value, mode);
}

export class Calender extends Component {
  render() {
    return (
      
       <div> 
        <Divider className='homeHeadings' style={{fontSize:25 }}>Calender </Divider>
        <Calendar style={{fontSize:'10px',marginTop:'-45px', transform:'scale(.85)'}} fullscreen={false} onPanelChange={onPanelChange} />
      </div> 
    )
  }
}

export default Calender
