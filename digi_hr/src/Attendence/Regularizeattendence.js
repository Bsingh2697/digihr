import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

export class Regularizeattendence extends Component {

    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
      };
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
       
          <div>
     <table className="tablediv1" >
         <thead className="theaddiv1" >
             <tr>
                <th className="bold1">EMPCODE</th>
                <th className="bold1">ACTUAL IN TIME</th>
                <th className="bold1">ACTUAL IN TIME</th>
                <th className="bold1">REPORT IN TIME</th>
                <th className="bold1">REPORT OUT TIME</th>
                  <th className="bold1">DATE</th>
                 <th className="bold1">REMARK</th>
            </tr>
        </thead>
                
                     
                        <tr>
                        <th className="thdiv1"  >empCode</th>
                        <th className="thdiv1" >taskId</th>
                        <th className="thdiv1" >status</th>
                        <th className="thdiv1" > asasas</th>
                        </tr>                           
                          
             </table>

            </div>
        )
    }
}

export default Regularizeattendence
