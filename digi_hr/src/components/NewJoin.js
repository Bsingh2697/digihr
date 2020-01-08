import 'antd/dist/antd.css';
import { Card ,Divider,Icon } from 'antd';
import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import './Newjoin.css'
import axios from 'axios'
import getCookie from './Getcookie'

var dbName=getCookie('dbName')
var type2

function myFunction2(){
type2 =setTimeout(showPage , 1650)
console.log("dlskdlsld")
}
function showPage(){
    document.getElementById("loading").style.display ="none";

  }

export class NewJoin extends Component {
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
      axios.get('https://digihr-api.appspot.com/api//',
      {
        params:{
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
        
    })
    myFunction2()
    }


    render() {  
        const {posts , name} =this.state
        return (
            <div>
                <div className="loader5"  id="loading" >
                <Loader className="nav5"
         type="ThreeDots"
         color="#00BFFF"
         height="120"
         width="60"
         z-index="99999" 
      />  
          </div>
          
            
               <div>
               {
                            posts.length ?
                                posts.map(post =>
                                    <tr
                                         
                                        
                                        
                                        value={name}
                                       
                                        >
                                        <h style={{fontSize:21 , marginLeft:60}}>{post.name}</h>
                                       
                                    </tr>) :
                                    <div style={{fontSize:'14px' , marginTop:71, marginLeft:-15}} >
                                    <div style={{color:'#1b2a49', fontSize:'14px'}}> <Icon type="user-add" /> No New Joining</div> 
                                    </div>
                                
                        }
                         





               </div>
          
          </div>
        )
    }
}

export default NewJoin
