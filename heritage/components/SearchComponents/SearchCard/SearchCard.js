import styles from './searchCard.module.scss'
import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import { useIntl } from "react-intl"
import { useRouter } from "next/router"

import { fetchWrapper } from "../../../pages/api/handlers/fetchWrapper";

export default function SearchCard(props){
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })

  const [isRotated, setIsRotated] = useState(false);
  const [isNotBeenRotated, setIsNotBeenRotated] = useState(true);
  const onRotate = (boolean) => {setIsNotBeenRotated(false), setIsRotated(boolean);}
  const [showRotate, setShowRotate] = useState(false);
  const [deleteButton, setDeleteButton] = useState(null)
  const [deletedMessage, setDeletedMessage] = useState(null)
  const router = useRouter();
  var dataMap = new Map();

  function createDeleteButton(){
    if(localStorage != null && localStorage.getItem('user') != null){
      setDeleteButton(<button className= {styles.cardButton} onClick={deleteCard}>{f("Eliminar")}</button>)
    }else{
      setDeleteButton(null)
    }
  }
  
  const deleteCard = async (event) => {
    try {
      dataMap.set("index", props.index);
      dataMap.set("id", props.id);
      const response = await fetchWrapper.post("http://localhost:3000/api/card/delete", Array.from(dataMap.entries()));
      if (response.status < 200 || response.status > 299) {
        console.log(response)
        setDeletedMessage(<p>{f("NoEliminado")}</p>)
      }
      else{
        setDeletedMessage(<p>{f("Eliminado")}</p>)
      }
      }
    catch (error) {
    }
  };

  useEffect(() => {
    createDeleteButton();
  }, [router.locale]);
    return(
      <div>
            <img className={showRotate? styles.flipIcon : styles.flipIconHidden} src="/flip.svg" alt={f("IconoGirarCarta")}/>
            <img className={props.star=="true"? styles.star : styles.starHidden} src="/star.svg" alt={f("IconoEstrella")}/>
        {isRotated? null:
      <div
      className={isNotBeenRotated? styles.card : isRotated ? styles.quitCard : styles.showCard} 
        onClick={() => onRotate(!isRotated)}
        onMouseEnter= {() => setShowRotate(true)}
        onMouseLeave = {() => setShowRotate(false)}>
    {deletedMessage}
    <p className={styles.name}>{props.name}</p>
    <p className={styles.date}>{f("CartaRegistro")+": "+props.date}</p>
    <Image className={styles.image}
          src={props.img}
          alt={f("CartaImagenAlt")}
          layout= 'responsive'
          width = "0"
          height="0"
          objectFit="contain"
        />
    <p className={styles.firtsLine}>{f("Promocion")+": "+props.firtsLine}</p>
    <p className={styles.text}>{props.text}</p>
    </div>}
    {!isRotated? null:
    <div
      className={isRotated ? styles.showCard : styles.quitCard} 
        onClick={() => onRotate(!isRotated)}
        onMouseEnter= {() => setShowRotate(true)}
        onMouseLeave = {() => setShowRotate(false)}>
    <p className={styles.name}>{props.name}</p>
    <p className={styles.date}>{f("CartaRegistro")+": "+props.date}</p>
    <p className={styles.firtsLine}>{f("CartaDescripcion")}</p>
    <p className={styles.text}>{props.description}</p>
    <p className={styles.firtsLine}>{f("CartaLogros")}</p>
    <p className={styles.text}>{props.been}</p>
    <p className={styles.social}>
    <a href={props.red1Link}target="_blank">{props.red1}</a>
    &nbsp;
    <a href={props.red2Link}target="_blank">{props.red2}</a>
    &nbsp;
    <a href={props.red3Link}target="_blank">{props.red3}</a>
    </p>
    {deleteButton}
    </div>}
    </div>
    )
    
}