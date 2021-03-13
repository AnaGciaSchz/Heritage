import styles from './footer.module.scss'

function Footer(){
    return(
        <div className={styles.footer}>
           <p id = {styles.copyright}>Copyright Universidad de Oviedo</p> 

           <p className = {styles.word}>Aviso Legal |</p> 

           <p className = {styles.word}>Política de cookies |</p> 

           <p className = {styles.word}>Política de seguridad</p> 

        </div>
    )
}

export default Footer;