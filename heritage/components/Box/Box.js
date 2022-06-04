import style from './box.module.scss'

export default function Box(props) {
    return (
        <main className={style.caja} >
            {props.children}
        </main>
    )
}