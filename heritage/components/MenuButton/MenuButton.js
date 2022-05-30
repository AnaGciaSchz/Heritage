import Link from 'next/link'
import React from 'react';

import { useIntl } from "react-intl"

import styles from './menubutton.module.scss'

export default function MenuButton(props) {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    return (

        <Link href={props.referencia}>
            <button className={styles.menuButton}>
                <span><img className={styles.image1} title={f("TituloButton")} src={props.src} /></span>
                <span><img className={styles.image2} title={f("TituloButton")} src={props.src} /></span>
                <div className={styles.text}>{props.nombre}</div></button>
        </Link>
    )
}