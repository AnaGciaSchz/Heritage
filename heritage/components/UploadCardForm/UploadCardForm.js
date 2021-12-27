import React from "react";
import { useState } from "react";
import SearchCard from "components/SearchCard/SearchCard.js"
import { alertService } from "../../services/alert.service";
import {validateService} from "../../services/validate.service";
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
    if(!validateService.checkLength(name, 29)){
      throw "You have to write the name of the person in the card"
    }
    dataMap.set("name", name);
    var promotion = document.querySelector("#promotion").value;
    if(!validateService.checkValidPromotion(promotion)){
      throw "You have to write a correct promotion, like 2021-2022"
    }
    dataMap.set("promotion", promotion);
    var shortDescription = document.querySelector("#shortDescription").value;
    if(!validateService.checkLength(shortDescription, 150)){
      throw "You have to write the short description"
    }
    dataMap.set("shortDescription", shortDescription);
    var longDescription = document.querySelector("#longDescription").value;
    if(!validateService.checkLength(longDescription, 230)){
      throw "You have to write the long description"
    }
    dataMap.set("longDescription", longDescription);
    var archievements = document.querySelector("#archievements").value;
    if(!validateService.checkLength(archievements, 230)){
      throw "You have to write the long archievements"
    }
    dataMap.set("archievements", archievements);
    var check = document.querySelector("#check").checked;
    dataMap.set("check", check);
    if (image !== null) {
      dataMap.set("image", image.name);
    }
    else{
        throw "We need an image for the card"
    }
    if (socialMedia1) {
      var social1 = document.querySelector("#social1").value;
      if(validateService.checkEmpty(social1)){
        throw "We need an url for the first social media"
      }
      dataMap.set("social1", social1);
      var social1Text = document.querySelector("#social1Text").value;
      if(validateService.checkLength(social1Text, 20)){
        throw "We need a text for the first social media"
      }
      dataMap.set("social1Text", social1Text);
    }
    if (socialMedia2) {
      var social2 = document.querySelector("#social2").value;
      if(validateService.checkEmpty(social2)){
        throw "We need an url for the secod social media"
      }
      dataMap.set("social2", social2);
      var social2Text = document.querySelector("#social2Text").value;
      if(validateService.checkLength(social2Text, 20)){
        throw "We need a text for the second social media"
      }
      dataMap.set("social2Text", social2Text);
    }
    if (socialMedia3) {
      var social3 = document.querySelector("#social3").value;
      if(validateService.checkEmpty(social3)){
        throw "We need an url for the third social media"
      }
      dataMap.set("social3", social3);
      var social3Text = document.querySelector("#social3Text").value;
      if(validateService.checkLength(social3Text, 20)){
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
    alertService.success('Success!!', options)
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
      <h1 id="control-3841073">Formulario de subida de cartas</h1>
      <div>
        <label for="select-1636315256982" class="formbuilder-select-label">Tipo de Carta<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Elige la sección en la que aparecerá la carta">?</span></label>
        <select class="form-control" id="type" required="required" aria-required="true">
          <option disabled="null" selected="null">Elige el tipo de carta</option>
          <option value="egresado">Egresado</option>
          <option value="profesor">Profesor</option>
          <option value="delegado">Delegado</option>
        </select>
      </div>
      <div>
        <label for="text-1636315323565" class="formbuilder-text-label">Nombre<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Introduce el nombre de la persona">?</span></label>
        <input type="text" placeholder="Ana María García Sánchez" class="form-control" maxlength="29" id="name" title="Introduce el nombre de la persona" required="required" aria-required="true" />
      </div>
      <div>
        <label for="text-1636315459181" class="formbuilder-text-label">Promoción<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Introduce la promoción de la persona. Es el curso en el que se ha graduado">?</span></label>
        <input type="text" pattern="[0-9]+-[0-9]+" placeholder="2021-2022" class="form-control" id="promotion" title="Introduce la promoción de la persona. Es el curso en el que se ha graduado" required="required" aria-required="true" />
      </div>
      <div>
        <label for="textarea-1636315504032" class="formbuilder-textarea-label">Descripción corta<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Descripción que se mostrará en la cara de la card">?</span></label>
        <textarea type="textarea" placeholder="BLA BLA BLA" class="form-control" maxlength="150" rows="3" id="shortDescription" title="Descripción que se mostrará en la cara de la card" required="required" aria-required="true"></textarea>
      </div>
      <div>
        <label for="textarea-1636315555229" class="formbuilder-textarea-label">Descripción larga<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Descripción que se mostrará detrás de la card">?</span></label>
        <textarea type="textarea" placeholder="BLA BLA BLA" class="form-control" maxlength="230" rows="5" id="longDescription" title="Descripción que se mostrará detrás de la card" required="required" aria-required="true"></textarea>
      </div>
      <div>
        <label for="textarea-1636315592464" class="formbuilder-textarea-label">Logros profesionales<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Descripción que se mostrará detrás de la card">?</span></label>
        <textarea type="textarea" placeholder="BLA BLA BLA" class="form-control" maxlength="230" rows="5" id="archievements" title="Descripción que se mostrará detrás de la card" required="required" aria-required="true"></textarea>
      </div>
      {socialMedia1 ?
        <div>
          <label for="text-1636315323565" class="formbuilder-text-label">Red social 1<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="El nombre de tu primera red social">?</span></label>
          <input type="text" placeholder="El nombre de tu primera red social" class="form-control" maxlength="20" id="social1Text" title="El nombre de tu primera red social" required="required" aria-required="true" />
          <label for="text-1636315323565" class="formbuilder-text-label">Red social 1<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Introduce el link de tu primera red social">?</span></label>
          <input type="text" placeholder="Introduce el link de tu primera red social" class="form-control" id="social1" title="El nombre de tu primera red social" required="required" aria-required="true" />
        </div>
        : null}
      {socialMedia2 ?
        <div>
          <label for="text-1636315323565" class="formbuilder-text-label">Red social 2<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="El nombre de tu primera red social">?</span></label>
          <input type="text" placeholder="El nombre de tu primera red social" class="form-control" maxlength="20" id="social2Text" title="El nombre de tu primera red social" required="required" aria-required="true" />
          <label for="text-1636315323565" class="formbuilder-text-label">Red social 2<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Introduce el link de tu primera red social">?</span></label>
          <input type="text" placeholder="Introduce el link de tu primera red social" class="form-control" id="social2" title="El nombre de tu primera red social" required="required" aria-required="true" />
        </div>
        : null}
      {socialMedia3 ?
        <div>
          <label for="text-1636315323565" class="formbuilder-text-label">Red social 3<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="El nombre de tu primera red social">?</span></label>
          <input type="text" placeholder="El nombre de tu primera red social" class="form-control" maxlength="20" id="social3Text" title="El nombre de tu primera red social" required="required" aria-required="true" />
          <label for="text-1636315323565" class="formbuilder-text-label">Red social 3<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Introduce el link de tu primera red social">?</span></label>
          <input type="text" placeholder="Introduce el link de tu primera red social" class="form-control" id="social3" title="El nombre de tu primera red social" required="required" aria-required="true" />
        </div>
        : null}
      <div>
        {!socialMedia3 ?
          <button type="button" class="btn-default btn" onClick={addSocialMedia} id="button-1636315630797">Añadir red social</button>
          : null}
        {socialMedia1 | socialMedia2 | socialMedia3 ?
          <button type="button" class="btn-default btn" onClick={deleteSocialMedia} id="button-1636315630797">Quitar red social</button>
          : null}
      </div>
      <div>
        <input type="checkbox" id="check" />
        <label for="vehicle1"> Esta persona aparece en otro tipo de carta</label>
      </div>
      <div>
        <label for="file-1636315659043" class="formbuilder-file-label">Subir imagen de perfil<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Subir imagen de perfil">?</span></label>
        <input type="file" class="form-control" name="image" multiple="false" onChange={uploadToClient} id="file-1636315659043" title="Subir imagen de perfil" required="required" aria-required="true" />
        <button
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
      <div>
        {card}
        <button type="button" class="btn-default btn" onClick={createCard} id="button-1636315630797">{card == null ? "Vista previa  de card" : "Recargar card"}</button>
      </div>
    </>
  )
}