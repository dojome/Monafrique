import React from 'react'
import AwesomeSlider from 'react-awesome-slider'

import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'

export default class Slider extends React.Component {
  render() {
    return (
      <AwesomeSlider bullets={false}>
        <div data-src={slider1} />
        <div data-src={slider2} />
        <div data-src={slider3} />
      </AwesomeSlider>
    )
  }
}
