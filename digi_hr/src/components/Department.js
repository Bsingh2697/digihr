import React, { Component } from 'react'
import './Department.css'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Icon } from 'antd';
import getCookie from './Getcookie'
import getCookie1 from './Getcookie1'


var department=getCookie1('department')
var id =getCookie1('id')
var dbName=getCookie('dbName')
var type3

function myFunction3(){
type3 =setTimeout(showPage , 1650)
console.log("dlskdlsld")
}
function showPage(){
    document.getElementById("loadings").style.display ="none";

  }


export class Department extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts: [],
            department:'',
            id:'' ,
            name:'',
            dbName:getCookie('dbName')
            
        }
    }
    componentDidMount(){
      axios.get('https://digihr-api.appspot.com/api/departmentMembers/',
      {
        params:{
         department:department,
          id:id,
          dbName:dbName
        }
      })
      .then(response => {
        
        console.log(response)
        console.log(response.data.member_data)
        this.setState({posts:response.data.member_data})
      })
      .catch(error => {
        console.log(error)
        this.setState({ errorMsg: 'Error retrieving data' })
    })
    myFunction3()
    }
    render() {
    const { member_data,id,department, errorMsg ,name ,posts} = this.state

        return (
            <div>
                        <div className="loader6"  id="loadings" >
                <Loader className="nav5"
         type="Rings"
         color="#00BFFF"
         height="120"
         width="60"
         z-index="99999" 
      />  
          </div>
          
            
                {
                            posts.length ?
                                posts.map(post =>
                                    <tr
                                         
                                        
                                        
                                        value={name}
                                       
                                        >
                                        <h style={{fontSize:21 , marginLeft:60}}>{post.name}</h>
                                       
                                    </tr>) :
                                    <div style={{fontSize:'14px' , marginTop:71, marginLeft:-15, color:'#001529'}}><Icon type="usergroup-add" /> No Department Members</div> 
                                
                        }
                         
            </div>
        )
    }
}

export default Department
