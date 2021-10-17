import React from 'react';
import InternacionalizationOption from "../InternacionalizationOption/InternacionalizationOption"
import { useRouter } from "next/router"

export default function Internacionalizator(props) {
    const router = useRouter()
    const [es, setEs] = React.useState(true);
    const [en, setEn] = React.useState(false);
    const [ast, setAst] = React.useState(false);
    const onChangeLocale = (locale) => router.push(router.asPath, router.asPath, { locale: locale })

    function setLanguage(locale){
        if(locale=="es"){
            setEs(true);
            setEn(false);
            setAst(false);
            onChangeLocale("es")
        }
        else if(locale =="en"){
            setEs(false);
            setEn(true);
            setAst(false);
            onChangeLocale("en")
        }
        else if(locale=="ast"){
            setEs(false);
            setEn(false);
            setAst(true);
            onChangeLocale("ast")
        }
    }
    return (<>
    <p><InternacionalizationOption
        selected = {es}
        language = {() => setLanguage("es")}
        option = "Español"
    />
    /
    <InternacionalizationOption
        selected = {ast}
        language = {() => setLanguage("ast")}
        option = "Asturianu"
    />
    /
    <InternacionalizationOption
        selected = {en}
        language = {() => setLanguage("en")}
        option = "English"
    />
    </p>
    </>);
}