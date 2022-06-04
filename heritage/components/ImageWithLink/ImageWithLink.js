import Image from 'next/image'
import React from 'react'
import styles from './imageWithLink.module.scss'


export default class ImageWithLink extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href={this.props.referencia} target="_blank">
        <img src={this.props.img} alt={this.props.alt}/>
        
      </a>
    )
  }
}