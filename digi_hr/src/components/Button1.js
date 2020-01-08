import {Button} from 'antd'
import React, { Component } from 'react'

const ButtonGroup=Button.Group
export class Button1 extends Component {
    render() {
        return (
            <div>
                  <ButtonGroup>
  <Button type="primary" htmlType="submit">Approve</Button>
  <Button>Not Approve</Button>
</ButtonGroup>
            </div>
        )
    }
}

export default Button1
