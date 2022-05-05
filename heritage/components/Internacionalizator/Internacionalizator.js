import React, {useEffect} from 'react';
import InternacionalizationOption from "../InternacionalizationOption/InternacionalizationOption"
import { useRouter } from "next/router"

export default function Internacionalizator() {
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

    useEffect(() => {
        setLanguage(router.locale)
    }, [router.locale]);
    return (<>
    <p>
    <b>|</b>
        <InternacionalizationOption
        selected = {es}
        language = {() => setLanguage("es")}
        option = "Español"
    />
    <b>|</b>
    <InternacionalizationOption
        selected = {ast}
        language = {() => setLanguage("ast")}
        option = "Asturianu"
    />
    <b>|</b>
    <InternacionalizationOption
        selected = {en}
        language = {() => setLanguage("en")}
        option = "English"
    />
    <b>|</b>
    </p>
    </>);
}