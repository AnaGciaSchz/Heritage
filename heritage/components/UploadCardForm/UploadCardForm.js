import React from "react";
import { useState } from "react";
import SearchCard from "components/SearchCard/SearchCard.js"
import { alertService } from "../../services/alert.service";
import { validateService } from "../../services/validate.service";
import styles from './uploadCardForm.module.scss'
import { useIntl } from "react-intl"

export default function UploadCardForm() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [card, setCard] = useState(null);
  const [socialMedia1, setSocialMedia1] = useState(false);
  const [socialMedia2, setSocialMedia2] = useState(false);
  const [socialMedia3, setSocialMedia3] = useState(false);
  var dataMap = new Map();

  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false
  });

  const fillDataMap = () => {
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
    if (!validateService.checkLength(shortDescription, 150)) {
      throw f("DescripcionCorta")
    }
    dataMap.set("shortDescription", shortDescription);
    var longDescription = document.querySelector("#longDescription").value;
    if (!validateService.checkLength(longDescription, 230)) {
      throw f("DescripcionLarga")
    }
    dataMap.set("longDescription", longDescription);
    var archievements = document.querySelector("#archievements").value;
    if (!validateService.checkLength(archievements, 230)) {
      throw f("EscribeLogros")
    }
    dataMap.set("archievements", archievements);
    var check = document.querySelector("#check").checked;
    dataMap.set("check", check);
    if (image !== null) {
      dataMap.set("image", image.name);
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

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      uploadTemporalImage();
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
    uploadTemporalImage();
    var date = new Date();
    setCard(
      <SearchCard
        name={document.querySelector("#name").value}
        img={image == null ? "/cardImages/notFound.jpg" : "/temporalImages/" + image.name}
        alt={f("CartaImagenAlt")}
        firtsLine={document.querySelector("#promotion").value == null ? "" : document.querySelector("#promotion").value}
        text={document.querySelector("#shortDescription").value == null ? "" : document.querySelector("#shortDescription").value}
        date={f("CartaRegistro")+": "+date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
        descriptionTitle={f("CartaDescripcion")}
        description={document.querySelector("#longDescription").value == null ? "" : document.querySelector("#longDescription").value}
        beenTitle={f("CartaLogros")}
        been={document.querySelector("#archievements").value == null ? "" : document.querySelector("#archievements").value}
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
      const body = new FormData();
      body.append("image", image);
      const response = await fetch("http://localhost:3000/api/card/uploadImage", {
        method: "POST",
        body
      });
      if (response.status < 200 || response.status > 299) {
        alertService.error(f("NoSePudoSubirImagen") + response.text + ", the card hasn't been created", options)
      }
      else {
        const response2 = await fetch("http://localhost:3000/api/card/uploadInfo", {
          method: "POST",
          body: JSON.stringify(Array.from(dataMap.entries()))
        });
        if (response2.status < 200 || response2.status > 299) {
          alertService.error(f("NoSePudoSubirCarta") + response2.text, options)
        }else{
          alertService.success(f("SubidaCorrecta"), options)
        }
      }
    }
    catch (error) {
      alertService.error(f("NoSePudoSubirCarta") + error, options)
    }
  };

  const uploadTemporalImage = async () => {
    const body = new FormData();
    body.append("image", image);
    const response = await fetch("http://localhost:3000/api/card/tempUploadImage", {
      method: "POST",
      body
    });
    if (response.status < 200 || response.status > 299) {
      alertService.error(response.text, options)
    }
  };

  return (
    <>
      <h1  className={styles.title1}>{f("FormularioSubida")}</h1>
      <p>{f("FormularioTexto")}</p>
      <div className={styles.form}>
        <h1>{f("TituloFormulario")}<span>{f("SpanFormulario")}</span></h1>
        <div className={styles.section}><span>1</span>{f("TipoCartaSeccion")}</div>
        <div className={styles.field}>
          <label className={styles.label}>{f("TipoCarta")}*</label>
          <select class="form-control" id="type" required="required" aria-required="true">
            <option disabled="null" selected="null">{f("TipoCartaSeccion")}</option>
            <option value="egresado">{f("Egresado")}</option>
            <option value="profesor">{f("Profesor")}</option>
            <option value="delegado">{f("Delegado")}</option>
          </select>
          <span className={styles.tooltip}>{f("TipoTooltip")}</span>
        </div>
        <div className={styles.section}><span>2</span>{f("CaraCartaInformacion")}</div>
        <div className={styles.field}>
          <label className={styles.label}>{f("Nombre")}*</label>
          <input type="text" placeholder="Ana María García Sánchez" maxlength="25" id="name" />
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
          <textarea type="textarea" placeholder={f("DescripcionCortaEjemplo")} maxlength="150" rows="3" id="shortDescription"></textarea>
          <span className={styles.tooltip}>{f("DescripcionCortaTooltip")}</span>
        </div>
        <div className={styles.section}><span>3</span>{f("ReversoCartaInformacion")}</div>
        <div className={styles.field}>
          <label className={styles.label}>{f("DescripcionLarga")}*</label>
          <textarea type="textarea" placeholder={f("DescripcionLargaEjemplo")} maxlength="230" rows="5" id="longDescription"></textarea>
          <span className={styles.tooltip}>{f("DescripcionLargaTooltip")}</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{f("CartaLogros")}</label>
          <textarea type="textarea" placeholder={f("LogrosEjemplo")} maxlength="230" rows="5" id="archievements"></textarea>
          <span className={styles.tooltip}>{f("LogrosTooltip")}</span>
        </div>
        {socialMedia1 ?
          <div className={styles.mediaField}>
            <div className={styles.lefthalf}>
            <label className={styles.label}>{f("NombreRedSocial")} 1*</label>
            <input type="text" placeholder={f("NombreRedSocialPlaceholder")} maxlength="20" id="social1Text" />
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
            <input type="text" placeholder={f("NombreRedSocialPlaceholder")} maxlength="20" id="social2Text" />
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
            <input type="text" placeholder={f("NombreRedSocialPlaceholder")} maxlength="20" id="social3Text" />
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
        <div className={styles.section}><span>4</span>{f("InformacionExtra")}</div>
        <div className={styles.check}>
          <input type="checkbox" id="check" className={styles.checkBox} />
          <label> {f("CheckTexto")}</label>
        </div>
        <div>
          <label for="fileUpload" className={styles.fileUploadLabel}>{f("SubirImagenCard")}</label>
          <input type="file" id="fileUpload" className={styles.fileUpload} multiple="false" onChange={uploadToClient} title={f("SubirImagenCard")} />
          <button
            className={styles.send}
            type="submit"
            onClick = {() => {uploadToServer(); scroll(0,0);}}
          >
            {f("SubirCarta")}
          </button>
        </div>
        <div>
          <button type="button" className={styles.preview} onClick={createCard}>{card == null ?f("VistaPrevia") : f("RecargaCarta")}</button>
          <div className={styles.card}>
            {card}
          </div>
        </div>
      </div>
    </>
  )
}