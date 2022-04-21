import styles from './login.module.scss'
import { useIntl } from "react-intl"

export default function Login() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })

    return (<>
        <h1 className="title1">{f("FormularioLogin")}</h1>
        <p>{f("DescripcionLogin")}</p>
        <div className={styles.formLogin}>
    <h1>{f("Login")}</h1>
    <div>
        <form>
            <div>
                <label className={styles.label}>{f("Usuario")}</label>
                <input name="username" type="text" />
            </div>
            <div>
                <label className={styles.label}>{f("Contraseña")}</label>
                <input name="password" type="password" />
            </div>
            <button type="button" className={styles.buttonLogin}>
            {f("Login")}
            </button>
            <a href="/heritage_admin_register"  className={styles.link}>{f("Registro")}</a>
            
        </form>
    </div>
</div>
</>

    )
}