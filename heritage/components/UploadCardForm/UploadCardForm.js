import React from "react";
import { useState } from "react";
import styles from './uploadCardForm.module.scss'
import cardStyles from 'components/SearchCard/searchCard.module.scss'
import Image from 'next/image'

export default function UploadCardForm() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("image", image);
    const response = await fetch("http://localhost:3000/api/studentCard/upload", {
      method: "POST",
      body
    });
  };

  return (
    <>
    <div class="rendered-form">
    <div class="">
        <h1  id="control-3841073">Formulario de subida de cartas</h1></div>
    <div class="formbuilder-select form-group field-select-1636315256982">
        <label for="select-1636315256982" class="formbuilder-select-label">Tipo de Carta<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Elige la sección en la que aparecerá la carta">?</span></label>
        <select class="form-control" name="select-1636315256982"   id="select-1636315256982" required="required" aria-required="true">
            <option disabled="null" selected="null">Elige el tipo de carta</option>
            <option value="option-1" id="select-1636315256982-0">Egresado</option>
            <option value="option-2" id="select-1636315256982-1">Profesor</option>
            <option value="option-3" id="select-1636315256982-2">Delegado</option>
        </select>
    </div>
    <div class="formbuilder-text form-group field-text-1636315323565">
        <label for="text-1636315323565" class="formbuilder-text-label">Nombre<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Introduce el nombre de la persona">?</span></label>
        <input type="text" placeholder="Ana María García Sánchez" class="form-control" name="text-1636315323565"  maxlength="29"  id="text-1636315323565" title="Introduce el nombre de la persona" required="required" aria-required="true"/>
    </div>
    <div class="formbuilder-text form-group field-text-1636315459181">
        <label for="text-1636315459181" class="formbuilder-text-label">Promoción<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Introduce la promoción de la persona. Es el curso en el que se ha graduado">?</span></label>
        <input type="text" placeholder="2021-2022" class="form-control" name="text-1636315459181"  id="text-1636315459181" title="Introduce la promoción de la persona. Es el curso en el que se ha graduado" required="required" aria-required="true"/>
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1636315504032">
        <label for="textarea-1636315504032" class="formbuilder-textarea-label">Descripción corta<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Descripción que se mostrará en la cara de la card">?</span></label>
        <textarea type="textarea" placeholder="BLA BLA BLA" class="form-control" name="textarea-1636315504032"  maxlength="150" rows="3"  id="textarea-1636315504032" title="Descripción que se mostrará en la cara de la card" required="required" aria-required="true"></textarea>
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1636315555229">
        <label for="textarea-1636315555229" class="formbuilder-textarea-label">Descripción larga<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Descripción que se mostrará detrás de la card">?</span></label>
        <textarea type="textarea" placeholder="BLA BLA BLA" class="form-control" name="textarea-1636315555229" maxlength="230" rows="5"  id="textarea-1636315555229" title="Descripción que se mostrará detrás de la card" required="required" aria-required="true"></textarea>
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1636315592464">
        <label for="textarea-1636315592464" class="formbuilder-textarea-label">Logros profesionales<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Descripción que se mostrará detrás de la card">?</span></label>
        <textarea type="textarea" placeholder="BLA BLA BLA" class="form-control" name="textarea-1636315592464" maxlength="230" rows="5"  id="textarea-1636315592464" title="Descripción que se mostrará detrás de la card" required="required" aria-required="true"></textarea>
    </div>
    <div class="formbuilder-file form-group field-file-1636315659043">
        <label for="file-1636315659043" class="formbuilder-file-label">Subir imagen de perfil<span class="formbuilder-required">*</span><span class="tooltip-element" tooltip="Subir imagen de perfil">?</span></label>
        <input type="file" class="form-control" name="image" multiple="false" onChange={uploadToClient} id="file-1636315659043" title="Subir imagen de perfil" required="required" aria-required="true"/>
        <button
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button>    
    </div>
    <div class="formbuilder-button form-group field-button-1636315630797">
        <button type="button" class="btn-default btn" name="button-1636315630797" id="button-1636315630797">Añadir red social</button>
    </div>
</div>
    </>
  )
}