import {Button} from 'antd'
import React, { Component } from 'react'

const ButtonGroup=Button.Group
export class Button2 extends Component {
    render() {
        return (
            <div>
                 <ButtonGroup>
  <Button type="primary" htmlType="submit">WithDraw</Button>
  <Button onClick={this.handleReset}>Reject</Button>
</ButtonGroup> 
            </div>
        )
    }
}

export default Button2
