import styles from './register.module.scss'
import { useIntl } from "react-intl"
import { alertService } from "../../services/alert.service";
import { validateService } from "../../services/validate.service";
import { useState } from "react";

export default function Register() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })

  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false
  });

  var dataMap = new Map();

  const fillDataMap = () => {
    var name = document.querySelector("#name").value;
    if (!validateService.checkLength(name, 25)) {
      throw f("EscribeNombre")
    }
    dataMap.set("name", name);

    var username = document.querySelector("#username").value;
    if (!validateService.checkLength(username, 20)) {
        throw "Escribe username"
      }
      dataMap.set("username", username);

    var password = document.querySelector("#password").value;
    var repeatPassword = document.querySelector("#repeatPassword").value;
    if (!validateService.checkValidPasswords(password,repeatPassword)) {
      throw "Escribe bien el password"
    }
        dataMap.set("password", password);
  }

  const uploadToServer = async (event) => {
    try {
      fillDataMap();
      const response = await fetch("http://localhost:3000/api/admin/register", {
        method: "POST",
        body: JSON.stringify(Array.from(dataMap.entries()))
      });
      if (response.status < 200 || response.status > 299) {
        alertService.error("No se pudo subir " + response.text, options)
    }else{
        alertService.success("Se pudo subir", options)
      }
    }
    catch (error) {
      alertService.error("No se pudo subir " + error, options)
    }
  };


    return (<>
        <h1 className="title1">{f("FormularioRegistro")}</h1>
        <p>{f("DescripcionRegistro")}</p>
        <div className={styles.formLogin}>
    <h1>{f("Registro")}</h1>
    <div>
        <form>
            <div>
                <label className={styles.label}>{f("Nombre")}</label>
                <input id= "name" name="name" type="text" />
            </div>
            <div>
                <label className={styles.label}>{f("Usuario")}</label>
                <input id= "username" name="username" type="text" />
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
            onClick = {() => uploadToServer()}>
            {f("Registrar")}
            </button>
            <a href="/" className={styles.link}>{f("Cancelar")}</a>
            
        </form>
    </div>
</div>
</>

    )
}