import Link from 'next/link'
import styles from './menubutton.module.scss'
import React from 'react';

export default function MenuButton(props) {

    return (
        
        <Link href={props.referencia}>
            <button className={styles.menuButton}>
            <span><img className={styles.image1} src={props.src} /></span>
            <span><img className={styles.image2} src={props.src} /></span>
            <div className={styles.text}>{props.nombre}</div></button>
        </Link>
    )
}