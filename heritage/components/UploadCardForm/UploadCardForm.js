import React from "react";
import { useState } from "react";
import SearchCard from "components/SearchCard/SearchCard.js"
import { alertService } from "../../services/alert.service";
import { validateService } from "../../services/validate.service";
import styles from './uploadCardForm.module.scss'

export default function UploadCardForm() {
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
      throw "The card does not have a type"
    }
    var name = document.querySelector("#name").value;
    if (!validateService.checkLength(name, 25)) {
      throw "You have to write the name of the person in the card"
    }
    dataMap.set("name", name);
    var promotion = document.querySelector("#promotion").value;
    if (!validateService.checkValidPromotion(promotion)) {
      throw "You have to write a correct promotion, like 2021-2022"
    }
    dataMap.set("promotion", promotion);
    var shortDescription = document.querySelector("#shortDescription").value;
    if (!validateService.checkLength(shortDescription, 150)) {
      throw "You have to write the short description"
    }
    dataMap.set("shortDescription", shortDescription);
    var longDescription = document.querySelector("#longDescription").value;
    if (!validateService.checkLength(longDescription, 230)) {
      throw "You have to write the long description"
    }
    dataMap.set("longDescription", longDescription);
    var archievements = document.querySelector("#archievements").value;
    if (!validateService.checkLength(archievements, 230)) {
      throw "You have to write the long archievements"
    }
    dataMap.set("archievements", archievements);
    var check = document.querySelector("#check").checked;
    dataMap.set("check", check);
    if (image !== null) {
      dataMap.set("image", image.name);
    }
    else {
      throw "We need an image for the card"
    }
    if (socialMedia1) {
      var social1 = document.querySelector("#social1").value;
      if (validateService.checkEmpty(social1)) {
        throw "We need an url for the first social media"
      }
      dataMap.set("social1", social1);
      var social1Text = document.querySelector("#social1Text").value;
      if (!validateService.checkLength(social1Text, 20)) {
        throw "We need a text for the first social media"
      }
      dataMap.set("social1Text", social1Text);
    }
    if (socialMedia2) {
      var social2 = document.querySelector("#social2").value;
      if (validateService.checkEmpty(social2)) {
        throw "We need an url for the secod social media"
      }
      dataMap.set("social2", social2);
      var social2Text = document.querySelector("#social2Text").value;
      if (!validateService.checkLength(social2Text, 20)) {
        throw "We need a text for the second social media"
      }
      dataMap.set("social2Text", social2Text);
    }
    if (socialMedia3) {
      var social3 = document.querySelector("#social3").value;
      if (validateService.checkEmpty(social3)) {
        throw "We need an url for the third social media"
      }
      dataMap.set("social3", social3);
      var social3Text = document.querySelector("#social3Text").value;
      if (!validateService.checkLength(social3Text, 20)) {
        throw "We need a text for the third social media"
      }
      dataMap.set("social3Text", social3Text);
    }
  }

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
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
        alt="Imagen"
        firtsLine={document.querySelector("#promotion").value == null ? "" : document.querySelector("#promotion").value}
        text={document.querySelector("#shortDescription").value == null ? "" : document.querySelector("#shortDescription").value}
        date={date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
        descriptionTitle="Descripción"
        description={document.querySelector("#longDescription").value == null ? "" : document.querySelector("#longDescription").value}
        beenTitle="Logros profesionales más importantes:"
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
        alertService.error("Couldn't upload the image: " + response.text + ", the card hasn't been created", options)
      }
      else {
        const response2 = await fetch("http://localhost:3000/api/card/uploadInfo", {
          method: "POST",
          body: JSON.stringify(Array.from(dataMap.entries()))
        });
        if (response2.status < 200 || response2.status > 299) {
          alertService.error("Couldn't upload the card: " + response2.text, options)
        }else{
          alertService.success('Success!!', options)
        }
      }
    }
    catch (error) {
      alertService.error("Couldn't upload the card: " + error, options)
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
      <h1>Formulario de subida de cartas</h1>
      <div className={styles.form}>
        <h1>Introduce la información<span>de la persona cuya carta quieres crear</span></h1>
        <div className={styles.section}><span>1</span>Type of card</div>
        <div className={styles.field}>
          <label className={styles.label}>Tipo de Carta*</label>
          <select class="form-control" id="type" required="required" aria-required="true">
            <option disabled="null" selected="null">Elige el tipo de carta</option>
            <option value="egresado">Egresado</option>
            <option value="profesor">Profesor</option>
            <option value="delegado">Delegado</option>
          </select>
          <span className={styles.tooltip}>Select the type of the card depending of the section where it should appear</span>
        </div>
        <div className={styles.section}><span>2</span>Front card information</div>
        <div className={styles.field}>
          <label className={styles.label}>Nombre*</label>
          <input type="text" placeholder="Ana María García Sánchez" maxlength="25" id="name" />
          <div>
          </div>
          <span className={styles.tooltip}>Write the full name of the person. Max characters: 25</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Promoción*</label>
          <input type="text" placeholder="2021-2022" id="promotion" />
          <span className={styles.tooltip}>Introduce la promoción de la persona. Es el curso en el que se ha graduado</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Descripción corta*</label>
          <textarea type="textarea" placeholder="This is a short description" maxlength="150" rows="3" id="shortDescription"></textarea>
          <span className={styles.tooltip}>Descripción que se mostrará en la cara de la card. Max characters: 150</span>
        </div>
        <div className={styles.section}><span>3</span>Back card information</div>
        <div className={styles.field}>
          <label className={styles.label}>Descripción larga*</label>
          <textarea type="textarea" placeholder="This is a long description" maxlength="230" rows="5" id="longDescription"></textarea>
          <span className={styles.tooltip}>Descripción que se mostrará detrás de la card. Max characters: 230</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Logros profesionales</label>
          <textarea type="textarea" placeholder="Logros profesionales" maxlength="230" rows="5" id="archievements"></textarea>
          <span className={styles.tooltip}>Logros profesionales de la persona. Max characters: 230</span>
        </div>
        {socialMedia1 ?
          <div className={styles.mediaField}>
            <div className={styles.lefthalf}>
            <label className={styles.label}>Nombre Red social 1*</label>
            <input type="text" placeholder="El nombre de tu primera red social" maxlength="20" id="social1Text" />
            </div>
            <div className={styles.righthalf}>
            <label className={styles.label}>Red social 1* </label>
            <input type="url" placeholder="Introduce el link de tu primera red social" id="social1" />
            </div>
          </div>
          : null}
        {socialMedia2 ?
          <div className={styles.mediaField}>
            <div className={styles.lefthalf}>
            <label className={styles.label}>Nombre Red social 2*</label>
            <input type="text" placeholder="El nombre de tu primera red social" maxlength="20" id="social2Text" />
            </div>
            <div className={styles.righthalf}>
            <label className={styles.label}>Red social 2*</label>
            <input type="url" placeholder="Introduce el link de tu primera red social" id="social2" />
            </div>
          </div>
          : null}
        {socialMedia3 ?
          <div className={styles.mediaField}>
            <div className={styles.lefthalf}>
            <label className={styles.label}>Nombre Red social 3*</label>
            <input type="text" placeholder="El nombre de tu primera red social" maxlength="20" id="social3Text" />
            </div>
            <div className={styles.righthalf}>
            <label className={styles.label}>Red social 3*</label>
            <input type="url" placeholder="Introduce el link de tu primera red social" id="social3" />
            </div>
          </div>
          : null}
        <div>
          {!socialMedia3 ?
            <button className={styles.buttonSocialMedia} type="button" onClick={addSocialMedia}>Añadir red social</button>
            : null}
          {socialMedia1 | socialMedia2 | socialMedia3 ?
            <button className={styles.buttonSocialMedia} type="button" onClick={deleteSocialMedia}>Quitar red social</button>
            : null}
        </div>
        <div className={styles.section}><span>4</span>Extra information</div>
        <div className={styles.check}>
          <input type="checkbox" id="check" className={styles.checkBox} />
          <label> Esta persona aparece en otro tipo de carta</label>
        </div>
        <div>
          <label for="fileUpload" className={styles.fileUploadLabel}>Subir imagen de card</label>
          <input type="file" id="fileUpload" className={styles.fileUpload} multiple="false" onChange={uploadToClient} title="Subir imagen de perfil" required="required" aria-required="true" />
          <button
            className={styles.send}
            type="submit"
            onClick = {() => {uploadToServer(); scroll(0,0);}}
          >
            Send to server
          </button>
        </div>
        <div>
          <button type="button" className={styles.preview} onClick={createCard}>{card == null ? "Vista previa  de card" : "Recargar card"}</button>
          <div className={styles.card}>
            {card}
          </div>
        </div>
      </div>
    </>
  )
}