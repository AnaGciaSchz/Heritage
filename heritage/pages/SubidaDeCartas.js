import UploadCardForm from "../components/UploadCardForm/UploadCardForm";
import { useIntl } from "react-intl"

export default function SubidaDeCartas() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })

    return (
        <>
        <h1  className="title1">{f("FormularioSubida")}</h1>
        <p>{f("FormularioTexto")}</p>
    <UploadCardForm/> 
    </>
        );
}