import 'antd/dist/antd.css';
import './Carousel.css'
import { Carousel } from 'antd';
import React, { Component } from 'react'
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'


class carousel extends Component {
    render() {
        return (
          <div className="carousel">
            <Carousel autoplay>
            
            <div>
            <img src={img1} alt="A image" style={{width:980 , height:380, marginLeft:100 ,border:10}} />
    </div>
    <div>
      <img src={img2} alt="A image" style={{width:980 , height:380, marginLeft:100 , border:10}} />
    </div>
    <div>
      <img src={img3} alt="A Image" style={{width:980 , height:380, marginLeft:100 , border:10}}/>
    </div>
    </Carousel>
    </div>
            
        )
    }
}

export default carousel

          