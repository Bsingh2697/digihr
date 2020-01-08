import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Seeregularize.css'
import {Tooltip ,Button , Icon ,Modal} from 'antd'
import getCookie1 from '../components/Getcookie1'
import getCookie from '../components/Getcookie'
import createCookie from '../components/createCookie'
import createCookie1 from '../components/createCookie1'

var empCode=getCookie1('empCode')
var taskId=getCookie1('regularizeId')
var dbName=getCookie('dbName')

const ButtonGroup=Button.Group
var regularizationCode,applicationDate ,status ,stage
export function Edit(e) {
  var today=new Date();
  createCookie('regularizationCode', e, Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate()))
window.helloComponent.handleEdit(e)
}

export class Seeregularize extends Component {
  constructor(props) {
    super(props)
    window.helloComponent=this
    this.state = {
        posts:[],
        empCode:getCookie1('empCode'),
        dbName:getCookie('dbName')
    }
}

componentDidMount(){
  axios.get('https://digihr-api.appspot.com/api/post/regularinfo',
  {
      params:{
          empCode:getCookie1('empCode'),
          dbName:dbName
      }
  })
  .then(response => {
    console.log(response)
    regularizationCode = response.data.regularize_data.regularizationCode;
    applicationDate = response.data.regularize_data.applicationDate;
    status = response.data.regularize_data.status;
    stage=response.data.regularize_data.stage;
     console.log(response.data.regularize_data)
    this.setState({posts:response.data.regularize_data})
     
     console.log(response.data.regularize_data)
     this.setState({
      regularizationCode:regularizationCode,
      applicationDate:applicationDate,
      status:status,
      stage:stage,
     })
  })
.catch(error => {
  console.log(error)
})  
}
// handleEdit = e => {
//   console.log(this.state)  
//       const { state = {} } = this.props.location;
//       const { prevLocation } = state;
//       this.setState(
//           () => {
//               this.props.history.push(prevLocation || "/attendence/regularizeattendence");
//           },
//       ); 
//       console.log('honey')



// }




    render() {
        const { visible, confirmLoading, ModalText ,posts } = this.state;
        return (
            <div style={{marginTop:10 , marginLeft:55}}>
          <table className="tablediv1">
                         <thead className="theaddiv1">
                             <tr>
                                 <th className="bold1">REGULARIZIATION CODE  </th>
                                 <th className="bold1">DATE  </th>
                                 <th className="bold1"> STATUS </th> 
                                 <th className= "bold1">SEE DETAILS</th>
                             </tr>
                             
                         </thead>
                         {posts.map(post =>
                      <tr>
                <th className="thdiv1">{post.regularizationCode}</th>
                <th className="thdiv1">{post.applicationDate}</th>
                 <th className="thdiv1">{post.status}</th>
                 <th className="thdiv1">
                <ButtonGroup>
                  <Tooltip title="See Details">
                    <Button icon="right-circle" className="butt1"  type="submit" />
                    </Tooltip>                      
                </ButtonGroup>
               
                </th>
  
             </tr>
               )}
       </table>
     </div>
          
        )
    }
}

export default Seeregularize
