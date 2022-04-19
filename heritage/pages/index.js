import Slider from "components/Slider/Slider.js"
import ImageWithLink from "components/ImageWithLink/ImageWithLink.js"
import SearchCardWithTitle from "components/SearchComponents/SearchCardWithTitle/SearchCardWithTitle.js"

import { useRouter } from "next/router"
import { useIntl } from "react-intl"
import React, { useState, useEffect } from 'react';

export default function Home() {

  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })
  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  const [results, setResults] = useState(null);

  const lastCard = async (index) => {
    var dataMap = new Map();
    dataMap.set("index", index);
    const response = await fetch("http://localhost:3000/api/card/lastCard", {
        method: "POST",
        body: JSON.stringify(Array.from(dataMap.entries()))
      });
      var r = await response.json();
      return r.message;
    }

    const createResults = async () => {
      var lastStudent = await lastCard("student-card");
      var lastProfessor = await lastCard("professor-card");
      var lastDelegate = await lastCard("delegate-card");

      var results = new Array();
          results[0]= <SearchCardWithTitle 
          key = {0}
          title = {f("UltimoEgresado")}
          last = {lastStudent}
      />

          results[1]= <SearchCardWithTitle 
          key = {1}
          title = {f("UltimoProfesor")}
          last = {lastProfessor}
      />

          results[2]= <SearchCardWithTitle 
          key = {2}
          title = {f("UltimoDelegado")}
          last = {lastDelegate}
      />

      setResults(null);
      setResults(results);
  }
  
  useEffect(() => {
    createResults();
  }, []);
  return (
    <div>
      <h1 className="title1">{f("paginaPrincipal")}</h1>
      <Slider></Slider>
      <h2 className="title1">{f("UltimasCartasSubidas")}</h2>
      <div className="cardfeed">
      {results!=null ?
          results
          : null}

      </div>

      <h2 className="title1">{f("RedesSociales")}</h2>

      <div className="socialTitle">
        <h3 className="title2">{f("RedesSocialesEII")}</h3>
        <span></span>
        <h3 className="title2">{f("RedesSocialesDEII")}</h3>
      </div>

      <div className="socialFeed">
        <span className="icono">
          <ImageWithLink className="icono"
            referencia="https://www.instagram.com/computingoviedo/"
            img="/social/instaEII.png"
            alt="Icono para acceder al instagram de la EII" />
        </span>

        <span className="icono">
          <ImageWithLink className="icono"
            referencia="https://es-es.facebook.com/computingOviedo/"
            img="/social/facebook.png"
            alt="Icono para acceder al facebook de la EII" />
        </span>

        <span className="icono">
          <ImageWithLink className="icono"
            referencia="https://www.youtube.com/channel/UCpv73ltAXuh1LRRJu8NWIvA"
            img="/social/youEII.png"
            alt="Icono para acceder al youtube de la EII" />
        </span>

        <span className="icono">
          <ImageWithLink className="icono"
            referencia="https://twitter.com/computingoviedo"
            img="/social/twEII.png"
            alt="Icono para acceder al twitter de la EII" />
        </span>

        <span></span>
        <span></span>

        <span className="icono">
          <ImageWithLink className="icono"
            referencia="https://www.instagram.com/delegacion_eii/"
            img="/social/instaDEII.png"
            alt="Icono para acceder al instagram de la DEII" />
        </span>

        <span className="icono">
          <ImageWithLink className="icono"
            referencia="https://discord.gg/bkR5Ye4"
            img="/social/discord.png"
            alt="Icono para acceder al discord de la DEII" />
        </span>

        <span className="icono">
          <ImageWithLink className="icono"
            referencia="https://www.youtube.com/channel/UCPGJQuCxNQ5JQtrzTE0NpJg"
            img="/social/youDEII.png"
            alt="Icono para acceder al youtube de la DEII" />
        </span>

        <span className="icono">
          <ImageWithLink className="icono"
            referencia="https://twitter.com/delegacion_eii"
            img="/social/twDEII.png"
            alt="Icono para acceder al twitter de la DEII" />
        </span>
      </div>
    </div>
  )
}
