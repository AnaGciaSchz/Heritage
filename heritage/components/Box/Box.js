import style from './box.module.scss'

export default function Box(props) {
    return (
        <div className={style.caja} >
            {props.children}
        </div>
    )
}