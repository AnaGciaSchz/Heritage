import styles from './searchCard.module.scss'
import Image from 'next/image'
import React from 'react'

function SearchCard(props){
  const [isRotated, setIsRotated] = React.useState(false);
  const [isNotBeenRotated, setIsNotBeenRotated] = React.useState(true);
  const onRotate = (boolean) => {setIsNotBeenRotated(false), setIsRotated(boolean);}
    return(
      <div>
        {isRotated? null:
      <div
      className={isNotBeenRotated? styles.card : isRotated ? styles.quitCard : styles.showCard} 
        onClick={() => onRotate(!isRotated)}>
    <p className={styles.name}>{props.name}</p>
    <p className={styles.date}>Registro: {props.date}</p>
    <Image className={styles.image}
          src={props.img}
          alt={props.alt}
          layout= 'responsive'
          width = "0"
          height="0"
          objectFit="contain"
        />
    <p className={styles.firtsLine}>{props.firtsLine}</p>
    <p className={styles.text}>{props.text}</p>
    </div>}
    {!isRotated? null:
    <div
      className={isRotated ? styles.showCard : styles.quitCard} 
        onClick={() => onRotate(!isRotated)}>
    <p className={styles.name}>{props.name}</p>
    <p className={styles.date}>Registro: {props.date}</p>
    <p className={styles.firtsLine}>Descripción</p>
    <p className={styles.text}>{props.description}</p>
    <p className={styles.firtsLine}>Ha estado en</p>
    <p className={styles.text}>{props.been}</p>
    <p className={styles.social}>Redes: Red Red Linkedin</p>
    </div>}
    </div>
    )
    
}
export default SearchCard;