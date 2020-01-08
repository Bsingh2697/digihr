import 'antd/dist/antd.css';
import {BrowserRouter as Router,  Switch} from 'react-router-dom'
import {Link ,Route} from 'react-router-dom'
import { Drawer, Button , Tooltip } from 'antd';
import React, { Component } from 'react'
import './View.css'

const ButtonGroup=Button.Group

export class View extends Component {
    state = { visible: false, placement: 'bottom' };

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
            <div>
                <Button type="primary" onClick={this.showDrawer} style={{marginTop:40 , marginLeft:-280}}>
          View
        </Button>
        <Drawer
          height={350}
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
                                            <th className="thdiv1">billa</th>
                                            <th className="thdiv1">ssds</th>
                                            <th className="thdiv1">mokkkel</th>
                                            <th className="thdiv1">emoji</th>
                                            <th  className="thdiv1">ssxs</th>
                                            <th  className="thdiv1">ssxs</th>
                                            <th  className="thdiv1">ssxs</th>
                                            <th  className="thdiv1">ssxs</th>
                                            <th  className="thdiv1">ssxs</th>
                                            
                                           
                                        </tr>
                                
                            
                           
                        </table>
                        </div>
                        <div >
                        <table className="tablediv2">
                            <thead className="theaddiv2">
                                <tr>
                                    <th className="bold2">Absent Date</th>
                                    <th className="bold2">Operation</th>
                                </tr>
                                
                            </thead>
                                        <tr
                                            type="text"
                                            
                                            >
                                            <th className="thdiv2">dhdhdhdh</th>
                                            <th className="thdiv1">
                                              
                                            <ButtonGroup>
                        <Tooltip title="Regularize">
                            <Link to="/AddOD">
                            <Button icon="bulb"  className="butt1" type="submit" onClick={() => {  }}/>
                           </Link>
                        </Tooltip>
                                                   
                        </ButtonGroup>
                                              
                                              
                                              
                                              
                                              </th> 

                                            
                                            
                                           
                                        </tr>
                                
                            
                           
                        </table>
                        
                        
      </div>
        </Drawer>
                
            </div>
        )
    }
}

export default View
