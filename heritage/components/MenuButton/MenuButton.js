import Link from 'next/link'
import React from 'react';

import styles from './menubutton.module.scss'

export default function MenuButton(props) {

    return (

        <Link href={props.referencia}>
            <button className={styles.menuButton} title={props.nombre}>
                <span><img className={styles.image1} alt={props.nombre} src={props.src} /></span>
                <span><img className={styles.image2} alt={props.nombre} src={props.src} /></span>
                <span className={styles.text}>{props.nombre}</span></button>
        </Link>
    )
}