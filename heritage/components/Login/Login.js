import styles from './login.module.scss'
import { useIntl } from "react-intl"
import { alertService } from "../../services/alert.service";
import { validateService } from "../../services/validate.service";
import { useState } from "react";
import { userService } from '../../services/userService';

export default function Login() {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })

  const [options] = useState({
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
      const status = await userService.login(dataMap);
      if (status < 200 || status > 299) {
        alertService.error(f("InformacionInvalida"), options)
      }
    }
    catch (error) {
      alertService.error(f("HaOcurridoError") + f(error), options)
    }
  };

  return (<>
    <h1>{f("FormularioLogin")}</h1>
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
            onClick={() => uploadToServer()}>
            {f("Login")}
          </button>

        </form>
      </div>
    </div>
  </>

  )
}