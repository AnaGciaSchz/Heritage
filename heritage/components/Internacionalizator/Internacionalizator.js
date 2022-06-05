import React, { useEffect } from 'react';
import InternacionalizationOption from "../InternacionalizationOption/InternacionalizationOption"
import { useRouter } from "next/router"
import { useIntl } from "react-intl"

export default function Internacionalizator() {
    const router = useRouter()
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })
    const [es, setEs] = React.useState(true);
    const [en, setEn] = React.useState(false);
    const [ast, setAst] = React.useState(false);
    const existingUrls = ['/EditorHistoria', '/ast/EditorHistoria', '/en/EditorHistoria', '/es/EditorHistoria', '/heritage_admin_register', '/ast/heritage_admin_register'
        , '/en/heritage_admin_register', '/es/heritage_admin_register', '/heritage_admin_login', '/ast/heritage_admin_login'
        , '/en/heritage_admin_login', '/es/heritage_admin_login', '/', '/es', '/en', '/ast', '/HistoriaEII', '/es/HistoriaEII', '/en/HistoriaEII', '/ast/HistoriaEII', '/ZonaEgresados', '/es/ZonaEgresados',
        '/en/ZonaEgresados', '/ast/ZonaEgresados', '/ZonaProfesorado', '/es/ZonaProfesorado', '/en/ZonaProfesorado', '/ast/ZonaProfesorado', '/ZonaDelegacion',
        '/es/ZonaDelegacion', '/en/ZonaDelegacion', '/ast/ZonaDelegacion', '/about', '/es/about', '/en/about', '/ast/about', '/Contacto', '/es/Contacto',
        '/en/Contacto', '/ast/Contacto', '/heritage_admin_login', '/es/heritage_admin_login', '/en/heritage_admin_login', '/ast/heritage_admin_login',
        '/500', '/es/500', '/en/500', '/ast/500', '/404', '/es/404', '/en/404', '/ast/404', '/SubidaDeCartas', '/es/SubidaDeCartas', '/en/SubidaDeCartas', 
        '/ast/SubidaDeCartas', '/siteMap','/es/siteMap','/en/siteMap','/ast/siteMap']
    const onChangeLocale = (locale) => { if (existingUrls.includes(router.asPath.split('?')[0])) router.push(router.asPath, router.asPath, { locale: locale }) }

    function setLanguage(locale) {
        if (locale == "es") {
            setEs(true);
            setEn(false);
            setAst(false);
            onChangeLocale("es")
        }
        else if (locale == "en") {
            setEs(false);
            setEn(true);
            setAst(false);
            onChangeLocale("en")
        }
        else if (locale == "ast") {
            setEs(false);
            setEn(false);
            setAst(true);
            onChangeLocale("ast")
        }
    }

    useEffect(() => {
        setLanguage(router.locale)
    }, [router.locale]);
    return (<>
        <section>
            <h2 className="hidden">{f("Internacionalizacion")}</h2>
            <p>
                <strong>|</strong>
                <InternacionalizationOption
                    selected={es}
                    language={() => setLanguage("es")}
                    option="Español"
                />
                <strong>|</strong>
                <InternacionalizationOption
                    selected={ast}
                    language={() => setLanguage("ast")}
                    option="Asturianu"
                />
                <strong>|</strong>
                <InternacionalizationOption
                    selected={en}
                    language={() => setLanguage("en")}
                    option="English"
                />
                <strong>|</strong>
            </p>
        </section>
    </>);
}