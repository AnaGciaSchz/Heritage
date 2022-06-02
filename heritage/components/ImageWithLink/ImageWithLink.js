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
        <Image className={styles.image}
          src={this.props.img}
          alt={this.props.alt}
          layout='responsive'
          width="0"
          height="0"
          objectFit="contain"
        />
      </a>
    )
  }
}