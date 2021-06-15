import styles from './searchCard.module.scss'
import Image from 'next/image'
import React from 'react'

function SearchCard(props){
  const [isRotated, setIsRotated] = React.useState(false);
  const onRotate = () => setIsRotated((rotated) => !rotated);
    return(
        <div className={styles.card} onClick={onRotate}>
          <p className={styles.name}>{props.name}</p>
          <Image className={styles.image}
            src={props.img}
            alt={props.alt}
            layout= 'responsive'
            width = "0"
            height="0"
            objectFit="contain"
          />
      <p className={styles.firtsLine}>{props.firtsLine}{isRotated ? 'rotated' : 'not rotated'}`</p>
      <p className={styles.text}>{props.text}</p>
      </div>
    )
    
}
export default SearchCard;