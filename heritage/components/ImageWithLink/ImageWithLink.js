import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './imageWithLink.module.scss'


export default class ImageWithLink extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href={this.props.referencia}>
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