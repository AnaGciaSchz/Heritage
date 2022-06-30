import SearchCard from "../components/SearchComponents/SearchCard/SearchCard";
import { useIntl } from "react-intl"
import getConfig from 'next/config';

export default function About() {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })
    const { publicRuntimeConfig } = getConfig();
    const resourceUrl = `${publicRuntimeConfig.resourceUrl}`;
    return (<>
        <section>
            <h1>{f("SobreHeritage")}</h1>
            <div className="about">
                <SearchCard key="0"
                    id="0"
                    index="SpecialCard"
                    name="Ana María García Sánchez"
                    img={resourceUrl+"/AnaGs.jpg"}
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
            <section>
                <h2>{f("QueEsHeritage")}</h2>
                <p >{f("QueEsHeritagePrimerParrafo")}
                    {f("QueEsHeritageSegundoParrafo")}
                </p>
            </section>

            <section>
                <h2>{f("PorqueHeritage")}</h2>
                <p>{f("PorqueHeritageRespuesta")}</p>
            </section>
            <section>
                <h2>{f("PorqueUnOso")}</h2>
                <p >{f("PorqueUnOsoRespuesta")}</p>
            </section>
            <section>
                <h2 >{f("VersionDefinitiva")}</h2>
                <p>{f("VersionDefinitivaRespuesta")}
                </p>
            </section>

            <section>
                <h2>{f("SolicitarAcceso")}</h2>
                <p>{f("RellenaFormulario")}</p>
                <p><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=o3TqBcWSMUyXipJcPHmc0DH90oggaAhBn7dVtUeoY2RURUhFOVg3UE1ENjRaUlNPWjgzVTU3MDdRNS4u" target="_blank">{f("FormularioHeritage")}</a></p>
            </section>
        </section>
    </>

    );
}