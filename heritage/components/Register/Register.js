import styles from './register.module.scss'
import { useIntl } from "react-intl"

export default function Register() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })
    return (<>
        <h1 className="title1">{f("FormularioRegistro")}</h1>
        <p>{f("DescripcionRegistro")}</p>
        <div className={styles.formLogin}>
    <h1>{f("Registro")}</h1>
    <div>
        <form>
            <div>
                <label className={styles.label}>{f("Nombre")}</label>
                <input name="name" type="text" />
            </div>
            <div>
                <label className={styles.label}>{f("Usuario")}</label>
                <input name="username" type="text" />
            </div>
            <div>
                <label className={styles.label}>{f("Contraseña")}</label>
                <input name="password" type="password" />
            </div>
            <div>
                <label className={styles.label}>{f("RepetirContraseña")}</label>
                <input name="repeatPassword" type="password" />
            </div>
            <button type="button" className={styles.buttonLogin}>
            {f("Registrar")}
            </button>
            <a href="/" className={styles.link}>{f("Cancelar")}</a>
            
        </form>
    </div>
</div>
</>

    )
}