import 'antd/dist/antd.css';
import { Card ,Divider ,Icon } from 'antd';
import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import './Holidays.css'
import axios from 'axios'
import getCookie from './Getcookie'

var dbName=getCookie('dbName')

var type4

function myFunction4(){
type4 =setTimeout(showPage , 1650)
console.log("dlskdlsld")
}
function showPage(){
    document.getElementById("leading").style.display ="none";

  }


export class Holidays extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            posts: [],
            holidays:'',
            dbName:getCookie('dbName')
            
        }
    }
    componentDidMount(){
      axios.get('https://digihr-api.appspot.com/api/total/holiday/',
      {
        params:{
          dbName:dbName
        }
      })
      .then(response => {
        
        console.log(response)
        console.log(response.data.holiday_data)
        this.setState({posts:response.data.holiday_data})
      })
      .catch(error => {
        console.log(error)
        
    })
    myFunction4()
    }



    render() {
        const {posts , holidays} = this.state
        return (
            <div>  
                           <div className="loader10"  id="leading" >
                <Loader className="nav5"
         type="Watch"
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
                                         
                                        
                                        
                                        
                                       
                                        >
                                        <h style={{fontSize:21 , marginLeft:60}}><Icon type="code" style={{marginTop:10 , marginLeft:-10}}/>{post.holiday}</h>
                                       
                                    </tr>) :
                                    <div class="none">No Holidays Found</div> 
                                
                        }
                   
                   
                   </div> 
          </div>
        )
    }
}

export default Holidays
