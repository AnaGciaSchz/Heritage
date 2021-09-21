import styles from './searchCard.module.scss'
import Image from 'next/image'
import React from 'react'

function SearchCard(props){
  const [isRotated, setIsRotated] = React.useState(false);
  const [isNotBeenRotated, setIsNotBeenRotated] = React.useState(true);
  const onRotate = (boolean) => {setIsNotBeenRotated(false), setIsRotated(boolean);}
  const [showRotate, setShowRotate] = React.useState(false);
    return(
      <div>
            <img className={showRotate? styles.flipIcon : styles.flipIconHidden} src="/flip.svg" alt="Icono pque muestra que la carta se gira."/>
            <img className={props.star=="true"? styles.star : styles.starHidden} src="/star.svg" alt="Icono de una estrella."/>
        {isRotated? null:
      <div
      className={isNotBeenRotated? styles.card : isRotated ? styles.quitCard : styles.showCard} 
        onClick={() => onRotate(!isRotated)}
        onMouseEnter= {() => setShowRotate(true)}
        onMouseLeave = {() => setShowRotate(false)}>
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
        onClick={() => onRotate(!isRotated)}
        onMouseEnter= {() => setShowRotate(true)}
        onMouseLeave = {() => setShowRotate(false)}>
    <p className={styles.name}>{props.name}</p>
    <p className={styles.date}>Registro: {props.date}</p>
    <p className={styles.firtsLine}>{props.descriptionTitle}</p>
    <p className={styles.text}>{props.description}</p>
    <p className={styles.firtsLine}>{props.beenTitle}</p>
    <p className={styles.text}>{props.been}</p>
    <p className={styles.social}>
    <a href={props.red1Link}target="_blank">{props.red1}</a>
    &nbsp;
    <a href={props.red2Link}target="_blank">{props.red2}</a>
    &nbsp;
    <a href={props.red3Link}target="_blank">{props.red3}</a>
    </p>
    </div>}
    </div>
    )
    
}
export default SearchCard;