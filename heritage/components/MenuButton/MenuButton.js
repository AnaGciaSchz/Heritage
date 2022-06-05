import Link from 'next/link'
import React from 'react';

import { useIntl } from "react-intl"

import styles from './menubutton.module.scss'

export default function MenuButton(props) {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    return (

        <Link href={props.referencia}>
            <button className={styles.menuButton} title={props.nombre}>
                <span><img className={styles.image1} alt={props.nombre} src={props.src} /></span>
                <span><img className={styles.image2} alt={props.nombre} src={props.src} /></span>
                <span className={styles.text}>{props.nombre}</span></button>
        </Link>
    )
}