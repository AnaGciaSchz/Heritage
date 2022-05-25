import Slider from "components/Slider/Slider.js"
import SearchCardWithTitle from "components/SearchComponents/SearchCardWithTitle/SearchCardWithTitle.js"
import SocialMedia from "components/SocialMedia/SocialMedia.js"

import { fetchWrapper } from "./api/handlers/fetchWrapper"

import { useIntl } from "react-intl"
import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';


export default function Home() {

  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })
  const [results, setResults] = useState(null);

  const { publicRuntimeConfig } = getConfig();
  const baseUrl = `${publicRuntimeConfig.apiUrl}`;

  const lastCard = async (index) => {
    var dataMap = new Map();
    dataMap.set("index", index);
    const response = await fetchWrapper.post(`${baseUrl}/card/lastCard`, Array.from(dataMap.entries()));
      var r = await response.json();
      return r.message;
    }

    const createResults = async () => {
      var lastStudent = await lastCard("student-card");
      var lastProfessor = await lastCard("professor-card");
      var lastDelegate = await lastCard("delegate-card");

      var results = new Array();
      
          results[0]= <div key={0}><SearchCardWithTitle 
          title = "UltimoEgresado"
          last = {lastStudent}
      /></div>
      

          results[1]= <div key={1}><SearchCardWithTitle 
          title = "UltimoProfesor"
          last = {lastProfessor}
      /></div>

          results[2]= <div key={2}><SearchCardWithTitle 
          title = "UltimoDelegado"
          last = {lastDelegate}
      /></div>

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
     
<div className="socialFeed">
      <SocialMedia
      socialMediaTitle= "RedesSocialesEII"
      firstLink="https://www.instagram.com/computingoviedo/"
      firstImage="/social/instaEII.png"
      firstAlt={f("InstaEii")}
      secondLink="https://es-es.facebook.com/computingOviedo/"
      secondImage="/social/facebook.png"
      secondAlt={f("FacebookEii")}
      thirdLink="https://www.youtube.com/channel/UCpv73ltAXuh1LRRJu8NWIvA"
      thirdImage="/social/youEII.png"
      thirdAlt={f("YoutubeEii")}
      fourthLink="https://twitter.com/computingoviedo"
      fourthImage="/social/twEII.png"
      fourthAlt={f("TwitterEii")}
      />

      <SocialMedia
      socialMediaTitle= "RedesSocialesDEII"
      firstLink="https://www.instagram.com/delegacion_eii/"
      firstImage="/social/instaDEII.png"
      firstAlt={f("InstaDeii")}
      secondLink="https://discord.gg/bkR5Ye4"
      secondImage="/social/discord.png"
      secondAlt={f("DiscordDeii")}
      thirdLink="https://www.youtube.com/channel/UCPGJQuCxNQ5JQtrzTE0NpJg"
      thirdImage="/social/youDEII.png"
      thirdAlt={f("YoutubeDeii")}
      fourthLink="https://twitter.com/delegacion_eii"
      fourthImage="/social/twDEII.png"
      fourthAlt={f("TwitterDeii")}
      />
      </div>
    </div>
  )
}
