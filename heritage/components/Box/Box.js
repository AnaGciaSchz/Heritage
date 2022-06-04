import styles from './box.module.scss'

export default function Box(props) {
    return (
        <main className={styles.caja} >
            {props.children}
        </main>
    )
}