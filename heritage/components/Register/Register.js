import styles from './register.module.scss'
import { useIntl } from "react-intl"
import { alertService } from "../../services/alert.service";
import { validateService } from "../../services/validate.service";
import { useState } from "react";
import { fetchWrapper } from '../../pages/api/handlers/fetchWrapper';
import getConfig from 'next/config';



export default function Register() {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })

  const { publicRuntimeConfig } = getConfig();
  const baseUrl = `${publicRuntimeConfig.apiUrl}`;

  const [options] = useState({
    autoClose: false,
    keepAfterRouteChange: false
  });

  var dataMap = new Map();

  const fillDataMap = () => {
    var name = document.querySelector("#name").value;
    if (!validateService.checkLength(name, 35) && !validateService.checkEmpty(name)) {
      throw f("EscribeNombre")
    }
    dataMap.set("name", name);

    var username = document.querySelector("#username").value;
    if (!validateService.checkLength(username, 20)) {
      throw f("EscribeUsername")
    }
    dataMap.set("username", username);

    var password = document.querySelector("#password").value;
    var repeatPassword = document.querySelector("#repeatPassword").value;
    if (!validateService.checkValidPasswords(password, repeatPassword)) {
      throw f("ContrasenaNoCoincide")
    }
    if (!validateService.checkSecurePassword(password)) {
      throw f("EscribeContrasena")
    }
    dataMap.set("password", password);
    dataMap.set("repeatPassword", repeatPassword);
  }

  const uploadToServer = async (event) => {
    try {
      fillDataMap();
      const response = await fetchWrapper.post(`${baseUrl}/admin/register`, Array.from(dataMap.entries()));
      if (response.status < 200 || response.status > 299) {
        var json = await response.json();
        alertService.error(f("InformacionInvalida") + f(json.message), options)
      } else {
        alertService.success(f("RegistroCorrecto"), options)
      }
    }
    catch (error) {
      alertService.error(f("HaOcurridoUnError") + f(error), options)
    }
  };


  return (<section>
    <h1>{f("FormularioRegistro")}</h1>
    <p>{f("DescripcionRegistro")}</p>
    <section className={styles.formLogin}>
      <h2>{f("Registro")}</h2>
        <form>
          <div>
            <label className={styles.label}>{f("Nombre")}</label>
            <input id="name" name="name" type="text" />
          </div>
          <div>
            <label className={styles.label}>{f("Usuario")}</label>
            <input id="username" name="username" type="text" />
          </div>
          <div>
            <label className={styles.label}>{f("Contraseña")}</label>
            <input id="password" name="password" type="password" />
          </div>
          <div>
            <label className={styles.label}>{f("RepetirContraseña")}</label>
            <input id="repeatPassword" name="repeatPassword" type="password" />
          </div>
          <button className={styles.buttonLogin}
            type="button"
            onClick={() => uploadToServer()}>
            {f("Registrar")}
          </button>
          <a href="/" className={styles.link}>{f("Cancelar")}</a>
        </form>
    </section>
  </section>

  )
}