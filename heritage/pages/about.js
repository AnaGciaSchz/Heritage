import SearchCard from "../components/SearchComponents/SearchCard/SearchCard";
import { useIntl } from "react-intl"

export default function About() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })
    return (<>
    <h1 className="title1">{f("SobreHeritage")}</h1>
    <br></br>
    <br></br>
   <h2 className="title2">{f("QueEsHeritage")}</h2>
   <div className= "flexAbout">
   <p >{f("QueEsHeritagePrimerParrafo")}
    <br></br><br></br>{f("QueEsHeritageSegundoParrafo")}
    </p>
   <div className= "specialCard">
   <SearchCard  key = "0"
            id= "0"
            index = "SpecialCard"
            name= "Ana María García Sánchez"
            img="/AnaGs.jpg"
            firtsLine="2022-2023"
            text={f("AnaDescripcion")}
            date="13/05/2022"
            description={f("AnaDescripcionLarga")}
            been={f("AnaLogros")}
            red1="LinkedIn"
            red1Link="https://www.linkedin.com/in/anagciaschz/"
            red2="GitHub"
            red2Link="https://github.com/AnaGciaSchz"
            star="true"
        />
        </div>
        </div>
        <h2 className="title2">{f("PorqueHeritage")}</h2>
        <p className= "textAbout">{f("PorqueHeritageRespuesta")}</p>
        <h2 className="title2">{f("PorqueUnOso")}</h2>
        <p className= "textAbout">{f("PorqueUnOsoRespuesta")}</p>
        <h2 className="title2">{f("VersionDefinitiva")}</h2>
        <p>{f("VersionDefinitivaRespuesta")}
        </p>
        <h2 className="title2">{f("SolicitarAcceso")}</h2>
        <p>{f("RellenaFormulario")}</p>
        <p><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=o3TqBcWSMUyXipJcPHmc0DH90oggaAhBn7dVtUeoY2RURUhFOVg3UE1ENjRaUlNPWjgzVTU3MDdRNS4u" >{f("FormularioHeritage")}</a></p> 
        
    </>

    );
}