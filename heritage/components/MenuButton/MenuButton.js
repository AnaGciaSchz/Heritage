import Link from 'next/link'
import styles from './menubutton.module.scss'

export default function MenuButton(props) {
    return (
        <Link href={props.referencia}>
            <button className={styles.menuButton} >{props.nombre}</button>
        </Link>
    )
}