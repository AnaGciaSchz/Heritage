import style from './box.module.scss'

function Box(props){
    return(
        <div className={style.caja} >
            {props.children}
        </div>
    )
}
export default Box;