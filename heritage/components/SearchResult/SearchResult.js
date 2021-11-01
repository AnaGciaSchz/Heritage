import styles from './searchResult.module.scss'
import React from 'react'
import SearchCard from "components/SearchCard/SearchCard.js"
export default function SearchResult(props) {
    return (
        <div>
            <h2 className={styles.title2Search}>{props.promotion}</h2>
        <div className={styles.searchFeed}>
            <SearchCard
                name="Augusta Ada King"
                img="/Ada.jpg"
                alt="Imagen"
                firtsLine="Promoción 1835-2036"
                text="Ada Lovelace es considerada la primera programadora de ordenadores."
                date="20/09/2021"
                descriptionTitle="Descripción"
                description="Matemática y escritora británica, célebre sobre todo por su trabajo acerca de la calculadora de uso general de Charles Babbage. Entre sus notas sobre la máquina, se encuentra lo que se reconoce hoy como el primer algoritmo destinado a ser procesado por una máquina."
                beenTitle="Logros profesionales más importantes:"
                been="Primera programadora. Sugirió el uso de tarjetas perforadas como método de entrada de información e instrucciones a la máquina analítica."
                red1="Instagram"
                red1Link="https://es.reactjs.org/docs/conditional-rendering.html"
                red2="Telegram"
                red2Link="https://www.w3schools.com/css/css_link.asp"
                red3=""
                red3Link=""
            />
            <SearchCard
                name="Ana María García Sánchez"
                img="/Ana.jpg"
                alt="Imagen"
                firtsLine="Promoción 2020-2021"
                text="Estudiante de cuarto curso, está intentando recordar cómo se programaba con React."
                date="20/09/2021"
                descriptionTitle="Descripción"
                description="Carta de prueba para ver cómo quedarían las cartas. Este texto tiene 120 caracteres, que sería lo mínimo que se pediría."
                beenTitle="Ha estado en"
                been="Carta de prueba para ver cómo quedarían las cartas y así comprobar cómo se podrían ver y hacer algunos ajustes. Este texto tiene 180 caracteres, que sería lo máximo que se pediría."
                red1="Whatsapp"
                red1Link="https://es.reactjs.org/docs/conditional-rendering.html"
                red2="Twitter"
                red2Link="https://www.w3schools.com/css/css_link.asp"
                red3="Linkedin"
                red3Link="https://github.com/AnaGciaSchz/Heritage"
                star="true"
            />
            <SearchCard
                name="Hedwig Eva Maria Kiesler"
                img="/Hedy.jpg"
                alt="Imagen"
                firtsLine="Promoción 1934-1935"
                text="Hedy Lamarr fue co-inventora de la primera versión del espectro ensanchado que permitiría las comunicaciones inalámbricas."
                date="20/09/2021"
                descriptionTitle="Descripción"
                description="Fue una actriz de cine e inventora austriaca. Al comienzo de la Segunda Guerra Mundial, ella y el compositor George Antheil desarrollaron la patente de un sistema de guía por radio."
                beenTitle="Logros profesionales más importantes:"
                been="Premio Pioneer de la Electronic Frotiner Foundation. Aparece en el National Inventors Hall Of Fame."
                red1="Youtube"
                red1Link="https://es.reactjs.org/docs/conditional-rendering.html"
                red2="Twitter"
                red2Link="https://www.w3schools.com/css/css_link.asp"
                red3="Linkedin"
                red3Link="https://github.com/AnaGciaSchz/Heritage"
                star="false"
            />
            <SearchCard
                name="Ana María García Sánchez"
                img="/Ana.jpg"
                alt="Imagen"
                firtsLine="Promoción 2020-2021"
                text="Estudiante de cuarto curso, está intentando recordar cómo se programaba con React."
                date="20/09/2021"
                descriptionTitle="Descripción"
                description="Carta de prueba para ver cómo quedarían las cartas y así comprobar cómo se podrían ver y hacer algunos ajustes. Este texto tiene 180 caracteres, que sería lo máximo que se pediría."
                beenTitle="Ha estado en"
                been="Carta de prueba para ver cómo quedarían las cartas. Este texto tiene 120 caracteres, que sería lo mínimo que se pediría."
            />
            <SearchCard
                name="Ana María García Sánchez"
                img="/Ana.jpg"
                alt="Imagen"
                firtsLine="Promoción 2020-2021"
                text="Estudiante de cuarto curso, está intentando recordar cómo se programaba con React."
                date="20/09/2021"
                descriptionTitle="Descripción"
                description="Carta de prueba para ver cómo quedarían las cartas. Este texto tiene 120 caracteres, que sería lo mínimo que se pediría."
                beenTitle="Ha estado en"
                been="Carta de prueba para ver cómo quedarían las cartas. Este texto tiene 120 caracteres, que sería lo mínimo que se pediría."
            />
            <SearchCard
                name="Ana María García Sánchez"
                img="/Ana.jpg"
                alt="Imagen"
                firtsLine="Promoción 2020-2021"
                text="Estudiante de cuarto curso, está intentando recordar cómo se programaba con React."
                date="20/09/2021"
                descriptionTitle="Descripción"
                description="Carta de prueba para ver cómo quedarían las cartas. Este texto tiene 120 caracteres, que sería lo mínimo que se pediría."
                beenTitle="Ha estado en"
                been="Carta de prueba para ver cómo quedarían las cartas. Este texto tiene 120 caracteres, que sería lo mínimo que se pediría."
            />
            </div>
        </div>
    )
}