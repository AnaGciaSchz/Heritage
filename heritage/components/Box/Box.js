import styles from './box.module.scss'

export default function Box(props) {
    return (
        <main className={styles.caja} id='main'>
            {props.children}
        </main>
    )
}