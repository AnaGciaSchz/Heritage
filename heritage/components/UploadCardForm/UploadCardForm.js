import React from "react";
import { useState } from "react";
import SearchCard from "components/SearchComponents/SearchCard/SearchCard.js"
import { alertService } from "../../services/alert.service";
import { validateService } from "../../services/validate.service";
import styles from './uploadCardForm.module.scss'
import { useIntl } from "react-intl"

import getConfig from 'next/config';


import { fetchWrapper } from "../../pages/api/handlers/fetchWrapper";

export default function UploadCardForm() {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })
  const [image, setImage] = useState(null);
  const [card, setCard] = useState(null);
  const [socialMedia1, setSocialMedia1] = useState(false);
  const [socialMedia2, setSocialMedia2] = useState(false);
  const [socialMedia3, setSocialMedia3] = useState(false);

  const { publicRuntimeConfig } = getConfig();
  const baseUrl = `${publicRuntimeConfig.apiUrl}`;

  var dataMap = new Map();

  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false
  });

  const fillDataMap = () => {
    var date = new Date();
    var type = document.querySelector("#type").value;
    if (type == "egresado") {
      dataMap.set("index", "student-card");
    }
    else if (type == "profesor") {
      dataMap.set("index", "professor-card");
    }
    else if (type == "delegado") {
      dataMap.set("index", "delegate-card");
    }
    else {
      throw f("ErrorTipo")
    }
    var name = document.querySelector("#name").value;
    if (!validateService.checkLength(name, 25)) {
      throw f("EscribeNombre")
    }
    dataMap.set("name", name);
    var promotion = document.querySelector("#promotion").value;
    if (!validateService.checkValidPromotion(promotion)) {
      throw f("PromocionCorrecta")
    }
    dataMap.set("promotion", promotion);
    var shortDescription = document.querySelector("#shortDescription").value;
    if (!validateService.checkLength(shortDescription, 120)) {
      throw f("DescripcionCorta")
    }
    dataMap.set("shortDescription", shortDescription);
    dataMap.set("registry", date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
    dataMap.set("timestamp", Date.parse(date))
    var longDescription = document.querySelector("#longDescription").value;
    if (!validateService.checkLength(longDescription, 230)) {
      throw f("DescripcionLarga")
    }
    dataMap.set("longDescription", longDescription);
    var achievements = document.querySelector("#achievements").value;
    if (!validateService.checkLength(achievements, 230)) {
      throw f("EscribeLogros")
    }
    dataMap.set("achievements", achievements);
    var check = document.querySelector("#check").checked;
    dataMap.set("check", check);
    if (image !== null) {
      dataMap.set("image", image);
    }
    else {
      throw f("ImagenNecesaria")
    }
    if (socialMedia1) {
      var social1 = document.querySelector("#social1").value;
      if (validateService.checkEmpty(social1)) {
        throw f("UrlObligatoria1")
      }
      dataMap.set("social1", social1);
      var social1Text = document.querySelector("#social1Text").value;
      if (!validateService.checkLength(social1Text, 20)) {
        throw f("TextoRedes1")
      }
      dataMap.set("social1Text", social1Text);
    }
    if (socialMedia2) {
      var social2 = document.querySelector("#social2").value;
      if (validateService.checkEmpty(social2)) {
        throw f("UrlObligatoria2")
      }
      dataMap.set("social2", social2);
      var social2Text = document.querySelector("#social2Text").value;
      if (!validateService.checkLength(social2Text, 20)) {
        throw f("TextoRedes2")
      }
      dataMap.set("social2Text", social2Text);
    }
    if (socialMedia3) {
      var social3 = document.querySelector("#social3").value;
      if (validateService.checkEmpty(social3)) {
        throw f("UrlObligatoria3")
      }
      dataMap.set("social3", social3);
      var social3Text = document.querySelector("#social3Text").value;
      if (!validateService.checkLength(social3Text, 20)) {
        throw f("TextoRedes3")
      }
      dataMap.set("social3Text", social3Text);
    }
  }

  const toBase64 = image => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  const uploadToClient = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      var image64= await toBase64(i)

      setImage(image64);
    }
  };

  const deleteSocialMedia = async (event) => {
    if (!socialMedia3) {
      if (!socialMedia2) {
        if (socialMedia1) {
          setSocialMedia1(false);
        }
      } else {
        setSocialMedia2(false);
      }
    } else {
      setSocialMedia3(false);
    }
  };

  const addSocialMedia = async (event) => {
    if (socialMedia1) {
      if (socialMedia2) {
        if (!socialMedia3) {
          setSocialMedia3(true);
        }
      } else {
        setSocialMedia2(true);
      }
    } else {
      setSocialMedia1(true);
    }
  };
  const createCard = () => {
    var date = new Date();
    setCard(
      <SearchCard
        name={document.querySelector("#name").value}
        img={image == null ? "/notFound.jpg" : image}
        index="SpecialCard"
        firtsLine={document.querySelector("#promotion").value == null ? "" : document.querySelector("#promotion").value}
        text={document.querySelector("#shortDescription").value == null ? "" : document.querySelector("#shortDescription").value}
        date={date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
        description={document.querySelector("#longDescription").value == null ? "" : document.querySelector("#longDescription").value}
        been={document.querySelector("#achievements").value == null ? "" : document.querySelector("#achievements").value}
        red1={socialMedia1 ? document.querySelector("#social1Text").value : ""}
        red1Link={socialMedia1 ? document.querySelector("#social1").value : ""}
        red2={socialMedia2 ? document.querySelector("#social2Text").value : ""}
        red2Link={socialMedia2 ? document.querySelector("#social2").value : ""}
        red3={socialMedia3 ? document.querySelector("#social3Text").value : ""}
        red3Link={socialMedia3 ? document.querySelector("#social3").value : ""}
        star={document.querySelector("#check").checked ? "true" : "false"}
      />
    )
  }

  const uploadToServer = async (event) => {
    try {
      fillDataMap();
        const response = await fetchWrapper.post(`${baseUrl}/card/uploadInfo`, Array.from(dataMap.entries()));
        if (response.status < 200 || response.status > 299) {
          alertService.error(f("NoSePudoSubirCarta") + response.text, options)
        } else {
          alertService.success(f("SubidaCorrecta"), options)
        }
    }
    catch (error) {
      alertService.error(f("NoSePudoSubirCarta") + error, options)
    }
  };
  

  return (
    <section className={styles.form}>
        <h2>{f("TituloFormulario")}<span>{f("SpanFormulario")}</span></h2>
        <section>
        <div className={styles.section}><span>1</span>{f("TipoCartaSeccion")}</div>
        <div className={styles.field}>
          <label className={styles.label}>{f("TipoCarta")}*</label>
          <select aria-label={f("TipoCartaSeccion")} className="form-control" defaultValue={"null"} id="type" required="required" aria-required="true">
            <option disabled="null" value="null">{f("TipoCartaSeccion")}</option>
            <option value="egresado">{f("Egresado")}</option>
            <option value="profesor">{f("Profesor")}</option>
            <option value="delegado">{f("Delegado")}</option>
          </select>
          <span className={styles.tooltip}>{f("TipoTooltip")}</span>
        </div>
        <div className={styles.section}><span>2</span>{f("CaraCartaInformacion")}</div>
        <div className={styles.field}>
          <label className={styles.label}>{f("Nombre")}*</label>
          <input type="text" placeholder="Ana María García Sánchez" maxLength="25" id="name" />
          <div>
          </div>
          <span className={styles.tooltip}>{f("NombreTooltip")}</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{f("Promocion")}*</label>
          <input type="text" placeholder="2021-2022" id="promotion" />
          <span className={styles.tooltip}>{f("PromocionTooltip")}</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{f("DescripcionCorta")}*</label>
          <textarea type="textarea" placeholder={f("DescripcionCortaEjemplo")} maxLength="120" rows="3" id="shortDescription"></textarea>
          <span className={styles.tooltip}>{f("DescripcionCortaTooltip")}</span>
        </div>
        <p className={styles.label}>{f("ImagenFormato")}</p>
        <label htmlFor="fileUpload" className={styles.fileUploadLabel}>{f("SubirImagenCard")}</label>
        <input type="file" id="fileUpload" className={styles.fileUpload} multiple={false} onChange={uploadToClient} title={f("SubirImagenCard")} />
        <div className={styles.section}><span>3</span>{f("ReversoCartaInformacion")}</div>
        <div className={styles.field}>
          <label className={styles.label}>{f("DescripcionLarga")}*</label>
          <textarea type="textarea" placeholder={f("DescripcionLargaEjemplo")} maxLength="230" rows="5" id="longDescription"></textarea>
          <span className={styles.tooltip}>{f("DescripcionLargaTooltip")}</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{f("CartaLogros")}</label>
          <textarea type="textarea" placeholder={f("LogrosEjemplo")} maxLength="230" rows="5" id="achievements"></textarea>
          <span className={styles.tooltip}>{f("LogrosTooltip")}</span>
        </div>
        <div className={styles.section}><span>4</span>{f("InformacionExtra")}</div>
        <div className={styles.check}>
          <input type="checkbox" id="check" className={styles.checkBox} />
          <label> {f("CheckTexto")}</label>
        </div>
        {socialMedia1 ?
          <div className={styles.mediaField}>
            <div className={styles.lefthalf}>
              <label className={styles.label}>{f("NombreRedSocial")} 1*</label>
              <input type="text" placeholder={f("NombreRedSocialPlaceholder")} maxLength="20" id="social1Text" />
            </div>
            <div className={styles.righthalf}>
              <label className={styles.label}>{f("RedSocialLink")} 1* </label>
              <input type="url" placeholder={f("RedSocialLinkPlaceholder1")} id="social1" />
            </div>
          </div>
          : null}
        {socialMedia2 ?
          <div className={styles.mediaField}>
            <div className={styles.lefthalf}>
              <label className={styles.label}>{f("NombreRedSocial")} 2*</label>
              <input type="text" placeholder={f("NombreRedSocialPlaceholder")} maxLength="20" id="social2Text" />
            </div>
            <div className={styles.righthalf}>
              <label className={styles.label}>{f("RedSocialLink")} 2*</label>
              <input type="url" placeholder={f("RedSocialLinkPlaceholder2")} id="social2" />
            </div>
          </div>
          : null}
        {socialMedia3 ?
          <div className={styles.mediaField}>
            <div className={styles.lefthalf}>
              <label className={styles.label}>{f("NombreRedSocial")} 3*</label>
              <input type="text" placeholder={f("NombreRedSocialPlaceholder")} maxLength="20" id="social3Text" />
            </div>
            <div className={styles.righthalf}>
              <label className={styles.label}>{f("RedSocialLink")} 3*</label>
              <input type="url" placeholder={f("RedSocialLinkPlaceholder3")} id="social3" />
            </div>
          </div>
          : null}
        <div>
          {!socialMedia3 ?
            <button className={styles.buttonSocialMedia} type="button" onClick={addSocialMedia}>{f("AnadirRedSocial")}</button>
            : null}
          {socialMedia1 | socialMedia2 | socialMedia3 ?
            <button className={styles.buttonSocialMedia} type="button" onClick={deleteSocialMedia}>{f("QuitarRedSocial")}</button>
            : null}
        </div>
        <div>
          <button
            className={styles.send}
            type="submit"
            onClick={() => { uploadToServer(); scroll(0, 0); }}
          >
            {f("SubirCarta")}
          </button>
        </div>
        <div>
          <button type="button" className={styles.preview} onClick={createCard}>{card == null ? f("VistaPrevia") : f("RecargaCarta")}</button>
          <div className={styles.card}>
            {card}
          </div>
        </div>
        </section>
    </section>
  )
}