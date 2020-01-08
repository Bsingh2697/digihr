import 'antd/dist/antd.css';
import { Drawer, Button, Radio, Card ,Icon, Divider } from 'antd';
import './Drawercard.css'

import React, { Component } from 'react'
import Popup from './Popup'
const RadioGroup = Radio.Group;

export class Drawercard extends Component {
    state = { visible: false, placement: 'left' };

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

    render() {
        return (
           
            <div >
              <Divider className='homeHeadings' style={{fontSize:25}}>Quick Links</Divider>
                 <Button type="" onClick={this.showDrawer}>
                 <span style={{transform:'scale(1.5)', color:'#1890ff'}}><Icon type="share-alt"/></span>
        </Button>
        <Drawer style={{width:200 ,height:400 }}
        
          title="Quick Links"
          width={400}
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
           
            <Popup/>
        
         
        </Drawer>
            </div>
           
           
        )
    }
}

export default Drawercard
