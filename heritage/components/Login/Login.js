import styles from './login.module.scss'
import { useIntl } from "react-intl"
import { alertService } from "../../services/alert.service";
import { validateService } from "../../services/validate.service";
import { useState } from "react";

export default function Login() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })

  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false
  });

  var dataMap = new Map();

  const fillDataMap = () => {
    var username = document.querySelector("#username").value;
    if (validateService.checkEmpty(username)) {
        throw f("EscribeUsername")
      }
      dataMap.set("username", username);

    var password = document.querySelector("#password").value;
    if (validateService.checkEmpty(password)) {
        throw f("EscribeContrasena")
      }
    dataMap.set("password", password);
  }


  const uploadToServer = async (event) => {
    try {
      fillDataMap();
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        body: JSON.stringify(Array.from(dataMap.entries()))
      });
      if (response.status < 200 || response.status > 299) {
        var json = await response.json();
        alertService.error("Información Inválida: "+f(json.message), options)
    }else{
        alertService.success(f("LoginCorrecto"), options)
      }
    }
    catch (error) {
      alertService.error("Ha ocurrido un error: " + f(error), options)
    }
  };

    return (<>
        <h1 className="title1">{f("FormularioLogin")}</h1>
        <p>{f("DescripcionLogin")}</p>
        <div className={styles.formLogin}>
    <h1>{f("Login")}</h1>
    <div>
        <form>
            <div>
                <label className={styles.label}>{f("Usuario")}</label>
                <input id="username" name="username" type="text" />
            </div>
            <div>
                <label className={styles.label}>{f("Contraseña")}</label>
                <input id="password" name="password" type="password" />
            </div>
            <button type="button" className={styles.buttonLogin}
            onClick = {() => uploadToServer()}>
            {f("Login")}
            </button>
            <a href="/heritage_admin_register"  className={styles.link}>{f("Registro")}</a>
            
        </form>
    </div>
</div>
</>

    )
}