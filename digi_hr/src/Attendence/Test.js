import React, { Component } from 'react'
import {Button ,Form} from 'antd'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import getCookie from '../components/Getcookie'
import getCookie1 from '../components/Getcookie1'

var type

function myFunction(){
type =setTimeout(showPage , 1650)
console.log("dlskdlsld")
}
function showPage(){
    document.getElementById("loader").style.display ="none";
  }
  

export class Test extends Component {
    componentDidMount = (e) => {
        myFunction()
    }

    render() {
        return (
            <div>
                <div   id="loader" >
                <Loader 
         type="Bars"
         color="#00BFFF"
         height="100"	
         width="100"
      />  
              </div>
              
       
            </div>
        )
    }
}

export default Test
