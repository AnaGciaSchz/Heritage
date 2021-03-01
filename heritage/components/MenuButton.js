import Link from 'next/link'

function MenuButton(props){
    return(
        <Link href = {props.referencia}>
           <button className={props.clase} >{props.nombre}</button>
        </Link>
    )
}
export default MenuButton;